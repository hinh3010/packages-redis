import type Redis from 'ioredis';
/**
 * Sửa giá trị vào Redis
 * @param {Redis} client - Đối tượng RedisClient
 * @param {string} key - Khóa
 * @param {any} value - Giá trị
 * @param {number} [expiration=null] - Thời gian hết hạn tính bằng giây, mặc định là không có thời gian hết hạn
 * @returns {Promise<boolean>} - Promise trả về true nếu lưu trữ thành công, ngược lại trả về false
 */
declare function edit(client: Redis, key: string, value: any, expiration?: number): Promise<boolean>;
export default edit;
