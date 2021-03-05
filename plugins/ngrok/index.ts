import { App, IApp } from '../../lib/App'
import * as ngrok from 'ngrok';
import { Realtime, Types } from 'ably';

export default class Ngrok {
    name: string = 'Ngrok'
    id: string = 'ngrok'
    ably: Realtime = null;
    tunnelChannel: Types.RealtimeChannelCallbacks = null
    constructor() {
        var app = App.getInstance();
        ngrok.authtoken(process.env.NGROK);
        this.ably = app.get<Realtime>('ably');
        this.tunnelChannel = this.ably.channels.get('tunnels');
        this.tunnelChannel.subscribe('getAll', this.onGetAll)
        this.init();
    }

    init() {
        ngrok.connect({
            name: 'http',
            proto: 'http',
            addr: 80,
            region: 'eu',
            bind_tls: false
        }).then((a) => {
            console.log("a",a);
            var api = ngrok.getApi();
            
            api.get('api/tunnels', (error, response, body) => {
                var tunnels: Array<any> = [];
                JSON.parse(body).tunnels.map((item: any) => {
                    tunnels.push({
                        name: item.name,
                        publicUrl: item.public_url,
                        proto: item.proto,
                        localAddress: item.config.addr
                    })
                })
                console.log(tunnels)
                this.tunnelChannel.publish('register',tunnels, (error) => {
                    console.log(error);
                })

            })
        })
    }

    onGetAll = async (message: Types.Message) => {
        var api = ngrok.getApi();
        var tunnels: Array<any> = [];
        await api.get('api/tunnels', (error, response, body) => {
            JSON.parse(body).tunnels.map((item: any) => {
                tunnels.push({
                    name: item.name,
                    publicUrl: item.public_url,
                    proto: item.proto,
                    localAddress: item.config.addr
                })
            })
        })
        this.tunnelChannel.publish('getAllResult', tunnels);
    }

}