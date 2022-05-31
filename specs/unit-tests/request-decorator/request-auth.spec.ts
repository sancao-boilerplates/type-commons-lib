import { AwsHttpResponse, HttpStatusCode, Injector, JwtUtils, ServerlessHandler } from '../../../src';
import { AuthConfig } from '../../../src/request-decorator/request-decorator-helper/auth-configs';
import { ControllerHelper } from '../../../src/request-decorator/controller-helper';
import { RequestMockedHelper } from '../serverless-handler/helper/request-mocked-helper';

describe('[RequestValidator]', () => {
    describe('[Auth]', () => {
        const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0IjoidGVzdCIsImlhdCI6MTY1MzkzNzAxOSwiZXhwIjoxNjUzOTM3MDIwfQ.RJjk1ppeBxAJA0FgFcvQA6HVzDe0cOxnRX8MWBYtDTE';
        let injectorMock = jest.spyOn(Injector, 'get');
        beforeEach(() => {
            jest.clearAllMocks();
            injectorMock.mockReturnValue(new ControllerHelper());
        });
        it('Should return 403 in case no token be provided', async () => {
            const handler = ServerlessHandler.handler(ControllerHelper, 'testAuth');
            RequestMockedHelper;
            const result = (await handler(RequestMockedHelper.GetRequest, RequestMockedHelper.AwsContext)) as AwsHttpResponse;
            expect(result).not.toBeNull();
            expect(result.statusCode).toEqual(HttpStatusCode.FORBIDDEN);
        });

        it('Should return 403 in case token be expired', async () => {
            const request = RequestMockedHelper.GetRequest;
            request.headers = { Authorization: `Bearer ${expiredToken}` };
            const handler = ServerlessHandler.handler(ControllerHelper, 'testAuth');
            RequestMockedHelper;
            const result = (await handler(RequestMockedHelper.GetRequest, RequestMockedHelper.AwsContext)) as AwsHttpResponse;
            expect(result).not.toBeNull();
            expect(result.statusCode).toEqual(HttpStatusCode.FORBIDDEN);
        });

        it('Should process request in case token is valid', async () => {
            const token = JwtUtils.generate({ test: 'test' });
            const request = RequestMockedHelper.GetRequest;
            request.headers = { Authorization: `Bearer ${token}` };
            const handler = ServerlessHandler.handler(ControllerHelper, 'testAuth');
            RequestMockedHelper;
            const result = (await handler(RequestMockedHelper.GetRequest, RequestMockedHelper.AwsContext)) as AwsHttpResponse;
            expect(result).not.toBeNull();
            expect(result.statusCode).toEqual(HttpStatusCode.OK);
        });

        it('Should use custom token validation function', async () => {
            const mock = jest.fn();
            mock.mockImplementationOnce(() => {
                test: 'test';
            });
            AuthConfig.tokenValidator = mock;
            const request = RequestMockedHelper.GetRequest;
            request.headers = { Authorization: `Bearer ${expiredToken}` };
            const handler = ServerlessHandler.handler(ControllerHelper, 'testAuth');
            RequestMockedHelper;
            const result = (await handler(RequestMockedHelper.GetRequest, RequestMockedHelper.AwsContext)) as AwsHttpResponse;
            expect(result).not.toBeNull();
            expect(result.statusCode).toEqual(HttpStatusCode.OK);
            expect(mock).toHaveBeenCalled();
        });
    });
});
