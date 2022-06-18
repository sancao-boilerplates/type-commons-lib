export declare class EncodeUtils {
    static encodeBase64(value: string | object): string | null;
    /**
     * Encrypt your string or object using CryptoJs lib, provide a secret or set CRYPT_SECRET environment variable
     * @param data {string | object}
     * @returns encrypted {string}
     */
    static encryptAesId(data: string | object, secret?: string): string;
    static decodeAesId(data: string | object): string;
}
