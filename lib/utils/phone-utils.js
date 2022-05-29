"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneUtils = void 0;
const regex_utils_1 = require("./regex-utils");
class PhoneUtils {
    static clearPhone(phone) {
        return phone.replace(regex_utils_1.RegexUtils.CLEAR_NO_DIGIT_REGEX, '');
    }
    static getDDDPhone(phone) {
        let ddd = PhoneUtils.executeExpression(phone, regex_utils_1.RegexUtils.PHONE_DDD_EXTRACTOR);
        ddd = PhoneUtils.executeExpression(phone, regex_utils_1.RegexUtils.PHONE_DDD_NUMBERS_EXTRACTOR);
        return ddd;
    }
    static getPhone(phone) {
        phone = PhoneUtils.executeExpression(phone, regex_utils_1.RegexUtils.PHONE_EXTRACTOR);
        phone = PhoneUtils.clearPhone(phone);
        return phone;
    }
    static isValidPhone(phone) {
        phone = PhoneUtils.clearPhone(phone);
        return regex_utils_1.RegexUtils.PHONE_VALIDATOR_REGEX.test(phone);
    }
    static executeExpression(phone, regex) {
        const result = phone.match(regex);
        return result ? result[0] : phone;
    }
}
exports.PhoneUtils = PhoneUtils;
