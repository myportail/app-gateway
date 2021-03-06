import {Services} from "./services";
import {ISerializable} from "../interfaces/ISerializable";

export class AppConfig implements ISerializable<AppConfig> {
    private _services = new Services();

    get services(): Services {
        return this._services;
    }

    initFromJSON(jsonObject: any): AppConfig {

        this._services.initFromJSON(jsonObject.services);

        return this;
    }

    toJSON(): any {
        return {
            services: this._services.toJSON()
        }
    }
}

