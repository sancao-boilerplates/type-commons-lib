export class AppConstants {
    public static readonly DEFAULT_DATE_FORMAT = process.env.DEFAULT_DATE_FORMAT || 'DD/MM/YYYY';

    public static readonly DEFAULT_TIME_FORMAT = process.env.DEFAULT_DATE_FORMAT || 'HH:mm';

    public static readonly GMT_TIME = Number(process.env.GMT_TIME || '-3');

    public static readonly ENCRYPT_SECRET = process.env.CRYPT_SECRET;

    public static readonly GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

    public static readonly CACHE = {
        CACHE_TIME: process.env.CACHE_TIME || 3600,
        REDIS_CONNECTION: process.env.REDIS_CONNECTION || '{"host":"localhost","password":"FLRY3!"}',
        CACHE_ENABLE: process.env.CACHE_ENABLE || 'false',
        DYNAMO_CACHE_TABLE: process.env.DYNAMO_CACHE_TABLE || '',
        S3_CACHE_BUCKET: process.env.S3_CACHE_BUCKET || '',
    };
}
