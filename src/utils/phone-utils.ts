import { RegexUtils } from './regex-utils';

export class PhoneUtils {
    static clearPhone(phone: string): string {
        return phone.replace(RegexUtils.CLEAR_NO_DIGIT_REGEX, '');
    }

    static getDDDPhone(phone: string): string {
        let ddd = PhoneUtils.executeExpression(phone, RegexUtils.PHONE_DDD_EXTRACTOR);
        ddd = PhoneUtils.executeExpression(phone, RegexUtils.PHONE_DDD_NUMBERS_EXTRACTOR);
        return ddd;
    }

    static getPhone(phone: string): string {
        phone = PhoneUtils.executeExpression(phone, RegexUtils.PHONE_EXTRACTOR);
        phone = PhoneUtils.clearPhone(phone);
        return phone;
    }

    static isValidPhone(phone: string): boolean {
        phone = PhoneUtils.clearPhone(phone);
        return RegexUtils.PHONE_VALIDATOR_REGEX.test(phone);
    }

    private static executeExpression(phone: string, regex: RegExp): string {
        const result = phone.match(regex);
        return result ? result[0] : phone;
    }
}
