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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleRedlock = void 0;
const redlock_1 = __importDefault(require("redlock"));
class SimpleRedlock {
    /**
     * Creates a new SimpleRedlock instance.
     * @constructor
     * @param {Redis[]} redisClients - An array of Redis client instances to use.
     */
    constructor(redisClients) {
        /**
         * The underlying Redlock instance.
         * @private
         * @type {Redlock}
         */
        this.redlock = new redlock_1.default(redisClients, {
            driftFactor: 0.01,
            retryCount: 10,
            retryDelay: 200,
            retryJitter: 200,
            automaticExtensionThreshold: 500 // The minimum remaining time on a lock before an extension is automatically attempted with the `using` API.
        });
    }
    /**
     * Acquires a lock for the specified resource and duration.
     * @async
     * @param {string[]} resources - The resources to acquire the lock for.
     * @param {number} duration - The duration (in ms) for the lock.
     * @returns {Promise} A Promise that resolves to the acquired lock.
     */
    acquireLock(resources, duration) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.redlock.acquire(resources, duration);
        });
    }
    /**
     * Releases a lock.
     * @async
     * @param {Lock} lock - The lock to release.
     * @returns {Promise<void>} A Promise that resolves when the lock is released.
     */
    releaseLock(lock) {
        return __awaiter(this, void 0, void 0, function* () {
            yield lock.release();
        });
    }
    /**
     * Extends the duration of a lock.
     * @async
     * @param {Lock} lock - The lock to extend.
     * @param {number} duration - The duration (in ms) to extend the lock for.
     * @returns {Promise<Lock>} A Promise that resolves to the updated lock.
     */
    extendLock(lock, duration) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield lock.extend(duration);
        });
    }
}
exports.SimpleRedlock = SimpleRedlock;
