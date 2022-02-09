export declare class AppConstants {
    static readonly DEFAULT_DATE_FORMAT: string;
    static readonly DEFAULT_TIME_FORMAT: string;
    static readonly GMT_TIME: number;
    static readonly ENCRYPT_SECRET: string;
    static readonly GOOGLE_API_KEY: string;
    static readonly CACHE: {
        CACHE_TIME: string | number;
        REDIS_CONNECTION: string;
        CACHE_ENABLE: string;
        DYNAMO_CACHE_TABLE: string;
        S3_CACHE_BUCKET: string;
    };
}
