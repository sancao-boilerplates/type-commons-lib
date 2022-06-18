/// <reference types="node" />
export interface JwtOptions {
    /**
     * @secreteKey {string} The JWT Secret key to security your token, it also can be defined on your environment variabls JWT_SECRET
     */
    secreteKey?: string;
    /**
     * @expiration {number} How long to token be expired in seconds.
     * @default 1 minute
     */
    expiration?: number;
}
export declare abstract class JwtUtils {
    /**
     * Generate Jwt token, you can set an JWT_SECRET environment variable then it will be used to sign your jwt token.
     * @value {string | Buffer | object} the parameter to be encoded in a token
     * @options {JwtOptions} Set the secret and expiration for your token
     * @returns {string} Jwt Token
     */
    static generate(value: string | Buffer | object, options?: JwtOptions): string;
    static validate<T>(token: string, secret?: string): T;
}
