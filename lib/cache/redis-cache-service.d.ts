import { CacheService } from './cache-service-interface';
import { RedisHelper } from './redis-cache-helper';
export declare class RedisCache<T> implements CacheService<T> {
    static redisInstance: RedisHelper;
    static cacheTime: string | number;
    static generateCacheKey(app: string, key: string): string;
    static getClient(): RedisHelper;
    getCache(app: string, key: string): Promise<T>;
    setCache(app: string, key: string, obj: T): Promise<T>;
    removeCache(app: string, key: string): Promise<void>;
}
