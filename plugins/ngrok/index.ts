import { App, IApp } from '../../lib/App'
import * as ngrok from 'ngrok';
import { Realtime, Types } from 'ably';

export default class Ngrok {
    name: string = 'Ngrok'
    id: string = 'ngrok'
    ably: Realtime = null;
    tunnelChannel: Types.RealtimeChannelCallbacks = null
    tunnels: Array<any> = []
    connected: boolean = false;

    constructor() {
        var app = App.getInstance();
        ngrok.authtoken(process.env.NGROK);
        this.ably = app.get<Realtime>('ably');
        this.tunnelChannel = this.ably.channels.get('tunnels');
        this.tunnelChannel.subscribe('tunnelAdded', this.onTunnelAdded2)
        this.tunnelChannel.subscribe('tunnelDeleted', (messaege) => this.onTunnelDeleted(messaege))
        this.tunnelChannel.subscribe('onAgentConnected', (message: Types.Message) => {
            if (this.connected === false) {
                this.connected = true;
                this.init(message.data.toString())
            }
        })
        setTimeout(() => {
            this.tunnelChannel.publish('agentConnected', JSON.stringify({status: true}));

        },1000)
    }
    onTunnelDeleted = async (message : any) =>  {
       console.log(message)
        
        // try{
        //     if(tunnel.length){
        //         await ngrok.disconnect(tunnel[0].url);
        //         this.tunnels.splice(this.tunnels.indexOf(tunnel[0]),1);
        //         console.log(JSON.stringify(this.tunnels,null,2))
        //     }
        // }catch(error) {
        //     console.log("tunnel kapatılmadı");
        // }
    }

    async init(data: string) {
        this.tunnelChannel.unsubscribe('onAgentConnected');
        if (this.connected) {
            var datas: Array<any> = JSON.parse(data);
            console.log(JSON.stringify(datas))
            for (const value of datas) {
                try {
                    var url = await ngrok.connect({
                        name: value.Name,
                        proto: value.Protokol,
                        addr: parseInt(value.Port),
                        region: 'eu',
                        bind_tls: false,
                        inspect: false
                    })
                    this.tunnels.push({
                        name: value.Name,
                        id: value.Id,
                        url: url,
                        port: value.Port,
                        protokol: value.Protokol
                    })
                    this.tunnelChannel.publish('tunnelOpened', JSON.stringify({ id: value.Id, publicUrl: url, status: 2 }))

                } catch (e) {
                    console.error("init", e)
                }

            }

            console.log(JSON.stringify(this.tunnels, null, 2))
        }
    }

    onTunnelAdded2 = async (message: Types.Message) => {
        try {
            const data = JSON.parse(message.data);
            var control = this.tunnels.find(a => a.protokol === data.Protokol && a.port.toString() === data.Port.toString());
            if (!control) {
                var url = await ngrok.connect({
                    name: data.Name,
                    proto: data.Protokol,
                    addr: parseInt(data.Port),
                    region: 'eu',
                    bind_tls: false,
                    inspect: false,
                    onStatusChange: (status) => {
                        console.log(data.Name + " " + status)
                    }
                })
                if(url.length){
                    this.tunnels.push({
                        name: data.Name,
                        id: data.Id,
                        url: url,
                        port: data.Port,
                        protokol: data.Protokol,
                    })
                    this.tunnelChannel.publish('tunnelOpened', JSON.stringify({id: data.Id,publicUrl: url, status: 2}));
                }
                else{
                    console.log("tunnel açılmadı")
                }
            }
        } catch (error) {
            console.error("add", error)
        }
       

    }




    // onGetAll = async (message: Types.Message) => {
    //     var api = ngrok.getApi();
    //     var tunnels: Array<any> = [];
    //     await api.get('api/tunnels', (error, response, body) => {
    //         JSON.parse(body).tunnels.map((item: any) => {
    //             tunnels.push({
    //                 name: item.name,
    //                 publicUrl: item.public_url,
    //                 proto: item.proto,
    //                 localAddress: item.config.addr
    //             })
    //         })
    //     })
    //     this.tunnelChannel.publish('getAllResult', tunnels);
    // }
}