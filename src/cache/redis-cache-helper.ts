import { RedisClientType } from 'redis';

export class RedisHelper {
    public client: RedisClientType;

    public getCacheAsync: <T>(key: string) => Promise<T>;

    public setCacheAsync: (key: string, duration?: number, value?: string) => Promise<void>;

    public removeCacheAsync: (key: string) => Promise<void>;
}
