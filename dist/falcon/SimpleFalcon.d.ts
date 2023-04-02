import type Client from 'ioredis';
export declare class SimpleFalcon {
    readonly client: Client;
    readonly prefix: string;
    constructor(client: Client, prefix?: string);
    close(): Promise<boolean>;
    _keyWithPrefix(key: string): string;
    get(key: string): Promise<string | null>;
    set(key: string, value: string): Promise<string | null>;
    del(key: string): Promise<number>;
    getJSON(key: string): Promise<any>;
    setJSON(key: string, value: object): Promise<string | null>;
    keys(pattern: string, withPrefix?: boolean): Promise<string[]>;
    expire(key: string, seconds: number): Promise<boolean>;
    hget(key: string, field: string): Promise<string | null>;
    hset(key: string, field: string, value: string): Promise<number>;
    hdel(key: string): Promise<number>;
    hexists(key: string, field: string): Promise<boolean>;
    hsetJSON(key: string, field: string, value: object): Promise<number>;
    hgetJSON(key: string, field: string): Promise<any>;
    clone(prefix?: string): SimpleFalcon;
}
