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
exports.RegexUtils = void 0;
const logger_1 = require("../logger");
class RegexUtils {
    static extract(value, regex) {
        try {
            if (!value)
                return null;
            const result = value.match(regex);
            if (result && result.length > 0) {
                return result[0];
            }
            return null;
        }
        catch (err) {
            logger_1.Logger.error(err);
            return null;
        }
    }
    static replace(regex, value, replace, isGeneral = false) {
        try {
            regex = typeof regex == 'string' ? new RegExp(regex, isGeneral ? 'g' : '') : regex;
            if (!value)
                return null;
            if (replace === null || replace === undefined)
                return value;
            return value.replace(regex, replace);
        }
        catch (err) {
            logger_1.Logger.error(err);
            throw err;
        }
    }
}
RegexUtils.CLEAR_NO_DIGIT_REGEX = /[^\d]+/g;
RegexUtils.EMAIL_VALIDATOR_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
RegexUtils.FORMATTED_PHONE_VALIDATOR_REGEX = /(\(\d{2}\))\s(\d{5})-\d{4}/;
RegexUtils.PHONE_VALIDATOR_REGEX = /\d{11}/;
RegexUtils.PHONE_MASK_REGEX = /\s(\d{5})/;
RegexUtils.PHONE_DDD_EXTRACTOR = /\((\d{2})\)/;
RegexUtils.PHONE_EXTRACTOR = /(\d{5})-(\d{4})/;
RegexUtils.PHONE_DDD_NUMBERS_EXTRACTOR = /(\d{2})/;
RegexUtils.DATE_REGEX = /(\d{2})\/(\d{2})\/(\d{4})/;
RegexUtils.TIME_REGEX = /(\d{2}):(\d{2}):(\d{2})/;
RegexUtils.CEP_REGEX = /\d{8}/;
RegexUtils.BEARER_REGEX = /(?<=Bearer\s).*/;
__decorate([
    logger_1.log,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Boolean]),
    __metadata("design:returntype", String)
], RegexUtils, "replace", null);
exports.RegexUtils = RegexUtils;
