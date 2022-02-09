"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneUtils = void 0;
var regex_utils_1 = require("./regex-utils");
var PhoneUtils = /** @class */ (function () {
    function PhoneUtils() {
    }
    PhoneUtils.clearPhone = function (phone) {
        return phone.replace(regex_utils_1.RegexUtils.CLEAR_NO_DIGIT_REGEX, '');
    };
    PhoneUtils.getDDDPhone = function (phone) {
        var ddd = PhoneUtils.executeExpression(phone, regex_utils_1.RegexUtils.PHONE_DDD_EXTRACTOR);
        ddd = PhoneUtils.executeExpression(phone, regex_utils_1.RegexUtils.PHONE_DDD_NUMBERS_EXTRACTOR);
        return ddd;
    };
    PhoneUtils.getPhone = function (phone) {
        phone = PhoneUtils.executeExpression(phone, regex_utils_1.RegexUtils.PHONE_EXTRACTOR);
        phone = PhoneUtils.clearPhone(phone);
        return phone;
    };
    PhoneUtils.isValidPhone = function (phone) {
        phone = PhoneUtils.clearPhone(phone);
        return regex_utils_1.RegexUtils.PHONE_VALIDATOR_REGEX.test(phone);
    };
    PhoneUtils.executeExpression = function (phone, regex) {
        var result = phone.match(regex);
        return result ? result[0] : phone;
    };
    return PhoneUtils;
}());
exports.PhoneUtils = PhoneUtils;
