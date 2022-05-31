import { AwsHttpResponse, Injector } from '../../../../src';
import { InputRequest } from '../../../../src/request-decorator/dtos';
import { HttpMethod } from '../../../../src/request-decorator/types';
import { AwsServerlessHandler } from '../../../../src/serverless-handler/strategies';
import { ControllerHelper } from '../../../../src/request-decorator/controller-helper';
import { RequestMockedHelper } from '../helper/request-mocked-helper';

describe('[AwsServerlessHandler] - Suite Test', () => {
    describe('[handler]', () => {
        let handler = new AwsServerlessHandler();
        let methodMock;
        let injector = jest.spyOn(Injector, 'get');
        beforeEach(() => {
            jest.clearAllMocks();
            methodMock = jest.spyOn(ControllerHelper.prototype as any, 'getTest');
            injector.mockReturnValue(new ControllerHelper());
        });

        describe('[getRawRequest]', () => {
            it('Should create correctly InpuRequest object', async () => {
                const getRawRequestMock = jest.spyOn(AwsServerlessHandler.prototype as any, 'getRawRequest');
                await handler.applyCall(ControllerHelper, 'getTest', RequestMockedHelper.GetRequest, RequestMockedHelper.AwsContext);
                var result = getRawRequestMock.mock.results[0];
                const req: InputRequest = {
                    method: RequestMockedHelper.GetRequest.httpMethod as HttpMethod,
                    rawRequest: RequestMockedHelper.GetRequest,
                    requestId: RequestMockedHelper.AwsContext.awsRequestId,
                    body: RequestMockedHelper.GetRequest.body,
                    headers: RequestMockedHelper.GetRequest.headers,
                    host: RequestMockedHelper.GetRequest.requestContext.identity.sourceIp,
                    path: RequestMockedHelper.GetRequest.path,
                    pathParams: RequestMockedHelper.GetRequest.pathParameters,
                    queryParams: RequestMockedHelper.GetRequest.queryStringParameters,
                    userAgent: RequestMockedHelper.GetRequest.requestContext.identity.userAgent,
                };

                expect(result.value).toMatchObject(req);
            });

            it('In case in headers is passed an correlation ID it should be kept', async () => {
                const getRawRequestMock = jest.spyOn(AwsServerlessHandler.prototype as any, 'getRawRequest');
                const rawRequest = RequestMockedHelper.GetRequest;
                const oldValue = rawRequest.headers;
                rawRequest.headers = new Map<string, unknown>();
                const correlation = 'some-new-correlation-id';
                rawRequest.headers = { 'x-correlation-id': correlation };
                await handler.applyCall(ControllerHelper, 'getTest', rawRequest, RequestMockedHelper.AwsContext);
                var result = getRawRequestMock.mock.results[0];
                const value = result.value as InputRequest;

                expect(value.requestId).toEqual(correlation);
                RequestMockedHelper.GetRequest.headers = oldValue;
            });

            it('In case in headers theres no correlation ID shoudl get request id from aws context', async () => {
                const getRawRequestMock = jest.spyOn(AwsServerlessHandler.prototype as any, 'getRawRequest');

                await handler.applyCall(ControllerHelper, 'getTest', RequestMockedHelper.GetRequest, RequestMockedHelper.AwsContext);
                var result = getRawRequestMock.mock.results[0];
                const value = result.value as InputRequest;

                expect(value.requestId).toEqual(RequestMockedHelper.AwsContext.awsRequestId);
            });
        });

        describe('[handleHttpResponse]', () => {
            it('In case success should return AwsResponse Object', async () => {
                const resp = (await handler.applyCall(ControllerHelper, 'getTest', RequestMockedHelper.GetRequest, RequestMockedHelper.AwsContext)) as AwsHttpResponse;
                expect(resp.statusCode).toEqual(expect.any(Number));
                expect(resp.body).toEqual(expect.any(String));
            });
        });
    });
});
