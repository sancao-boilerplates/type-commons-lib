import { RedisClient } from 'redis';
export declare class RedisHelper {
    client: RedisClient;
    getCacheAsync: <T>(key: string) => Promise<T>;
    setCacheAsync: (key: string, duration?: number, value?: string) => Promise<void>;
    removeCacheAsync: (key: string) => Promise<void>;
}
