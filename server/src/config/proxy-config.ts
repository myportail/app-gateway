import { ISerializable } from "../interfaces/ISerializable";

export class ProxyConfig implements ISerializable<ProxyConfig> {

    private _host: string | undefined;
    private _port: number | undefined;
    private _route: string | undefined;

    constructor(private _protocol: string = 'http') {

    }

    get protocol(): string {
        return this._protocol;
    }

    get url(): string {
        return `${this._protocol}://${this._host}${this.portValue}${this._route}';`
    }

    get valid(): boolean {
        return this._host != undefined;
    }

    initFromJSON(jsonObject: any): ProxyConfig {

        this._host = undefined;
        this._port = undefined;
        this._route = undefined;

        if (jsonObject) {
            this._host = jsonObject['host'];
            this._route = jsonObject['route'] ? jsonObject['route'] : '/';
            this._port = jsonObject['port'];
        }

        return this;
    }    
    
    toJSON(): any {
        return {
            host: this._host,
            route: this._route,
            port: this._port
        }
    }

    private get portValue(): string {
        return this._port ? `:${this._port}` : '';
    }
}