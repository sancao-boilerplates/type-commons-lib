import { HttpStatusCode, ServerlessHandler, ServerlessProvider } from '../../../src';
import { HttpResponse } from '../../../src/request-decorator/dtos';
import { AwsServerlessHandler, GcpServerlessHandler } from '../../../src/serverless-handler/strategies';
import { GenericServerlessHandler } from '../../../src/serverless-handler/strategies/generic-serverless-handler';
import { ControllerHelper } from '../../../src/request-decorator/controller-helper';
import { RequestMockedHelper } from './helper/request-mocked-helper';

describe('[ServerlessHandler] - Suite Test', () => {
    describe('[handler]', () => {
        let mock;
        let httpMock;
        beforeEach(() => {
            jest.clearAllMocks();
            mock = jest.spyOn(ServerlessHandler as any, 'getHandlerProvicer');
        });

        it('In case thow an error should return Internal Server Error (500) as status code', async () => {
            const httpMock = jest.spyOn(GenericServerlessHandler.prototype as any, 'applyCall');
            httpMock.mockImplementationOnce(() => {
                throw new Error();
            });
            const handler = ServerlessHandler.handler(ControllerHelper, 'getTest');
            const result = await handler(RequestMockedHelper.GetRequest, RequestMockedHelper.AwsContext);
            expect(result['statusCode']).toEqual(HttpStatusCode.INTERNAL_SERVER_ERROR);
        });

        describe('[AWS]', () => {
            beforeEach(() => {
                jest.clearAllMocks();
                mock = jest.spyOn(ServerlessHandler as any, 'getHandlerProvicer');
                httpMock = jest.spyOn(AwsServerlessHandler.prototype as any, 'applyCall');
                httpMock.mockResolvedValue(new HttpResponse(HttpStatusCode.OK, 'OK'));
            });
            it('In case set no serverless provider should use AwsServerlessHandler', async () => {
                const handler = ServerlessHandler.handler(ControllerHelper, 'getTest');
                const result = (await handler(RequestMockedHelper.GetRequest, RequestMockedHelper.AwsContext)) as HttpResponse;
                expect(result.status).toEqual(HttpStatusCode.OK);
                expect(mock.mock.results[0].value instanceof AwsServerlessHandler).toBeTruthy();
            });

            it('In case set Aws as serverless provider should use AwsServerlessHandler', async () => {
                const handler = ServerlessHandler.handler(ControllerHelper, 'getTest', { serverlessProvider: ServerlessProvider.AWS });
                const result = (await handler(RequestMockedHelper.GetRequest, RequestMockedHelper.AwsContext)) as HttpResponse;
                expect(result.status).toEqual(HttpStatusCode.OK);
                expect(mock.mock.results[0].value instanceof AwsServerlessHandler).toBeTruthy();
            });
            it('In case set Aws Globally as serverless provider should use AwsServerlessHandler', async () => {
                ServerlessHandler.setProvider(ServerlessProvider.AWS);

                const handler = ServerlessHandler.handler(ControllerHelper, 'getTest');

                const result = (await handler(RequestMockedHelper.GetRequest, RequestMockedHelper.AwsContext)) as HttpResponse;
                expect(result.status).toEqual(HttpStatusCode.OK);
                expect(mock.mock.results[0].value instanceof AwsServerlessHandler).toBeTruthy();
            });
        });

        describe('[GCP]', () => {
            beforeEach(() => {
                httpMock = jest.spyOn(GcpServerlessHandler.prototype as any, 'applyCall');
                httpMock.mockResolvedValue(new HttpResponse(HttpStatusCode.OK, 'OK'));
            });
            it('In case set GCP Globally as serverless provider should use GcpServerlessHandler', async () => {
                ServerlessHandler.setProvider(ServerlessProvider.GCP);
                httpMock.mockResolvedValue(new HttpResponse(HttpStatusCode.OK, 'OK'));

                const handler = ServerlessHandler.handler(ControllerHelper, 'getTest');

                const result = (await handler(RequestMockedHelper.GetRequest, RequestMockedHelper.AwsContext)) as HttpResponse;
                expect(result.status).toEqual(HttpStatusCode.OK);
                expect(mock.mock.results[0].value instanceof GcpServerlessHandler).toBeTruthy();
            });
            it('In case set GCP as serverless provider should use GcpServerlessHandler', async () => {
                ServerlessHandler.setProvider(ServerlessProvider.AWS);
                httpMock.mockResolvedValue(new HttpResponse(HttpStatusCode.OK, 'OK'));

                const handler = ServerlessHandler.handler(ControllerHelper, 'getTest', { serverlessProvider: ServerlessProvider.GCP });

                const result = (await handler(RequestMockedHelper.GetRequest, RequestMockedHelper.AwsContext)) as HttpResponse;
                expect(result.status).toEqual(HttpStatusCode.OK);
                expect(mock.mock.results[0].value instanceof GcpServerlessHandler).toBeTruthy();
            });
        });
    });
});
