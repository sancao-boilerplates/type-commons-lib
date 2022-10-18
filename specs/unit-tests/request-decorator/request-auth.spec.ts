import { AuthSession, AwsHttpResponse, DefaultHttpService, HttpService, HttpStatusCode, Injector, JwtUtils, ServerlessHandler } from '../../../src';
import { AuthConfig } from '../../../src/request-decorator/request-decorator-helper/auth-configs';
import { ControllerHelper } from '../../../src/request-decorator/controller-helper';
import { RequestMockedHelper } from '../serverless-handler/helper/request-mocked-helper';
import { HttpClient } from '../../../src/service/http-client';

describe('[RequestValidator]', () => {
    describe('[Auth]', () => {
        const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0IjoidGVzdCIsImlhdCI6MTY1MzkzNzAxOSwiZXhwIjoxNjUzOTM3MDIwfQ.RJjk1ppeBxAJA0FgFcvQA6HVzDe0cOxnRX8MWBYtDTE';
        let injectorMock = jest.spyOn(Injector, 'get');
        beforeEach(() => {
            jest.clearAllMocks();
            injectorMock.mockReturnValue(new ControllerHelper());
        });
        it('Should return 401 in case no token be provided', async () => {
            const handler = ServerlessHandler.handler(ControllerHelper, 'testAuth');
            RequestMockedHelper;
            const result = (await handler(RequestMockedHelper.GetRequest, RequestMockedHelper.AwsContext)) as AwsHttpResponse;
            expect(result).not.toBeNull();
            expect(result.statusCode).toEqual(HttpStatusCode.UNAUTHORIZED);
        });

        it('Should validate token in auth api from auth url from envs ', async () => {
            process.env.AUTH_TOKEN_VALIDATOR_URL = 'auth-test-url';
            const apiSpy = jest.spyOn(HttpService.prototype as any, 'get');
            apiSpy.mockResolvedValue({
                username: 'test',
            });
            const request = RequestMockedHelper.GetRequest;
            request.headers = { Authorization: `Bearer ${expiredToken}` };
            const handler = ServerlessHandler.handler(ControllerHelper, 'testAuth');
            const result = (await handler(RequestMockedHelper.GetRequest, RequestMockedHelper.AwsContext)) as AwsHttpResponse;
            expect(apiSpy).toBeCalled();
            expect(apiSpy.mock.calls[0][0]).toBe(process.env.AUTH_TOKEN_VALIDATOR_URL);
            expect(apiSpy.mock.calls[0][1]).toMatchObject({ headers: request.headers });
            expect(result).not.toBeNull();
            expect(result.statusCode).toEqual(HttpStatusCode.OK);
        });

        it('Should throw Forbiden in case user has no required role', async () => {
            process.env.AUTH_TOKEN_VALIDATOR_URL = 'auth-test-url';
            const apiSpy = jest.spyOn(HttpService.prototype as any, 'get');
            apiSpy.mockResolvedValue({
                username: 'test',
                role: 1,
            });
            const request = RequestMockedHelper.GetRequest;
            request.headers = { Authorization: `Bearer ${expiredToken}` };
            const handler = ServerlessHandler.handler(ControllerHelper, 'testAuthRole');
            const result = (await handler(RequestMockedHelper.GetRequest, RequestMockedHelper.AwsContext)) as AwsHttpResponse;
            expect(apiSpy).toBeCalled();
            expect(result).not.toBeNull();
            expect(result.statusCode).toEqual(HttpStatusCode.FORBIDDEN);
            expect(JSON.parse(result.body)).toEqual({ message: 'User has no permission for this resource.' });
        });

        it('Should return OK in case user has required role', async () => {
            process.env.AUTH_TOKEN_VALIDATOR_URL = 'auth-test-url';
            const apiSpy = jest.spyOn(HttpService.prototype as any, 'get');
            apiSpy.mockResolvedValue({
                username: 'test',
                role: 4,
            });
            const request = RequestMockedHelper.GetRequest;
            request.headers = { Authorization: `Bearer ${expiredToken}` };
            const handler = ServerlessHandler.handler(ControllerHelper, 'testAuthRole');
            const result = (await handler(RequestMockedHelper.GetRequest, RequestMockedHelper.AwsContext)) as AwsHttpResponse;
            expect(apiSpy).toBeCalled();
            expect(result).not.toBeNull();
            expect(result.statusCode).toEqual(HttpStatusCode.OK);
        });

        it('Should use custom token validation function', async () => {
            const mock = jest.fn();
            mock.mockResolvedValueOnce({
                username: 'test',
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
