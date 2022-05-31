"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtEpiredError = void 0;
class JwtEpiredError extends Error {
    constructor(message, expiredAt) {
        super(message);
        this.expiredAt = expiredAt;
    }
}
exports.JwtEpiredError = JwtEpiredError;
