"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtUtils = void 0;
const Jwt = require("jsonwebtoken");
const logger_1 = require("../logger");
const jwt_expired_exception_1 = require("./jwt-expired-exception");
class JwtUtils {
    /**
     * Generate Jwt token
     * @value {string | Buffer | object} the parameter to be encoded in a token
     * @options {JwtOptions} Set the secret and expiration for your token
     * @returns {string} Jwt Token
     */
    static generate(value, options) {
        try {
            const secret = (options === null || options === void 0 ? void 0 : options.secreteKey) || process.env.JWT_SECRET || 'default_secret';
            const expiration = (options === null || options === void 0 ? void 0 : options.expiration) || parseInt(process.env.JWT_EXPIRATION_IN_SECONDS || '60');
            return Jwt.sign(value, secret, { expiresIn: expiration });
        }
        catch (err) {
            logger_1.Logger.error(err);
            throw err;
        }
    }
    static validate(token, secret) {
        try {
            secret = secret || process.env.JWT_SECRET || 'default_secret';
            const result = Jwt.verify(token, secret);
            return result;
        }
        catch (err) {
            if (err instanceof Jwt.TokenExpiredError) {
                throw new jwt_expired_exception_1.JwtEpiredError(err.message, err.expiredAt);
            }
            logger_1.Logger.error(err);
            throw err;
        }
    }
}
__decorate([
    logger_1.log,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", String)
], JwtUtils, "generate", null);
__decorate([
    logger_1.log,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", typeof (_a = typeof T !== "undefined" && T) === "function" ? _a : Object)
], JwtUtils, "validate", null);
exports.JwtUtils = JwtUtils;
