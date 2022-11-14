export declare class Idb {
    static getDbAsync(): Promise<IDBDatabase>;
    static clearStorageAsync(): Promise<void>;
    static deleteDataAsync(data: any): Promise<void>;
    static getDataListAsync(): Promise<unknown>;
    static getDataByKeysAsync(keysArray: string[]): Promise<any[]>;
    static getDataByKeyAsync(key: any): Promise<unknown>;
    static saveDataAsync(data: any, key?: string | undefined): Promise<void>;
    static saveBatchDataAsync(storageName: string | undefined, data: any[], keys: string[]): Promise<void>;
}
