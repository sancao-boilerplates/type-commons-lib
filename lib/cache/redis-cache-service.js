"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisCache = void 0;
const redis = require("redis");
const CryptoJS = require("crypto-js");
const util_1 = require("util");
const constants_1 = require("../constants");
const node_smart_log_1 = require("node-smart-log");
const redis_cache_helper_1 = require("./redis-cache-helper");
class RedisCache {
    static generateCacheKey(app, key) {
        return CryptoJS.SHA1(`${app}_${key}`).toString();
    }
    static getClient() {
        if (RedisCache.redisInstance && RedisCache.redisInstance.client) {
            return RedisCache.redisInstance;
        }
        const credentials = JSON.parse(`${constants_1.AppConstants.CACHE.REDIS_CONNECTION}`);
        RedisCache.redisInstance = new redis_cache_helper_1.RedisHelper();
        RedisCache.redisInstance.client = new redis.RedisClient(credentials);
        RedisCache.redisInstance.getCacheAsync = (0, util_1.promisify)(RedisCache.redisInstance.client.get).bind(this.redisInstance.client);
        RedisCache.redisInstance.setCacheAsync = (0, util_1.promisify)(RedisCache.redisInstance.client.setex).bind(this.redisInstance.client);
        RedisCache.redisInstance.removeCacheAsync = (0, util_1.promisify)(RedisCache.redisInstance.client.del).bind(this.redisInstance.client);
        return RedisCache.redisInstance;
    }
    getCache(app, key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (constants_1.AppConstants.CACHE.CACHE_ENABLE === 'false') {
                return null;
            }
            try {
                const cachekey = RedisCache.generateCacheKey(app, key);
                const redisIntance = RedisCache.getClient();
                const result = yield redisIntance.getCacheAsync(cachekey);
                return JSON.parse(result);
            }
            catch (err) {
                node_smart_log_1.Logger.error('RedisCache::getCache', err);
                return null;
            }
        });
    }
    setCache(app, key, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            if (constants_1.AppConstants.CACHE.CACHE_ENABLE === 'false') {
                return obj;
            }
            const cachekey = RedisCache.generateCacheKey(app, key);
            try {
                const redisIntance = RedisCache.getClient();
                yield redisIntance.setCacheAsync(cachekey, parseInt(`${RedisCache.cacheTime}`, 10), JSON.stringify(obj));
                return obj;
            }
            catch (err) {
                node_smart_log_1.Logger.error('RedisCache::setCache', err);
                return obj;
            }
        });
    }
    removeCache(app, key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (constants_1.AppConstants.CACHE.CACHE_ENABLE !== 'false') {
                const cachekey = RedisCache.generateCacheKey(app, key);
                try {
                    const redisIntance = RedisCache.getClient();
                    yield redisIntance.removeCacheAsync(cachekey);
                }
                catch (err) {
                    node_smart_log_1.Logger.error('RedisCache::removeCache', err);
                    throw err;
                }
            }
        });
    }
}
RedisCache.cacheTime = constants_1.AppConstants.CACHE.CACHE_TIME || 3600;
__decorate([
    (0, node_smart_log_1.log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RedisCache.prototype, "getCache", null);
__decorate([
    (0, node_smart_log_1.log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], RedisCache.prototype, "setCache", null);
__decorate([
    (0, node_smart_log_1.log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RedisCache.prototype, "removeCache", null);
__decorate([
    (0, node_smart_log_1.log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", String)
], RedisCache, "generateCacheKey", null);
__decorate([
    (0, node_smart_log_1.log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", redis_cache_helper_1.RedisHelper)
], RedisCache, "getClient", null);
exports.RedisCache = RedisCache;
