import type Redis from 'ioredis';
/**
 * Xóa các khóa Redis được chỉ định khỏi cơ sở dữ liệu.
 * @param {Redis} client - Đối tượng RedisClient
 * @param {string | string[]} keys - Khóa
 * @returns {Promise<boolean>} - Promise trả về true nếu lưu trữ thành công, ngược lại trả về false
 */
declare function del(client: Redis, keys: string | string[]): Promise<boolean>;
export default del;
