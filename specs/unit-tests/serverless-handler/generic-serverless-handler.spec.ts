import { HttpStatusCode, Injector, ServerlessHandler } from '../../../src';
import { HttpResponse } from '../../../src/request-decorator/dtos';
import { AwsServerlessHandler } from '../../../src/serverless-handler/strategies';
import { GenericServerlessHandler } from '../../../src/serverless-handler/strategies/generic-serverless-handler';
import { ControllerHelper } from '../../../src/request-decorator/controller-helper';
import { HandlerHelperTest } from './helper/handler-teste-helper';
import { RequestMockedHelper } from './helper/request-mocked-helper';

describe('[GenericServerlessHandler] - Suite Test', () => {
    describe('[handler]', () => {
        let methodMock;
        let injector = jest.spyOn(Injector, 'get');
        beforeEach(() => {
            jest.clearAllMocks();
            methodMock = jest.spyOn(ControllerHelper.prototype as any, 'getTest');
            injector.mockReturnValue(new ControllerHelper());
        });

        describe('[applyCall]', () => {
            let logRequestSpy;
            let logResponseSpy;
            let conectDbSpy;
            const hand = new HandlerHelperTest();
            beforeEach(() => {
                jest.clearAllMocks();
                logRequestSpy = jest.spyOn(GenericServerlessHandler.prototype as any, 'logRequest');
                logResponseSpy = jest.spyOn(GenericServerlessHandler.prototype as any, 'logResponse');
                conectDbSpy = jest.spyOn(GenericServerlessHandler.prototype as any, 'conectDb');
                methodMock.mockReturnValue('OK');
            });
            it('Should always calling LogRequest, LogResponse and ConnectDB', async () => {
                await hand.applyCall(ControllerHelper, 'getTest', RequestMockedHelper.GetRequest, RequestMockedHelper.AwsContext, new Date());
                expect(logRequestSpy).toHaveBeenCalledTimes(1);
                expect(logResponseSpy).toHaveBeenCalledTimes(1);
                expect(conectDbSpy).toHaveBeenCalledTimes(1);
            });

            it('Should always calling LogRequest before try connect DB', async () => {
                logRequestSpy.mockImplementationOnce(() => {
                    throw new Error();
                });
                await hand.applyCall(ControllerHelper, 'getTest', RequestMockedHelper.GetRequest, RequestMockedHelper.AwsContext, new Date());
                expect(logRequestSpy).toHaveBeenCalledTimes(1);
                expect(logResponseSpy).toHaveBeenCalledTimes(1);
                expect(conectDbSpy).toBeCalledTimes(0);
                expect(methodMock).toBeCalledTimes(0);
            });

            it('Should always calling LogResponse', async () => {
                logRequestSpy.mockImplementationOnce(() => {
                    throw new Error();
                });
                await hand.applyCall(ControllerHelper, 'getTest', RequestMockedHelper.GetRequest, RequestMockedHelper.AwsContext, new Date());
                expect(logRequestSpy).toHaveBeenCalledTimes(1);
                expect(logResponseSpy).toHaveBeenCalledTimes(1);
                expect(conectDbSpy).toBeCalledTimes(0);
                expect(methodMock).toBeCalledTimes(0);
            });

            it('Should return Internal Server Error in case unexpected error', async () => {
                logRequestSpy.mockImplementationOnce(() => {
                    throw new Error();
                });

                const response = (await hand.applyCall(ControllerHelper, 'getTest', RequestMockedHelper.GetRequest, RequestMockedHelper.AwsContext, new Date())) as HttpResponse;
                expect(response.status).toEqual(HttpStatusCode.INTERNAL_SERVER_ERROR);
            });
        });
    });
});
