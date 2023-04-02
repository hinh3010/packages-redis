"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisIo = void 0;
const set_1 = __importDefault(require("./set"));
const get_1 = __importDefault(require("./get"));
const del_1 = __importDefault(require("./del"));
const getTTL_1 = __importDefault(require("./getTTL"));
const getMulti_1 = __importDefault(require("./getMulti"));
const edit_1 = __importDefault(require("./edit"));
exports.RedisIo = {
    set: set_1.default,
    get: get_1.default,
    del: del_1.default,
    getTTL: getTTL_1.default,
    getMulti: getMulti_1.default,
    edit: edit_1.default
};
