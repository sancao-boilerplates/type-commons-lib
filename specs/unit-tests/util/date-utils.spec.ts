import { DateUtils, UnitOfTime } from '../../../src';
describe('[DateUtils]', () => {
    describe('[Compare]', () => {
        it('Should return 1 in case date is after date 2', () => {
            const date = DateUtils.nowPlusAsString(5, UnitOfTime.DAY, 'DD/MM/YYYY');
            const date2 = DateUtils.nowAsString();
            const result = DateUtils.compare(date, date2);
            expect(result).toBe(1);
        });
        it('Should return 0 in case date is the same as date 2', () => {
            const date = DateUtils.nowPlusAsString(5, UnitOfTime.DAY, 'DD/MM/YYYY');
            const date2 = DateUtils.nowPlusAsString(5, UnitOfTime.DAY, 'DD/MM/YYYY');
            const result = DateUtils.compare(date, date2);
            expect(result).toBe(0);
        });
        it('Should return -1 in case date is before date 2', () => {
            const date = DateUtils.nowPlusAsString(1, UnitOfTime.DAY, 'DD/MM/YYYY');
            const date2 = DateUtils.nowPlusAsString(5, UnitOfTime.DAY, 'DD/MM/YYYY');
            const result = DateUtils.compare(date, date2);
            expect(result).toBe(-1);
        });
    });
});
