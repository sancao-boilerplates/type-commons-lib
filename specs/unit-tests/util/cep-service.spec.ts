import { AddressOrigin } from '../../../src/utils/cep/cep-type';
import { CorreiosService } from '../../../src/utils/cep/correios-serivce';
import { UtilTestHelper } from './util-test-helper';

let mockedService: jest.SpyInstance;
let correiosService: CorreiosService;

describe('Utils - CepService Test Suite', () => {
    beforeEach(() => {
        correiosService = new CorreiosService();
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('GetFromCorreios', () => {
        beforeEach(() => {
            mockedService = jest.spyOn(CorreiosService.prototype as any, 'post');
        });

        it('Should successfully transform correios response to lib response ', async () => {
            mockedService.mockResolvedValue(UtilTestHelper.ApiCorreiosCepResponseOk);
            const result = await correiosService.getFromCorreios(UtilTestHelper.cep);
            expect(result).toBeDefined();
            expect(result.cep).toEqual(UtilTestHelper.correiosResponseJson.cep);
            expect(result.city).toEqual(UtilTestHelper.correiosResponseJson.cidade);
            expect(result.neighborhood).toEqual(UtilTestHelper.correiosResponseJson.bairro);
            expect(result.origin).toEqual(AddressOrigin.API_CORREIOS);
            expect(result.state).toEqual(UtilTestHelper.correiosResponseJson.uf);
            expect(result.street).toEqual(UtilTestHelper.correiosResponseJson.end);
        });

        it('Should return null in case cep is invalid', async () => {
            mockedService.mockResolvedValue(UtilTestHelper.ApiCorreiosCepResponseInvalidCep);
            const result = await correiosService.getFromCorreios(UtilTestHelper.cep);
            expect(result).toBeNull();
        });
        it('Should return null in case cep not found', async () => {
            mockedService.mockResolvedValue(UtilTestHelper.ApiCorreiosCepResponseInvalidCep);
            const result = await correiosService.getFromCorreios(UtilTestHelper.cep);
            expect(result).toBeNull();
        });

        it('Should returns null even in case the request throws any error', async () => {
            const error = new Error('Error');
            mockedService.mockImplementationOnce(() => {
                throw error;
            });
            const result = await correiosService.getFromCorreios(UtilTestHelper.cep);
            expect(result).toBeNull();
        });

        it(`Should assemble correctly request config for correios request`, async () => {
            jest.clearAllMocks();
            mockedService.mockResolvedValue(UtilTestHelper.ApiCorreiosCepResponseOk);
            const correiosUrl = 'SigepMasterJPA/AtendeClienteService/AtendeCliente';
            await correiosService.getFromCorreios(UtilTestHelper.cep);
            const config = correiosService.getRequestConfig();
            expect(mockedService.mock.calls[0][0]).toBe(correiosUrl);
            expect(mockedService.mock.calls[0][1]).toBe(UtilTestHelper.correiosRequestBody(UtilTestHelper.cep));
            expect(config.baseURL).toBe('https://apps.correios.com.br');
            expect(config.headers['Accept']).toBe('text/plain;charset=utf-8');
            expect(config.headers['Content-Type']).toBe('text/plain;charset=utf-8');
        });
    });
});
