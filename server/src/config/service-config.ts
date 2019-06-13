import {ISerializable} from "../interfaces/ISerializable";
import { ProtocolConfig } from "./protocol-config";


export class ServiceConfig implements ISerializable<ServiceConfig> {

    private _protocols: { [name: string]: ProtocolConfig} = {};

    constructor(private _name: string) {
    }

    get name(): string {
        return this._name;
    }

    get protocols(): ProtocolConfig[] {
        return Object.keys(this._protocols).map(x => this._protocols[x]);
    }

    initFromJSON(jsonObject: any): ServiceConfig {
        if (jsonObject) {
            Object.keys(jsonObject).forEach(key => {
                const protocolConfig = new ProtocolConfig(key);
                protocolConfig.initFromJSON(jsonObject[key]);
                this._protocols[key] = protocolConfig;
            });
        }

        return this;
    }

    toJSON(): any {
        const ret: {[key: string]: any} = {};

        Object.keys(this._protocols).forEach(name => {
            ret[name] = this._protocols[name].toJSON();
        });

        return ret;
    }
}
