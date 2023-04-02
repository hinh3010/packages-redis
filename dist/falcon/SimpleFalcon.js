"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleFalcon = void 0;
class SimpleFalcon {
    constructor(client, prefix) {
        this.prefix = '';
        this.client = client;
        this.prefix = prefix !== null && prefix !== void 0 ? prefix : '';
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                void this.client.quit((error) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(true);
                });
            });
        });
    }
    _keyWithPrefix(key) {
        if (!this.prefix)
            return key;
        return `${this.prefix}:${key}`;
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const vKey = this._keyWithPrefix(key);
            return this.client.get(vKey);
        });
    }
    set(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const vKey = this._keyWithPrefix(key);
            return this.client.set(vKey, value);
        });
    }
    del(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const vKey = this._keyWithPrefix(key);
            return this.client.del(vKey);
        });
    }
    getJSON(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const vKey = this._keyWithPrefix(key);
            const valueStr = yield this.client.get(vKey);
            if (valueStr === null)
                return valueStr;
            return JSON.parse(valueStr);
        });
    }
    setJSON(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const vKey = this._keyWithPrefix(key);
            const valueStr = JSON.stringify(value);
            return this.client.set(vKey, valueStr);
        });
    }
    keys(pattern, withPrefix = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const vPattern = withPrefix ? this._keyWithPrefix(pattern) : pattern;
            return this.client.keys(vPattern);
        });
    }
    expire(key, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            const vKey = this._keyWithPrefix(key);
            const res = yield this.client.expire(vKey, seconds);
            return !!res;
        });
    }
    hget(key, field) {
        return __awaiter(this, void 0, void 0, function* () {
            const vKey = this._keyWithPrefix(key);
            return this.client.hget(vKey, field);
        });
    }
    hset(key, field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const vKey = this._keyWithPrefix(key);
            return this.client.hset(vKey, field, value);
        });
    }
    hdel(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const vKey = this._keyWithPrefix(key);
            return this.client.hdel(vKey);
        });
    }
    hexists(key, field) {
        return __awaiter(this, void 0, void 0, function* () {
            const vKey = this._keyWithPrefix(key);
            const res = yield this.client.hexists(vKey, field);
            return !!res;
        });
    }
    hsetJSON(key, field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const valueStr = JSON.stringify(value);
            return this.hset(key, field, valueStr);
        });
    }
    hgetJSON(key, field) {
        return __awaiter(this, void 0, void 0, function* () {
            const valueStr = yield this.hget(key, field);
            if (valueStr === null)
                return valueStr;
            return JSON.parse(valueStr);
        });
    }
    clone(prefix) {
        return new SimpleFalcon(this.client, prefix);
    }
}
exports.SimpleFalcon = SimpleFalcon;
