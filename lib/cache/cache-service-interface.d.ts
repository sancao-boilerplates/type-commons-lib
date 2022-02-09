export interface CacheService<T> {
    setCache(app: string, key: string, object: T): Promise<T>;
    getCache(app: string, key: string): Promise<T>;
    removeCache(app: string, key: string): Promise<void>;
}
