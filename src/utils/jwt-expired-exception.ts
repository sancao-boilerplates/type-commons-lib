export class JwtExpiredError extends Error {
    constructor(message: string, public expiredAt: Date) {
        super(message);
    }
}
