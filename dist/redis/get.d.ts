import type Redis from 'ioredis';
/**
 * Lấy giá trị từ Redis
 * @param {Redis} client - Đối tượng RedisClient
 * @param {string} key - Khóa
 * @returns {Promise<string | null>} - Promise trả về string | null
 */
declare function get(client: Redis, key: string): Promise<string | null>;
export default get;
