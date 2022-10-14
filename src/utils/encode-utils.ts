import * as Crypto from 'crypto';
import * as CryptoJS from 'crypto-js';
import { Logger, log } from '../logger';
import { AppConstants } from '../constants';

export class EncodeUtils {
    @log
    static encodeBase64(value: string | object): string | null {
        try {
            if (!value) return null;
            if (typeof value === 'object') {
                value = JSON.stringify(value);
            }

            return Buffer.from(value).toString('base64');
        } catch (err) {
            Logger.error(`Error while encoding value:${value} to base64`, err);
            throw err;
        }
    }

    /**
     * Encrypt your string or object using CryptoJs lib, provide a secret or set CRYPT_SECRET environment variable
     * @param data {string | object}
     * @returns encrypted {string}
     */
    @log
    static encryptAesId(data: string | object, secret?: string): string {
        const encrypted = CryptoJS.AES.encrypt(data.toString(), secret || AppConstants.ENCRYPT_SECRET).toString();
        const response = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encrypted));
        return response;
    }

    @log
    static decodeAesId(data: string | object): string {
        const encodeId = Buffer.from(data.toString(), 'base64').toString('utf-8');
        const bytes = CryptoJS.AES.decrypt(encodeId.toString(), AppConstants.ENCRYPT_SECRET);
        const response = bytes.toString(CryptoJS.enc.Utf8);
        return response;
    }

    /**
     * Generates MD5 Hash for a provided string
     * @param data {string}
     * @returns encrypted {string}
     */
    @log
    static generateMd5Hash(data: string): string {
        return Crypto.createHash('md5').update(data).digest('hex');
    }
}
