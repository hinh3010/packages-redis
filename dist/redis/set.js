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
 * Lưu trữ giá trị vào Redis với tùy chọn thời gian hết hạn
 * @param {Redis} client - Đối tượng RedisClient
 * @param {string} key - Khóa
 * @param {any} value - Giá trị
 * @param {number} [expiration=null] - Thời gian hết hạn tính bằng giây, mặc định là không có thời gian hết hạn
 * @returns {Promise<boolean>} - Promise trả về true nếu lưu trữ thành công, ngược lại trả về false
 */
function set(client, key, value, expiration) {
    return __awaiter(this, void 0, void 0, function* () {
        let redisValue;
        if (typeof value === 'number' && isNaN(value)) {
            redisValue = 'NaN';
        }
        else {
            try {
                redisValue = JSON.stringify(value);
            }
            catch (e) {
                redisValue = value.toString();
            }
        }
        try {
            const reply = expiration
                ? yield client.set(key, redisValue, 'EX', expiration, // Thời gian tồn tại
                'NX' // chỉ đặt giá trị của khóa nếu khóa không tồn tại.
                )
                : yield client.set(key, redisValue, 'NX');
            return reply === 'OK';
        }
        catch (error) {
            return false;
        }
    });
}
exports.default = set;
