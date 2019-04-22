export interface ISerializable<T> {

    initFromJSON(jsonObject: any): T;
    toJSON(): any;
}
