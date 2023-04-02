import { type Redis } from 'ioredis'
import Redlock, { type Lock } from 'redlock'

export class SimpleRedlock {
  private readonly redlock: Redlock

  /**
   * Creates a new SimpleRedlock instance.
   * @constructor
   * @param {Redis[]} redisClients - An array of Redis client instances to use.
   */
  constructor(redisClients: Redis[]) {
    /**
     * The underlying Redlock instance.
     * @private
     * @type {Redlock}
     */

    this.redlock = new Redlock(redisClients, {
      driftFactor: 0.01, // The expected clock drift, multiplied by lock TTL to determine drift time.
      retryCount: 10, // The maximum number of times Redlock will attempt to lock a resource before erroring.
      retryDelay: 200, // The time in milliseconds between attempts.
      retryJitter: 200, // The maximum time in milliseconds randomly added to retries to improve performance under high contention.
      automaticExtensionThreshold: 500 // The minimum remaining time on a lock before an extension is automatically attempted with the `using` API.
    })
  }

  /**
   * Acquires a lock for the specified resource and duration.
   * @async
   * @param {string[]} resources - The resources to acquire the lock for.
   * @param {number} duration - The duration (in ms) for the lock.
   * @returns {Promise} A Promise that resolves to the acquired lock.
   */
  public async acquireLock(resources: string[], duration: number): Promise<Lock> {
    return await this.redlock.acquire(resources, duration)
  }

  /**
   * Releases a lock.
   * @async
   * @param {Lock} lock - The lock to release.
   * @returns {Promise<void>} A Promise that resolves when the lock is released.
   */
  public async releaseLock(lock: Lock): Promise<void> {
    await lock.release()
  }

  /**
   * Extends the duration of a lock.
   * @async
   * @param {Lock} lock - The lock to extend.
   * @param {number} duration - The duration (in ms) to extend the lock for.
   * @returns {Promise<Lock>} A Promise that resolves to the updated lock.
   */
  public async extendLock(lock: Lock, duration: number): Promise<Lock> {
    return await lock.extend(duration)
  }
}
