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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncodeUtils = void 0;
const Crypto = require("crypto");
const CryptoJS = require("crypto-js");
const node_smart_log_1 = require("node-smart-log");
const constants_1 = require("../constants");
class EncodeUtils {
    static encodeBase64(value) {
        try {
            if (!value)
                return null;
            if (typeof value === 'object') {
                value = JSON.stringify(value);
            }
            return Buffer.from(value).toString('base64');
        }
        catch (err) {
            node_smart_log_1.Logger.error(`Error while encoding value:${value} to base64`, err);
            throw err;
        }
    }
    /**
     * Encrypt your string or object using CryptoJs lib, provide a secret or set CRYPT_SECRET environment variable
     * @param data {string | object}
     * @returns encrypted {string}
     */
    static encryptAesId(data, secret) {
        const encrypted = CryptoJS.AES.encrypt(data.toString(), secret || constants_1.AppConstants.ENCRYPT_SECRET).toString();
        const response = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encrypted));
        return response;
    }
    static decodeAesId(data) {
        const encodeId = Buffer.from(data.toString(), 'base64').toString('utf-8');
        const bytes = CryptoJS.AES.decrypt(encodeId.toString(), constants_1.AppConstants.ENCRYPT_SECRET);
        const response = bytes.toString(CryptoJS.enc.Utf8);
        return response;
    }
    /**
     * Generates MD5 Hash for a provided string
     * @param data {string}
     * @returns encrypted {string}
     */
    static generateMd5Hash(data) {
        return Crypto.createHash('md5').update(data).digest('hex');
    }
}
__decorate([
    (0, node_smart_log_1.log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], EncodeUtils, "encodeBase64", null);
__decorate([
    (0, node_smart_log_1.log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", String)
], EncodeUtils, "encryptAesId", null);
__decorate([
    (0, node_smart_log_1.log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], EncodeUtils, "decodeAesId", null);
__decorate([
    (0, node_smart_log_1.log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], EncodeUtils, "generateMd5Hash", null);
exports.EncodeUtils = EncodeUtils;
