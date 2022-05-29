"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConstants = void 0;
class AppConstants {
}
exports.AppConstants = AppConstants;
AppConstants.DEFAULT_DATE_FORMAT = process.env.DEFAULT_DATE_FORMAT || 'DD/MM/YYYY';
AppConstants.DEFAULT_TIME_FORMAT = process.env.DEFAULT_DATE_FORMAT || 'HH:mm';
AppConstants.GMT_TIME = Number(process.env.GMT_TIME || '-3');
AppConstants.ENCRYPT_SECRET = process.env.CRYPT_SECRET;
AppConstants.GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
AppConstants.CACHE = {
    CACHE_TIME: process.env.CACHE_TIME || 3600,
    REDIS_CONNECTION: process.env.REDIS_CONNECTION || '{"host":"localhost","password":"FLRY3!"}',
    CACHE_ENABLE: process.env.CACHE_ENABLE || 'false',
    DYNAMO_CACHE_TABLE: process.env.DYNAMO_CACHE_TABLE || '',
    S3_CACHE_BUCKET: process.env.S3_CACHE_BUCKET || '',
};
