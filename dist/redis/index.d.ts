import set from './set';
import get from './get';
import del from './del';
import getTTL from './getTTL';
import getMulti from './getMulti';
import edit from './edit';
export declare const RedisIo: {
    set: typeof set;
    get: typeof get;
    del: typeof del;
    getTTL: typeof getTTL;
    getMulti: typeof getMulti;
    edit: typeof edit;
};
