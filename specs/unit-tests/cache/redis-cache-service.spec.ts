import { CacheService, RedisCache } from '../../../src/cache';
import { AppConstants } from '../../../src/constants';
// import { RedisClient } from 'redis';
import { RedisHelper } from '../../../src/cache/redis-cache-helper';
import * as redis from 'redis';

describe('redis Cache Service - Suite Test', () => {
    const redisCache: CacheService<unknown> = new RedisCache();

    describe('GetCache', () => {
        let promise = jest.fn();
        let redisInstance;

        let redisHelper: RedisHelper;

        beforeEach(() => {
            jest.clearAllMocks();
        });

        afterEach(() => {
            jest.clearAllMocks();
            promise = jest.fn();
            redisInstance = null;
        });

        it('Should return generateCacheKey', (done) => {
            let mykey = RedisCache.generateCacheKey('app_1', 'xurupita');
            expect(mykey).toEqual('5dc8ed331aeb57860a5499d9fa0967acd76f051a');
            done();
        });

        it('Should return instance client', () => {
            RedisCache.getClient = jest.fn().mockReturnThis().mockReturnValue({ promise: promise });
            let instanceClient = RedisCache.getClient();
            expect(instanceClient).not.toBeNull;
            instanceClient = RedisCache.getClient();
            expect(instanceClient).not.toBeNull;
        });

        it('Should return null when object do not exists', async () => {
            promise = jest.fn().mockResolvedValue(null);
            redisInstance = {
                getCacheAsync: jest.fn().mockReturnThis().mockReturnValue({ promise: promise }),
            };

            redisHelper = new RedisHelper();
            redisHelper.getCacheAsync = jest.fn().mockResolvedValue(null);

            jest.spyOn(RedisCache, 'generateCacheKey')
                .mockImplementation(() => '1233')
                .mockReturnValue('xpto_key');
            jest.spyOn(RedisCache, 'getClient').mockReturnValue(redisHelper);
            jest.spyOn(redis, 'createClient').mockReturnValue(redisHelper.client);

            AppConstants.CACHE.CACHE_ENABLE = 'true';

            const resp = await redisCache.getCache('app', 'key');

            expect(redisHelper.getCacheAsync).toBeCalled();
            expect(resp).toBe(null);
        });

        it('Should return null when cache enabled is false', async () => {
            AppConstants.CACHE.CACHE_ENABLE = 'false';
            const resp = await redisCache.getCache('app', 'key');
            expect(resp).toBe(null);
        });

        it('Should return error thrown when getClient Error', async () => {
            AppConstants.CACHE.CACHE_ENABLE = 'true';
            redisHelper = new RedisHelper();
            jest.spyOn(RedisCache, 'getClient').mockImplementationOnce(() => {
                throw new Error();
            });
            jest.spyOn(redis, 'createClient').mockReturnValue(redisHelper.client);
            const resp = await redisCache.getCache('app', 'key');

            expect(resp).toBe(null);
        });

        it('Should return when object do exists', async () => {
            let responseRedis = {
                name: 'xurupita',
            };
            promise = jest.fn().mockResolvedValue(null);
            redisInstance = {
                getCacheAsync: jest.fn().mockReturnThis().mockReturnValue({ promise: promise }),
            };

            redisHelper = new RedisHelper();
            redisHelper.getCacheAsync = jest.fn().mockResolvedValue(JSON.stringify(responseRedis));

            jest.spyOn(RedisCache, 'generateCacheKey')
                .mockImplementation(() => '1233')
                .mockReturnValue('xpto_key');
            jest.spyOn(RedisCache, 'getClient').mockReturnValue(redisHelper);
            jest.spyOn(redis, 'createClient').mockReturnValue(redisHelper.client);

            AppConstants.CACHE.CACHE_ENABLE = 'true';

            const resp = await redisCache.getCache('app', 'key');

            expect(redisHelper.getCacheAsync).toBeCalled();
            expect(resp).toEqual(responseRedis);
        });
    });

    describe('SetCache', () => {
        let promise;
        let redisInstance;

        let redisHelper: RedisHelper;

        beforeEach(() => {
            jest.clearAllMocks();
        });

        afterEach(() => {
            jest.clearAllMocks();
            jest.doMock('redis', () => redis);
            promise;
            redisInstance;
        });

        it('Should return null when object do not exists', async () => {
            const cacheObj = { myObj: {} };

            promise = jest.fn().mockResolvedValue(null);
            redisInstance = {
                setCacheAsync: jest.fn().mockReturnThis().mockReturnValue({ promise: promise }),
            };

            redisHelper = new RedisHelper();
            redisHelper.setCacheAsync = jest.fn().mockResolvedValue(cacheObj);

            jest.spyOn(RedisCache, 'generateCacheKey')
                .mockImplementation(() => '1233')
                .mockReturnValue('xpto_key');
            jest.spyOn(RedisCache, 'getClient').mockReturnValue(redisHelper);

            AppConstants.CACHE.CACHE_ENABLE = 'true';

            const resp = await redisCache.setCache('app', 'key', cacheObj);

            expect(redisHelper.setCacheAsync).toBeCalled();
            expect(resp).toBe(cacheObj);
        });

        it('Should return same object when cache enable === false', async () => {
            const cacheObj = { myObj: {} };
            AppConstants.CACHE.CACHE_ENABLE = 'false';
            const resp = await redisCache.setCache('app', 'key', cacheObj);

            expect(resp).toEqual(cacheObj);
        });

        it('Should return error thrown when an error occur on getClient for setCache', async () => {
            const cacheObj = { myObj: {} };
            AppConstants.CACHE.CACHE_ENABLE = 'true';

            jest.spyOn(RedisCache, 'getClient').mockImplementationOnce(() => {
                throw new Error();
            });
            const resp = await redisCache.setCache('app', 'key', cacheObj);

            expect(resp).toBe(cacheObj);
        });
    });

    describe('RemoveCache', () => {
        let promise;
        let redisInstance;

        let redisHelper: RedisHelper;

        beforeEach(() => {
            jest.clearAllMocks();
        });

        afterEach(() => {
            jest.clearAllMocks();
            jest.doMock('redis', () => redis);
            promise = null;
            redisInstance = null;
        });

        it('Should remove object from redis', async () => {
            AppConstants.CACHE.CACHE_ENABLE = 'true';

            promise = jest.fn().mockResolvedValue(null);
            redisInstance = {
                removeCacheAsync: jest.fn().mockReturnThis().mockReturnValue({ promise: promise }),
            };

            redisHelper = new RedisHelper();
            redisHelper.removeCacheAsync = jest.fn().mockResolvedValue({});

            jest.spyOn(RedisCache, 'generateCacheKey')
                .mockImplementation(() => '1233')
                .mockReturnValue('xpto_key');
            jest.spyOn(RedisCache, 'getClient').mockReturnValue(redisHelper);

            await redisCache.removeCache('app', 'key');
            expect(redisHelper.removeCacheAsync).toBeCalled();
        });

        it('Should return error thrown for removeCache', async () => {
            AppConstants.CACHE.CACHE_ENABLE = 'true';

            jest.spyOn(RedisCache, 'generateCacheKey')
                .mockImplementation(() => '1233')
                .mockReturnValue('xpto_key');
            jest.spyOn(RedisCache, 'getClient').mockImplementationOnce(() => {
                throw new Error();
            });

            await expect(redisCache.removeCache('app', 'key')).rejects.toThrow();
        });
    });
});
