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
var CryptoJS = require("crypto-js");
var logger_1 = require("../logger");
var constants_1 = require("../constants");
var EncodeUtils = /** @class */ (function () {
    function EncodeUtils() {
    }
    EncodeUtils.encodeBase64 = function (value) {
        try {
            if (!value)
                return null;
            if (typeof value === 'object') {
                value = JSON.stringify(value);
            }
            return Buffer.from(value).toString('base64');
        }
        catch (err) {
            logger_1.Logger.error("Error while encoding value:".concat(value, " to base64"), err);
            throw err;
        }
    };
    EncodeUtils.encryptAesId = function (data) {
        var encrypted = CryptoJS.AES.encrypt(data.toString(), constants_1.AppConstants.ENCRYPT_SECRET).toString();
        var response = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encrypted));
        return response;
    };
    EncodeUtils.decodeAesId = function (data) {
        var encodeId = Buffer.from(data.toString(), 'base64').toString('utf-8');
        var bytes = CryptoJS.AES.decrypt(encodeId.toString(), constants_1.AppConstants.ENCRYPT_SECRET);
        var response = bytes.toString(CryptoJS.enc.Utf8);
        return response;
    };
    __decorate([
        logger_1.log,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", String)
    ], EncodeUtils, "encodeBase64", null);
    __decorate([
        logger_1.log,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", String)
    ], EncodeUtils, "encryptAesId", null);
    __decorate([
        logger_1.log,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", String)
    ], EncodeUtils, "decodeAesId", null);
    return EncodeUtils;
}());
exports.EncodeUtils = EncodeUtils;
