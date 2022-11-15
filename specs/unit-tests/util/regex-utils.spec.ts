import { RegexUtils } from '../../../src/utils/regex-utils';

describe('[RegexUtils]', () => {
    describe('[extract]', () => {
        it('Should extract only the token from Bearer', () => {
            const bearer = 'Bearer fjdaksf7fdfsf786saasf67sa6saf6saf';

            const result = RegexUtils.extract(bearer, RegexUtils.BEARER_REGEX);

            expect(result).not.toBeNull();
            expect(result).toEqual('fjdaksf7fdfsf786saasf67sa6saf6saf');
        });
    });

    describe('[replace]', () => {
        it('Should replace correctly non latim', () => {
            const value = 'fdsa fsad asd +ˆ&';
            const strRegex = '[^\\w-]';
            const result = RegexUtils.replace(strRegex, value, '', true);

            expect(result).not.toBeNull();
            expect(result).toEqual('fdsafsadasd');
        });
    });

    describe('[Email]', () => {
        it('Should validate email address', () => {
            let email = 'test';
            expect(email.match(RegexUtils.EMAIL_VALIDATOR_REGEX)).toBeFalsy();
            email = 'test@';
            expect(email.match(RegexUtils.EMAIL_VALIDATOR_REGEX)).toBeFalsy();
            email = 'test@t';
            expect(email.match(RegexUtils.EMAIL_VALIDATOR_REGEX)).toBeFalsy();
            email = 'test@test';
            expect(email.match(RegexUtils.EMAIL_VALIDATOR_REGEX)).toBeFalsy();
            email = 'test@test.';
            expect(email.match(RegexUtils.EMAIL_VALIDATOR_REGEX)).toBeFalsy();
            email = 'test@test.com';
            expect(email.match(RegexUtils.EMAIL_VALIDATOR_REGEX)).toBeTruthy();
            email = '1test@test.com';
            expect(email.match(RegexUtils.EMAIL_VALIDATOR_REGEX)).toBeTruthy();
            email = '_test@test.com';
            expect(email.match(RegexUtils.EMAIL_VALIDATOR_REGEX)).toBeTruthy();
            email = '2_test@test.com';
            expect(email.match(RegexUtils.EMAIL_VALIDATOR_REGEX)).toBeTruthy();
            email = '2_t-est@test.com';
            expect(email.match(RegexUtils.EMAIL_VALIDATOR_REGEX)).toBeTruthy();
            email = '2_t-+st@test.com';
            expect(email.match(RegexUtils.EMAIL_VALIDATOR_REGEX)).toBeTruthy();
        });
    });
});
