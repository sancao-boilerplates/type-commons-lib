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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Utils = void 0;
const aws_sdk_1 = require("aws-sdk");
const fileType = require("file-type");
const logger_1 = require("../logger");
class S3Utils {
    /**
     * Provide the file as base64 string
     * @param base64File {string}
     * The s3 bucket name
     * @param bucketName {string}
     * Object key
     * @param key {string}
     * Define if the file will be public, default false
     * @param isPublic {boolea}
     * It returns the aws url
     * @returns {string}
     */
    static uploadFile(base64File, bucketName, key, isPublic = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const buffer = Buffer.from(base64File, 'base64');
                const s3 = S3Utils.getS3();
                const type = yield fileType.fromBuffer(buffer);
                yield s3
                    .putObject({
                    Body: buffer,
                    Bucket: bucketName,
                    Key: key,
                    ContentType: type.mime,
                    ACL: isPublic ? 'public-read' : '',
                })
                    .promise();
                return `https://${bucketName}.s3.amazonaws.com/${key}`;
            }
            catch (error) {
                logger_1.Logger.error(error);
                throw error;
            }
        });
    }
    static delete(bucketName, key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const s3 = S3Utils.getS3();
                yield s3
                    .deleteObject({
                    Bucket: bucketName,
                    Key: key,
                })
                    .promise();
            }
            catch (error) {
                logger_1.Logger.error(error);
                throw error;
            }
        });
    }
    static getFile(bucketName, key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const s3 = S3Utils.getS3();
                const result = yield s3
                    .getObject({
                    Bucket: bucketName,
                    Key: key,
                })
                    .promise();
                return result.Body;
            }
            catch (error) {
                logger_1.Logger.error(error);
                throw error;
            }
        });
    }
    static getS3() {
        return process.env.NODE_ENV != 'local'
            ? new aws_sdk_1.S3()
            : new aws_sdk_1.S3({
                credentials: {
                    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
                    secretAccessKey: process.env.AWS_S3_SECRETE_KEY,
                },
            });
    }
}
__decorate([
    logger_1.log,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Boolean]),
    __metadata("design:returntype", Promise)
], S3Utils, "uploadFile", null);
__decorate([
    logger_1.log,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], S3Utils, "delete", null);
__decorate([
    logger_1.log,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], S3Utils, "getFile", null);
exports.S3Utils = S3Utils;
