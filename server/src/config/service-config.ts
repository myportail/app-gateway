import {ISerializable} from "../interfaces/ISerializable";


export class ServiceConfig implements ISerializable<ServiceConfig> {

    private _address: string | undefined;
    private _port: number | undefined;

    get address(): string | undefined {
        return this._address;
    }

    get port(): number | undefined {
        return this._port;
    }

    get url(): string {
        return `http://${this.address}:${this.port}`;
    }

    initFromJSON(jsonObject: any): ServiceConfig {
        this._address = undefined;
        this._port = undefined;

        if (jsonObject) {
            this._address = jsonObject.address;
            this._port = (jsonObject.port) ? Number.parseInt(jsonObject.port) : undefined;
        }

        return this;
    }

    toJSON(): any {
        return {
            address: this._address,
            port: this._port
        };
    }


}
