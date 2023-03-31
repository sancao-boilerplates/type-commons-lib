import * as Libs from '../../src/index';

describe('Export Modules - Suite Test', () => {
    it('Should be available Log module', () => {
        expect(Libs.log).toBeDefined();
        expect(Libs.LogLevel).toBeDefined();
        expect(Libs.Logger).toBeDefined();
        expect(Libs.LoggerConstants).toBeDefined();
        expect(Libs.LoggerContext).toBeDefined();
        expect(Libs.buildLogger).toBeDefined();
    });

    it('Should be available HttpStatusCode module', () => {
        expect(Libs.HttpStatusCode).toBeDefined();
    });

    it('Should be available Service module', () => {
        expect(Libs.HttpService).toBeDefined();
        expect(Libs.HttpGenericError).toBeDefined();
        expect(Libs.ConflictError).toBeDefined();
        expect(Libs.NotFoundError).toBeDefined();
        expect(Libs.InternalServerError).toBeDefined();
        expect(Libs.PreConditionError).toBeDefined();
    });

    it('Should be available Util module', () => {
        expect(Libs.PhoneUtils).toBeDefined();
        expect(Libs.CepUtils).toBeDefined();
        expect(Libs.DateUtils).toBeDefined();
        expect(Libs.EncodeUtils).toBeDefined();
    });
});
