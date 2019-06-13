import { ISerializable } from "../interfaces/ISerializable";
import { ProxyConfig } from "./proxy-config";

export class ProtocolConfig implements ISerializable<ProtocolConfig> {

    private _proxy: ProxyConfig;
    private _location: string | undefined;

    constructor(protocol: string) {
        this._proxy = new ProxyConfig(protocol);
    }

    get valid(): boolean {
        return this._location !== undefined &&
                this._proxy.valid;
    }

    get protocol(): string {
        return this._proxy.protocol;
    }

    get location(): string {
        if (this._location === undefined) {
            throw new Error('undefined location for protocol');
        }

        return this._location;
    }

    get proxy(): ProxyConfig {
        return this._proxy;
    }

    initFromJSON(jsonObject: any): ProtocolConfig {

        if (jsonObject) {
            this._proxy.initFromJSON(jsonObject['proxy']);

            this._location = jsonObject['location'];
        }

        return this;
    }    
    
    toJSON() {
        return {
            location: this._location,
            proxy: this._proxy.toJSON()
        };
    }
}
