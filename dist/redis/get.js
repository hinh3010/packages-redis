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
 * Lấy giá trị từ Redis
 * @param {Redis} client - Đối tượng RedisClient
 * @param {string} key - Khóa
 * @returns {Promise<string | null>} - Promise trả về string | null
 */
function get(client, key) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const redisValue = yield client.get(key);
            let value = null;
            if (redisValue) {
                if (redisValue === 'NaN') {
                    value = NaN;
                }
                else {
                    try {
                        value = JSON.parse(redisValue);
                    }
                    catch (error) {
                        value = redisValue;
                    }
                }
            }
            return value;
        }
        catch (error) {
            return null;
        }
    });
}
exports.default = get;
