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
});
