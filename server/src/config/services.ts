import {ISerializable} from "../interfaces/ISerializable";
import {ServiceConfig} from "./service-config";

export class Services implements ISerializable<Services> {

    private _authService = new ServiceConfig();
    private _portail = new ServiceConfig();

    get authService(): ServiceConfig {
        return this._authService;
    }

    get portail(): ServiceConfig {
        return this._portail;
    }

    initFromJSON(jsonObject: any): Services {

        if (jsonObject) {
            this._authService.initFromJSON(jsonObject.authService);
            this._portail.initFromJSON(jsonObject.portail);
        }

        return this;
    }

    toJSON(): any {
        return {
            authService: this._authService.toJSON(),
            portail: this._portail.toJSON()
        };
    }

}
