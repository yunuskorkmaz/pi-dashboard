import dotenv from 'dotenv-flow';
import { IPluginHelper, PluginHelper } from './lib/PluginHelper';
import { EventEmitter } from "events";
import { App } from './lib/App';
import * as Ably from "ably";
import ngrok from 'ngrok';

var app = App.getInstance();

dotenv.config();

const createApplication = async () => {
    app.set('plugin_folder', __dirname + '/plugins');
    app.set('plugin_helper', new PluginHelper());
    var list = await app.get<IPluginHelper>('plugin_helper').getPluginList();
    app.set('plugins',list);
    app.set('events',new EventEmitter())
}

const createAbly = () => {
    var ably = new Ably.Realtime({ key: process.env.ABLY});
    ably.connection.on('closing',(state) => {
        ably.connect()
    })
    app.set('ably',ably);
}
createAbly();
createApplication();

process.on('SIGINT', async signal => {
    console.log('kapataıldı');
    var tunnelChannel = app.get('ably').channels.get('tunnels');
    tunnelChannel.publish('agentDisconnected',"true");
    await ngrok.disconnect()
    await ngrok.kill();
})

// process.on('SIGINT',() => {
//    var ably : Ably.Realtime = app.get('ably');
//    ably.channels.get('tunnels').publish('agentDisconnect','');
//    console.log('agent disconnect')
// })
// process.on('exit',() => {
//     var ably : Ably.Realtime = app.get('ably');
//     ably.channels.get('tunnels').publish('agentDisconnect','');
//     console.log('agent exit')
//  })