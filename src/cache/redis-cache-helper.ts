import { RedisClient } from 'redis';

export class RedisHelper {
    public client: RedisClient;

    public getCacheAsync: <T>(key: string) => Promise<T>;

    public setCacheAsync: (key: string, duration?: number, value?: string) => Promise<'OK'>;

    public removeCacheAsync: (key: string) => Promise<void>;
}
