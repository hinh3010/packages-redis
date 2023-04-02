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
/**
 * Lấy giá trị và thời gian hết hạn
 * @param {Redis} client - Đối tượng RedisClient
 * @param {string} key - Khóa
 * @returns {Promise<boolean>} - Promise trả về [any, any] | null
 */
function getTTL(client, key) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const multi = client.multi();
            multi.get(key);
            multi.ttl(key);
            const results = yield multi.exec();
            if (!results) {
                return null; // Key not found
            }
            const ttl = results[1][1];
            let value = null;
            if (results[0][1]) {
                if (results[0][1] === 'NaN') {
                    value = NaN;
                }
                else {
                    try {
                        value = typeof results[0][1] === 'string' ? JSON.parse(results[0][1]) : results[0][1];
                    }
                    catch (error) {
                        value = results[0][1];
                    }
                }
            }
            return [value, ttl];
        }
        catch (error) {
            return null;
        }
    });
}
exports.default = getTTL;
