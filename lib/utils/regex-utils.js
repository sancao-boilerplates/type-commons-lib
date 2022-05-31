"use strict";
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
}
exports.RegexUtils = RegexUtils;
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
