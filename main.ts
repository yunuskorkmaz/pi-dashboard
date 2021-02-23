import dotenv from 'dotenv-flow';
import { IPluginHelper, PluginHelper } from './lib/PluginHelper';
import { EventEmitter } from "events";
import { App } from './lib/App';
import * as Ably from "ably";

var app = App.getInstance();

dotenv.config();

const createApplication = async () => {
    app.set('plugin_folder', __dirname + '/plugins');
    app.set('plugin_helper', new PluginHelper());
    var list = await app.get<IPluginHelper>('plugin_helper').getPluginList();
    app.set('plugins',list);
    app.set('events',new EventEmitter())
    console.log(app)
}

const createAbly = () => {
    var ably = new Ably.Realtime({ key: process.env.ABLY});
    app.set('ably',ably);
}
createAbly();
createApplication();