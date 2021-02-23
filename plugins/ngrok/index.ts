import { App, IApp } from '../../lib/App'
import * as ngrok from 'ngrok';
import { Realtime, Types } from 'ably';

export default class Ngrok {
    name: string = 'Ngrok'
    id : string = 'ngrok'
    ably : Realtime = null;
    tunnelChannel : Types.RealtimeChannelCallbacks = null
    constructor(){
        var app = App.getInstance();
        ngrok.authtoken(process.env.NGROK);
        this.ably = app.get<Realtime>('ably');
        this.tunnelChannel =  this.ably.channels.get('tunnels');
        this.tunnelChannel.subscribe('getAll', this.onGetAll)
    }

    init () {
        ngrok.connect({
            proto: 'http',
            addr: 80,
            region: 'eu',
            bind_tls: false
        })
    }

    onGetAll = async (message: Types.Message ) => {
        console.log('getAllRecived');
        var api = ngrok.getApi();
        var tunnels = await api.get('api/tunnels')
        
        this.tunnelChannel.publish('getAllResult',"sonuç");
    }

}