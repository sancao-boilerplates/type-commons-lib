"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtExpiredError = void 0;
class JwtExpiredError extends Error {
    constructor(message, expiredAt) {
        super(message);
        this.expiredAt = expiredAt;
    }
}
exports.JwtExpiredError = JwtExpiredError;
