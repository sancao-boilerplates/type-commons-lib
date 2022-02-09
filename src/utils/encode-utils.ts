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

    @log
    static encryptAesId(data: string | object): string {
        const encrypted = CryptoJS.AES.encrypt(data.toString(), AppConstants.ENCRYPT_SECRET).toString();
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
}
