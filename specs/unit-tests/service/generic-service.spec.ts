import axios from 'axios';

import { GenericServiceTest } from './test-generic-service';
import { ServiceTestHelper } from './service-test-helper';
import { HttpService } from '../../../src/service/generic-service';
import { AxiosRequestConfig } from 'axios';
import { LoggerConstants, LoggerContext } from '../../../src/logger';
import { HttpHeaders } from '../../../src/service/http-headers';
import { RequestOptions } from '../../../src/service/request-options';
const url = '/v2/5ec85ee32f00006500db6fa7';
const baseUrl = 'http://www.mocky.io';
let service: GenericServiceTest;
let mockedAxios: jest.Mocked<typeof axios>;
jest.mock('axios');

describe('Generic Service Suite Test', () => {
    beforeEach(() => {
        mockedAxios = axios as jest.Mocked<typeof axios>;
        mockedAxios.request.mockResolvedValue(ServiceTestHelper.AxiosResponses.Ok);
        service = new GenericServiceTest({ baseUrl: baseUrl });
    });
    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    describe('Constructor', () => {
        it('Should create default options even if no parameters is provided', () => {
            function validateOptions() {
                expect(service['requestConfig']).not.toBeNull();
                expect(service['requestConfig']).not.toBeUndefined();
            }

            service = new GenericServiceTest();
            validateOptions();
            service = new GenericServiceTest(null);
            validateOptions();
            service = new GenericServiceTest(undefined);
            validateOptions();
            service = new GenericServiceTest({});
            validateOptions();
        });

        it('Should set default timeout in case it is not provided', () => {
            function validateTimeOut() {
                expect(service['requestConfig'].timeout).toBe(HttpService['TEN_SECONDS_TIMEOUT']);
            }
            service = new GenericServiceTest();
            validateTimeOut();
            service = new GenericServiceTest(null);
            validateTimeOut();
            service = new GenericServiceTest(undefined);
            validateTimeOut();
            service = new GenericServiceTest({});
            validateTimeOut();
        });

        it('Should set header content type equals to json in case it is not provided', () => {
            function validateContentType() {
                expect(service['requestConfig'].headers[HttpHeaders.ContentType]).toBe(HttpHeaders.MediaTypes.ApplicationJson);
            }
            service = new GenericServiceTest();
            validateContentType();
            service = new GenericServiceTest(null);
            validateContentType();
            service = new GenericServiceTest(undefined);
            validateContentType();
            service = new GenericServiceTest({});
            validateContentType();
        });
    });

    describe('Http Methods', () => {
        beforeEach(() => {
            service = new GenericServiceTest({ baseUrl: baseUrl });
        });
        afterEach(() => {
            jest.clearAllMocks();
        });

        it('Should respect all provided methods', async (done) => {
            const spyRequest = jest.spyOn(GenericServiceTest.prototype as any, 'executeRequest').mockResolvedValue('');
            await service.get(url);
            expect(spyRequest.mock.calls[0][0]).toBe('GET');
            await service.post(url);
            expect(spyRequest.mock.calls[1][0]).toBe('POST');
            await service.put(url);
            expect(spyRequest.mock.calls[2][0]).toBe('PUT');
            await service.patch(url);
            expect(spyRequest.mock.calls[3][0]).toBe('PATCH');
            await service.delete(url);
            expect(spyRequest.mock.calls[4][0]).toBe('DELETE');
            done();
        });

        it('Should respect RequestConfig', async (done) => {
            const requestConfig: AxiosRequestConfig = {
                headers: { customHeader: 'header' },
                method: 'DELETE',
            };
            const spyRequest = jest.spyOn(GenericServiceTest.prototype as any, 'executeRequest').mockResolvedValue('');
            await service.get(url, requestConfig);
            expect(spyRequest.mock.calls[0][0]).toBe('GET');
            expect(spyRequest.mock.calls[0][3]).toBe(requestConfig);

            await service.post(url, null, requestConfig);
            expect(spyRequest.mock.calls[1][0]).toBe('POST');
            expect(spyRequest.mock.calls[1][3]).toBe(requestConfig);

            await service.put(url, null, requestConfig);
            expect(spyRequest.mock.calls[2][0]).toBe('PUT');
            expect(spyRequest.mock.calls[2][3]).toBe(requestConfig);

            await service.patch(url, null, requestConfig);
            expect(spyRequest.mock.calls[3][0]).toBe('PATCH');
            expect(spyRequest.mock.calls[3][3]).toBe(requestConfig);

            await service.delete(url, null, requestConfig);
            expect(spyRequest.mock.calls[4][0]).toBe('DELETE');
            expect(spyRequest.mock.calls[4][3]).toBe(requestConfig);
            done();
        });

        it('Should respect RequestOptions', async (done) => {
            const requestOptions: RequestOptions = {
                returnHeaders: true,
            };
            const spyRequest = jest.spyOn(GenericServiceTest.prototype as any, 'executeRequest').mockResolvedValue('');
            await service.get(url, null, requestOptions);
            expect(spyRequest.mock.calls[0][0]).toBe('GET');
            expect(spyRequest.mock.calls[0][4]).toBe(requestOptions);

            await service.post(url, null, null, requestOptions);
            expect(spyRequest.mock.calls[1][0]).toBe('POST');
            expect(spyRequest.mock.calls[1][4]).toBe(requestOptions);

            await service.put(url, null, null, requestOptions);
            expect(spyRequest.mock.calls[2][0]).toBe('PUT');
            expect(spyRequest.mock.calls[2][4]).toBe(requestOptions);

            await service.patch(url, null, null, requestOptions);
            expect(spyRequest.mock.calls[3][0]).toBe('PATCH');
            expect(spyRequest.mock.calls[3][4]).toBe(requestOptions);

            await service.delete(url, null, null, requestOptions);
            expect(spyRequest.mock.calls[4][0]).toBe('DELETE');
            expect(spyRequest.mock.calls[4][4]).toBe(requestOptions);
            done();
        });

        it('Should allows payload as string', async (done) => {
            const requestConfig: AxiosRequestConfig = {
                headers: { customHeader: 'header' },
                method: 'DELETE',
            };
            const stringPayload = 'some string as payload';
            const spyRequest = jest.spyOn(GenericServiceTest.prototype as any, 'executeRequest').mockResolvedValue('');
            await service.get(url, requestConfig);
            expect(spyRequest.mock.calls[0][0]).toBe('GET');
            expect(spyRequest.mock.calls[0][2]).toBeNull();
            expect(spyRequest.mock.calls[0][3]).toBe(requestConfig);

            await service.post(url, stringPayload, requestConfig);
            expect(spyRequest.mock.calls[1][0]).toBe('POST');
            expect(spyRequest.mock.calls[1][2]).toBe(stringPayload);
            expect(spyRequest.mock.calls[1][3]).toBe(requestConfig);

            await service.put(url, stringPayload, requestConfig);
            expect(spyRequest.mock.calls[2][0]).toBe('PUT');
            expect(spyRequest.mock.calls[2][2]).toBe(stringPayload);
            expect(spyRequest.mock.calls[2][3]).toBe(requestConfig);

            await service.patch(url, stringPayload, requestConfig);
            expect(spyRequest.mock.calls[3][0]).toBe('PATCH');
            expect(spyRequest.mock.calls[3][2]).toBe(stringPayload);
            expect(spyRequest.mock.calls[3][3]).toBe(requestConfig);

            await service.delete(url, stringPayload, requestConfig);
            expect(spyRequest.mock.calls[4][0]).toBe('DELETE');
            expect(spyRequest.mock.calls[4][2]).toBe(stringPayload);
            expect(spyRequest.mock.calls[4][3]).toBe(requestConfig);
            done();
        });

        it('Should allows payload as object', async (done) => {
            const requestConfig: AxiosRequestConfig = {
                headers: { customHeader: 'header' },
                method: 'DELETE',
            };
            const objectPayload = { value: 'testPayload' };
            const spyRequest = jest.spyOn(GenericServiceTest.prototype as any, 'executeRequest').mockResolvedValue('');
            await service.get(url, requestConfig);
            expect(spyRequest.mock.calls[0][0]).toBe('GET');
            expect(spyRequest.mock.calls[0][2]).toBeNull();
            expect(spyRequest.mock.calls[0][3]).toBe(requestConfig);

            await service.post(url, objectPayload, requestConfig);
            expect(spyRequest.mock.calls[1][0]).toBe('POST');
            expect(spyRequest.mock.calls[1][2]).toBe(objectPayload);
            expect(spyRequest.mock.calls[1][3]).toBe(requestConfig);

            await service.put(url, objectPayload, requestConfig);
            expect(spyRequest.mock.calls[2][0]).toBe('PUT');
            expect(spyRequest.mock.calls[2][2]).toBe(objectPayload);
            expect(spyRequest.mock.calls[2][3]).toBe(requestConfig);

            await service.patch(url, objectPayload, requestConfig);
            expect(spyRequest.mock.calls[3][0]).toBe('PATCH');
            expect(spyRequest.mock.calls[3][2]).toBe(objectPayload);
            expect(spyRequest.mock.calls[3][3]).toBe(requestConfig);

            await service.delete(url, objectPayload, requestConfig);
            expect(spyRequest.mock.calls[4][0]).toBe('DELETE');
            expect(spyRequest.mock.calls[4][2]).toBe(objectPayload);
            expect(spyRequest.mock.calls[4][3]).toBe(requestConfig);
            done();
        });
    });

    describe('ExecuteRequest', () => {
        it('All request must have the correlationId Header', async (done) => {
            const spy = jest.spyOn(mockedAxios, 'request');
            await service.get(url);
            const config: AxiosRequestConfig = spy.mock.calls[0][0];
            expect(config.headers[LoggerConstants.CorrelationIdHeader]).toBeTruthy();
            done();
        });

        it('Should reuse the logger Context CorrelatonId', async (done) => {
            const spy = jest.spyOn(mockedAxios, 'request');
            const correlationId = 'someCorrelationId';
            LoggerContext.setCorrelationId(correlationId);
            await service.get(url);
            const config: AxiosRequestConfig = spy.mock.calls[0][0];
            expect(config.headers[LoggerConstants.CorrelationIdHeader]).toBeTruthy();
            expect(config.headers[LoggerConstants.CorrelationIdHeader]).toBe(correlationId);
            done();
        });

        it('Should use the default AxiosRequestConfig in case no config has been provided', async (done) => {
            const defaultConfig = service['requestConfig'];
            const spy = jest.spyOn(mockedAxios, 'request');
            await service.get(url);
            const config: AxiosRequestConfig = spy.mock.calls[0][0];
            expect(config.timeout).toBe(defaultConfig.timeout);
            expect(config.baseURL).toBe(defaultConfig.baseURL);
            expect(config.headers[HttpHeaders.ContentType]).toBe(defaultConfig.headers[HttpHeaders.ContentType]);
            done();
        });

        it('Should keep the function http method', async (done) => {
            const newConfig: AxiosRequestConfig = {
                method: 'delete',
            };
            const spy = jest.spyOn(mockedAxios, 'request');
            await service.get(url, newConfig);
            const config: AxiosRequestConfig = spy.mock.calls[0][0];
            expect(config.method).toBe('GET');
            done();
        });
        it('Should keep the function call http url', async (done) => {
            const newConfig: AxiosRequestConfig = {
                url: 'newUrl',
            };
            const spy = jest.spyOn(mockedAxios, 'request');
            await service.get(url, newConfig);
            const config: AxiosRequestConfig = spy.mock.calls[0][0];
            expect(config.url).toBe(url);
            done();
        });
        it('Should keep the function call payload', async (done) => {
            const newConfig: AxiosRequestConfig = {
                data: 'newPayload',
            };
            const spy = jest.spyOn(mockedAxios, 'request');
            await service.post(url, 'payload', newConfig);
            const config: AxiosRequestConfig = spy.mock.calls[0][0];
            expect(config.data).toBe('payload');
            done();
        });
        it('Should keep the new request config but url, payload and method', async (done) => {
            const newConfig: AxiosRequestConfig = {
                auth: {
                    password: 'psw',
                    username: 'user',
                },
                headers: { custom: 'custom' },
            };
            const spy = jest.spyOn(mockedAxios, 'request');
            await service.post(url, 'payload', newConfig);
            const config: AxiosRequestConfig = spy.mock.calls[0][0];
            expect(config.auth).toBe(newConfig.auth);
            expect(config.headers.custom).toBeTruthy();
            expect(config.headers.custom).toBe(newConfig.headers.custom);
            done();
        });
    });
});
