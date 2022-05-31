import { Logger } from '../logger';

export class RegexUtils {
    public static readonly CLEAR_NO_DIGIT_REGEX = /[^\d]+/g;

    public static readonly EMAIL_VALIDATOR_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;

    public static readonly FORMATTED_PHONE_VALIDATOR_REGEX = /(\(\d{2}\))\s(\d{5})-\d{4}/;

    public static readonly PHONE_VALIDATOR_REGEX = /\d{11}/;

    public static readonly PHONE_MASK_REGEX = /\s(\d{5})/;

    public static readonly PHONE_DDD_EXTRACTOR = /\((\d{2})\)/;

    public static readonly PHONE_EXTRACTOR = /(\d{5})-(\d{4})/;

    public static readonly PHONE_DDD_NUMBERS_EXTRACTOR = /(\d{2})/;

    public static readonly DATE_REGEX = /(\d{2})\/(\d{2})\/(\d{4})/;

    public static readonly TIME_REGEX = /(\d{2}):(\d{2}):(\d{2})/;

    public static readonly CEP_REGEX = /\d{8}/;

    public static readonly BEARER_REGEX = /(?<=Bearer\s).*/;

    static extract(value: string, regex: any): string {
        try {
            if (!value) return null;
            const result = value.match(regex);
            if (result && result.length > 0) {
                return result[0];
            }
            return null;
        } catch (err) {
            Logger.error(err);
            return null;
        }
    }
}
