export declare class JwtExpiredError extends Error {
    expiredAt: Date;
    constructor(message: string, expiredAt: Date);
}
