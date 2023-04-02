import type Redis from 'ioredis';
/**
 * Lấy giá trị và thời gian hết hạn
 * @param {Redis} client - Đối tượng RedisClient
 * @param {string} key - Khóa
 * @returns {Promise<boolean>} - Promise trả về [any, any] | null
 */
declare function getTTL(client: Redis, key: string): Promise<[any, any] | null>;
export default getTTL;
