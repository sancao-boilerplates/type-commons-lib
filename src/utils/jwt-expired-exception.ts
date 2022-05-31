export class JwtEpiredError extends Error {
    constructor(message: string, public expiredAt: Date) {
        super(message);
    }
}
