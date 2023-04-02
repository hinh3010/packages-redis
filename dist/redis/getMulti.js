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
 * Lấy nhiểu giá trị từ Redis
 * @param {Redis} client - Đối tượng RedisClient
 * @param {string[]} keys - Khóa
 * @returns {Promise<boolean>} - Promise trả về true nếu lưu trữ thành công, ngược lại trả về false
 */
function getMulti(client, keys) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const redisValues = yield client.mget(keys);
            let values = null;
            if (redisValues && redisValues.length > 0) {
                values = redisValues.map(value => {
                    if (value) {
                        if (value === 'NaN')
                            return NaN;
                        else {
                            try {
                                return JSON.parse(value);
                            }
                            catch (error) {
                                return value;
                            }
                        }
                    }
                    else
                        return null;
                });
            }
            return values;
        }
        catch (error) {
            return null;
        }
    });
}
exports.default = getMulti;
