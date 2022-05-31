import * as Jwt from 'jsonwebtoken';
import { log, Logger } from '../logger';
import { JwtEpiredError } from './jwt-expired-exception';
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

export abstract class JwtUtils {
    /**
     * Generate Jwt token
     * @value {string | Buffer | object} the parameter to be encoded in a token
     * @options {JwtOptions} Set the secret and expiration for your token
     * @returns {string} Jwt Token
     */
    @log
    static generate(value: string | Buffer | object, options?: JwtOptions): string {
        try {
            const secret = options?.secreteKey || process.env.JWT_SECRET || 'default_secret';
            const expiration = options?.expiration || parseInt(process.env.JWT_EXPIRATION_IN_SECONDS || '60');
            return Jwt.sign(value, secret, { expiresIn: expiration });
        } catch (err) {
            Logger.error(err);
            throw err;
        }
    }

    @log
    static validate<T>(token: string, secret?: string): T {
        try {
            secret = secret || process.env.JWT_SECRET || 'default_secret';
            const result = Jwt.verify(token, secret);
            return result as unknown as T;
        } catch (err) {
            if (err instanceof Jwt.TokenExpiredError) {
                throw new JwtEpiredError(err.message, err.expiredAt);
            }
            Logger.error(err);
            throw err;
        }
    }
}
