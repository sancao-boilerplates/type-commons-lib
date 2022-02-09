import * as redis from 'redis';
import * as CryptoJS from 'crypto-js';
import { promisify } from 'util';
import { CacheService } from './cache-service-interface';
import { AppConstants } from '../constants';
import { log, Logger } from '../logger';
import { RedisHelper } from './redis-cache-helper';

export class RedisCache<T> implements CacheService<T> {
    static redisInstance: RedisHelper;

    static cacheTime = AppConstants.CACHE.CACHE_TIME || 3600;

    @log
    static generateCacheKey(app: string, key: string): string {
        return CryptoJS.SHA1(`${app}_${key}`).toString();
    }

    @log
    static getClient(): RedisHelper {
        if (RedisCache.redisInstance && RedisCache.redisInstance.client) {
            return RedisCache.redisInstance;
        }

        const credentials = JSON.parse(`${AppConstants.CACHE.REDIS_CONNECTION}`);

        RedisCache.redisInstance = new RedisHelper();
        RedisCache.redisInstance.client = new redis.RedisClient(credentials);

        RedisCache.redisInstance.getCacheAsync = promisify(RedisCache.redisInstance.client.get).bind(this.redisInstance.client);
        RedisCache.redisInstance.setCacheAsync = promisify(RedisCache.redisInstance.client.setex).bind(this.redisInstance.client);
        RedisCache.redisInstance.removeCacheAsync = promisify(RedisCache.redisInstance.client.del).bind(this.redisInstance.client);

        return RedisCache.redisInstance;
    }

    @log
    async getCache(app: string, key: string): Promise<T> {
        if (AppConstants.CACHE.CACHE_ENABLE === 'false') {
            return null;
        }

        try {
            const cachekey: string = RedisCache.generateCacheKey(app, key);

            const redisIntance = RedisCache.getClient();

            const result = await redisIntance.getCacheAsync<string>(cachekey);

            return JSON.parse(result);
        } catch (err) {
            Logger.error('RedisCache::getCache', err);
            return null;
        }
    }

    @log
    async setCache(app: string, key: string, obj: T): Promise<T> {
        if (AppConstants.CACHE.CACHE_ENABLE === 'false') {
            return obj;
        }
        const cachekey: string = RedisCache.generateCacheKey(app, key);

        try {
            const redisIntance = RedisCache.getClient();

            await redisIntance.setCacheAsync(cachekey, parseInt(`${RedisCache.cacheTime}`, 10), JSON.stringify(obj));
            return obj;
        } catch (err) {
            Logger.error('RedisCache::setCache', err);
            return obj;
        }
    }

    @log
    async removeCache(app: string, key: string): Promise<void> {
        if (AppConstants.CACHE.CACHE_ENABLE !== 'false') {
            const cachekey: string = RedisCache.generateCacheKey(app, key);

            try {
                const redisIntance = RedisCache.getClient();
                await redisIntance.removeCacheAsync(cachekey);
            } catch (err) {
                Logger.error('RedisCache::removeCache', err);
                throw err;
            }
        }
    }
}
