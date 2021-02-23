import * as fs from 'fs';
import { App } from './App'

export interface IPluginHelper {
  pluginFolder: string,
  getPluginList(): Promise<Array<Object>>
}

export class PluginHelper implements IPluginHelper {
 
  pluginFolder: string = "";

  constructor() {
    this.pluginFolder = App.getInstance().get<string>("plugin_folder");
  }

  async getPluginList() {
    var pluginList: Array<Object> = [];
    var files = fs.readdirSync(this.pluginFolder)

    files.forEach(async (item) => {
      try {
        var Plugin = await import(this.pluginFolder+ '/' + item)
        pluginList.push(new Plugin.default);
      } catch (error) {
        console.log(error);
      }
    })
    return Promise.resolve(pluginList);
  }

}
