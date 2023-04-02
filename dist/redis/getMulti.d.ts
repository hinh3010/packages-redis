import type Redis from 'ioredis';
/**
 * Lấy nhiểu giá trị từ Redis
 * @param {Redis} client - Đối tượng RedisClient
 * @param {string[]} keys - Khóa
 * @returns {Promise<boolean>} - Promise trả về true nếu lưu trữ thành công, ngược lại trả về false
 */
declare function getMulti(client: Redis, keys: string[]): Promise<string | null>;
export default getMulti;
