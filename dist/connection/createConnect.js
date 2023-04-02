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
exports.createConnect = void 0;
const logger_1 = require("@hellocacbantre/logger");
const ioredis_1 = __importDefault(require("ioredis"));
const Logger = logger_1.SimpleLogger;
function createConnect(uri) {
    const client = new ioredis_1.default(uri, {
        connectTimeout: 5000,
        enableReadyCheck: true,
        maxRetriesPerRequest: 5,
        retryStrategy: (times) => {
            // try reconnecting after the number of seconds returned.
            if (times <= 3) {
                return 1000;
            }
            return null;
        }
    });
    client.on('connect', () => {
        Logger.info('[RedisIo:::] connected!!');
    });
    client.on('error', (err) => {
        Logger.error(err, `[RedisIo:::] client Error ${err.message}`);
    });
    process.on('SIGINT', () => __awaiter(this, void 0, void 0, function* () {
        client.disconnect();
        process.exit(0);
    }));
    process.on('SIGTERM', () => __awaiter(this, void 0, void 0, function* () {
        client.disconnect();
        process.exit(0);
    }));
    return client;
}
exports.createConnect = createConnect;
