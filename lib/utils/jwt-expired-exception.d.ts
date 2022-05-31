export declare class JwtEpiredError extends Error {
    expiredAt: Date;
    constructor(message: string, expiredAt: Date);
}
