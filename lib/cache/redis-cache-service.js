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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisCache = void 0;
var redis = require("redis");
var CryptoJS = require("crypto-js");
var util_1 = require("util");
var constants_1 = require("../constants");
var logger_1 = require("../logger");
var redis_cache_helper_1 = require("./redis-cache-helper");
var RedisCache = /** @class */ (function () {
    function RedisCache() {
    }
    RedisCache.generateCacheKey = function (app, key) {
        return CryptoJS.SHA1(app + "_" + key).toString();
    };
    RedisCache.getClient = function () {
        if (RedisCache.redisInstance && RedisCache.redisInstance.client) {
            return RedisCache.redisInstance;
        }
        var credentials = JSON.parse("" + constants_1.AppConstants.CACHE.REDIS_CONNECTION);
        RedisCache.redisInstance = new redis_cache_helper_1.RedisHelper();
        RedisCache.redisInstance.client = new redis.RedisClient(credentials);
        RedisCache.redisInstance.getCacheAsync = util_1.promisify(RedisCache.redisInstance.client.get).bind(this.redisInstance.client);
        RedisCache.redisInstance.setCacheAsync = util_1.promisify(RedisCache.redisInstance.client.setex).bind(this.redisInstance.client);
        RedisCache.redisInstance.removeCacheAsync = util_1.promisify(RedisCache.redisInstance.client.del).bind(this.redisInstance.client);
        return RedisCache.redisInstance;
    };
    RedisCache.prototype.getCache = function (app, key) {
        return __awaiter(this, void 0, void 0, function () {
            var cachekey, redisIntance, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (constants_1.AppConstants.CACHE.CACHE_ENABLE === 'false') {
                            return [2 /*return*/, null];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        cachekey = RedisCache.generateCacheKey(app, key);
                        redisIntance = RedisCache.getClient();
                        return [4 /*yield*/, redisIntance.getCacheAsync(cachekey)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, JSON.parse(result)];
                    case 3:
                        err_1 = _a.sent();
                        logger_1.Logger.error('RedisCache::getCache', err_1);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RedisCache.prototype.setCache = function (app, key, obj) {
        return __awaiter(this, void 0, void 0, function () {
            var cachekey, redisIntance, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (constants_1.AppConstants.CACHE.CACHE_ENABLE === 'false') {
                            return [2 /*return*/, obj];
                        }
                        cachekey = RedisCache.generateCacheKey(app, key);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        redisIntance = RedisCache.getClient();
                        return [4 /*yield*/, redisIntance.setCacheAsync(cachekey, parseInt("" + RedisCache.cacheTime, 10), JSON.stringify(obj))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, obj];
                    case 3:
                        err_2 = _a.sent();
                        logger_1.Logger.error('RedisCache::setCache', err_2);
                        return [2 /*return*/, obj];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RedisCache.prototype.removeCache = function (app, key) {
        return __awaiter(this, void 0, void 0, function () {
            var cachekey, redisIntance, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(constants_1.AppConstants.CACHE.CACHE_ENABLE !== 'false')) return [3 /*break*/, 4];
                        cachekey = RedisCache.generateCacheKey(app, key);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        redisIntance = RedisCache.getClient();
                        return [4 /*yield*/, redisIntance.removeCacheAsync(cachekey)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        logger_1.Logger.error('RedisCache::removeCache', err_3);
                        throw err_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RedisCache.cacheTime = constants_1.AppConstants.CACHE.CACHE_TIME || 3600;
    __decorate([
        logger_1.log,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Promise)
    ], RedisCache.prototype, "getCache", null);
    __decorate([
        logger_1.log,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String, Object]),
        __metadata("design:returntype", Promise)
    ], RedisCache.prototype, "setCache", null);
    __decorate([
        logger_1.log,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Promise)
    ], RedisCache.prototype, "removeCache", null);
    __decorate([
        logger_1.log,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", String)
    ], RedisCache, "generateCacheKey", null);
    __decorate([
        logger_1.log,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", redis_cache_helper_1.RedisHelper)
    ], RedisCache, "getClient", null);
    return RedisCache;
}());
exports.RedisCache = RedisCache;
