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
 * Xóa các khóa Redis được chỉ định khỏi cơ sở dữ liệu.
 * @param {Redis} client - Đối tượng RedisClient
 * @param {string | string[]} keys - Khóa
 * @returns {Promise<boolean>} - Promise trả về true nếu lưu trữ thành công, ngược lại trả về false
 */
function del(client, keys) {
    return __awaiter(this, void 0, void 0, function* () {
        const redisKeys = (typeof keys === 'string') ? [keys] : keys;
        try {
            const result = yield client.del(redisKeys);
            return !!result;
        }
        catch (error) {
            return false;
        }
    });
}
// /**
//  * Xóa các khóa Redis được chỉ định khỏi cơ sở dữ liệu.
//  * @param {Redis} client - Đối tượng Redis client để thực hiện lệnh xóa.
//  * @returns {Promise<(keys: string | string[]) => Promise<boolean>>} - Hàm trả về một Promise có giá trị là true nếu xóa thành công, và false nếu không thành công.
//  * @throws {Error} - Nếu có lỗi xảy ra khi thực hiện lệnh xóa.
//  */
// const del = async (client: Redis): Promise<(keys: string | string[]) => Promise<boolean>> => {
//   /**
//    * Lưu trữ giá trị vào Redis với tùy chọn thời gian hết hạn
//    * @param {string | string[]} keys - Khóa
//    * @returns {Promise<boolean>} - Promise trả về true nếu lưu trữ thành công, ngược lại trả về false
//    */
//   return async (keys: string | string[]): Promise<boolean> => {
//     const redisKeys: string[] = (typeof keys === 'string') ? [keys] : keys
//     try {
//       const result = await client.del(redisKeys)
//       return !!result
//     } catch (error) {
//       return false
//     }
//   }
// }
exports.default = del;
