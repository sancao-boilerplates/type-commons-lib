export declare class RegexUtils {
    static readonly CLEAR_NO_DIGIT_REGEX: RegExp;
    static readonly EMAIL_VALIDATOR_REGEX: RegExp;
    static readonly FORMATTED_PHONE_VALIDATOR_REGEX: RegExp;
    static readonly PHONE_VALIDATOR_REGEX: RegExp;
    static readonly PHONE_MASK_REGEX: RegExp;
    static readonly PHONE_DDD_EXTRACTOR: RegExp;
    static readonly PHONE_EXTRACTOR: RegExp;
    static readonly PHONE_DDD_NUMBERS_EXTRACTOR: RegExp;
    static readonly DATE_REGEX: RegExp;
    static readonly TIME_REGEX: RegExp;
    static readonly CEP_REGEX: RegExp;
    static readonly BEARER_REGEX: RegExp;
    static extract(value: string, regex: any): string;
    static replace(regex: string | RegExp, value: string, replace: string, isGeneral?: boolean): string;
}
