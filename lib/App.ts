
export interface IApp {
    init(): void,
    set(settingName: string, val: any): IApp,
    get<T>(settingName: string): T
}

export class App implements IApp {

    private static instance: App

    settings: { [key: string]: any } = [];

    init(): void {
        throw new Error("Method not implemented.");
    }
    set(settingName: string, val: any): IApp {
        this.settings[settingName] = val;
        return this;
    }
    
    get<T = any>(settingName: string): T {
        return this.settings[settingName] as T;
    }

    public static getInstance(): App {
        if (!App.instance) {
            App.instance = new App();
        }

        return App.instance;
    }

}


