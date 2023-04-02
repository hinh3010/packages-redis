import { type Redis } from 'ioredis';
import { type Lock } from 'redlock';
export declare class SimpleRedlock {
    private readonly redlock;
    /**
     * Creates a new SimpleRedlock instance.
     * @constructor
     * @param {Redis[]} redisClients - An array of Redis client instances to use.
     */
    constructor(redisClients: Redis[]);
    /**
     * Acquires a lock for the specified resource and duration.
     * @async
     * @param {string[]} resources - The resources to acquire the lock for.
     * @param {number} duration - The duration (in ms) for the lock.
     * @returns {Promise} A Promise that resolves to the acquired lock.
     */
    acquireLock(resources: string[], duration: number): Promise<Lock>;
    /**
     * Releases a lock.
     * @async
     * @param {Lock} lock - The lock to release.
     * @returns {Promise<void>} A Promise that resolves when the lock is released.
     */
    releaseLock(lock: Lock): Promise<void>;
    /**
     * Extends the duration of a lock.
     * @async
     * @param {Lock} lock - The lock to extend.
     * @param {number} duration - The duration (in ms) to extend the lock for.
     * @returns {Promise<Lock>} A Promise that resolves to the updated lock.
     */
    extendLock(lock: Lock, duration: number): Promise<Lock>;
}
