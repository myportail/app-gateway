import {ISerializable} from "../interfaces/ISerializable";
import {ServiceConfig} from "./service-config";

export class Services implements ISerializable<Services> {

    private _services: { [name: string]: ServiceConfig } = {};

    toArray(): ServiceConfig[] {
        return Object.keys(this._services).map(x => this._services[x]);
    }

    initFromJSON(jsonObject: any): Services {

        if (jsonObject) {            
            Object.keys(jsonObject).forEach((key: string) => {
                const serviceConfig = new ServiceConfig(key);
                serviceConfig.initFromJSON(jsonObject[key]);
                this._services[key] = serviceConfig;
            });
        }

        return this;
    }

    toJSON(): any {
        const ret: { [key: string]: any } = {};

        Object.keys(this._services).forEach(name => {
            const service = this._services[name];
            ret[name] = service.toJSON();
        })

        return ret;
    }

}

