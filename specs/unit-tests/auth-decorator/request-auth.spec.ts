import 'reflect-metadata';
process.env.NODE_ENV = 'local';
import Container from 'typedi';
import { AuthConfig, AwsHttpResponse, DefaultHttpService, HttpStatusCode, Injector, ServerlessHandler } from '../../../src';

export * from './controller-helper';
import { RequestMockedHelper } from './request-mocked-helper';

describe('[Auth]', () => {
    const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0IjoidGVzdCIsImlhdCI6MTY1MzkzNzAxOSwiZXhwIjoxNjUzOTM3MDIwfQ.RJjk1ppeBxAJA0FgFcvQA6HVzDe0cOxnRX8MWBYtDTE';
    let injectorMock = jest.spyOn(Injector, 'get');
    let event = RequestMockedHelper.generateAwsRequest();
    beforeAll(() => {
        ServerlessHandler.setDependencyInjector(Container);
    });
    beforeEach(() => {
        jest.clearAllMocks();
        event = RequestMockedHelper.generateAwsRequest();
    });
    it('Should return 401 in case no token be provided', async () => {
        const handler = ServerlessHandler.handler();

        const result = (await handler(event, {})) as AwsHttpResponse;

        expect(result).not.toBeNull();
        expect(result.statusCode).toEqual(HttpStatusCode.UNAUTHORIZED);
        expect(JSON.parse(result.body).message).toEqual('Token not found');
    });

    it('Should throw Forbiden in case user has no required role', async () => {
        event.path = `${event.path}/role`;
        event.headers = { Authorization: expiredToken };
        const spy = jest.spyOn(DefaultHttpService.prototype as any, 'get');
        spy.mockResolvedValueOnce({ role: 1 });
        const handler = ServerlessHandler.handler();

        const result = (await handler(event, {})) as AwsHttpResponse;

        expect(result).not.toBeNull();
        expect(result.statusCode).toEqual(HttpStatusCode.FORBIDDEN);
        expect(JSON.parse(result.body).message).toEqual('User has no permission for this resource.');
        expect(spy).toHaveBeenCalled();
    });
    it('Should return OK in case user has required role', async () => {
        event.path = `${event.path}/role`;
        event.headers = { Authorization: expiredToken };
        const spy = jest.spyOn(DefaultHttpService.prototype as any, 'get');
        spy.mockResolvedValueOnce({ role: 3 });
        const handler = ServerlessHandler.handler();

        const result = (await handler(event, {})) as AwsHttpResponse;

        expect(result).not.toBeNull();
        expect(result.statusCode).toEqual(HttpStatusCode.OK);
        expect(spy).toHaveBeenCalled();
    });

    it('Should use custom token validation function', async () => {
        AuthConfig.tokenValidator = (token) => {
            if (token != expiredToken) throw new Error('Invalid token');
            return {
                token: expiredToken,
                username: 'Test',
            };
        };
        event.path = `${event.path}/role`;
        event.headers = { Authorization: expiredToken };
        const spy = jest.spyOn(DefaultHttpService.prototype as any, 'get');
        spy.mockResolvedValueOnce({ role: 3 });
        const handler = ServerlessHandler.handler();

        const result = (await handler(event, {})) as AwsHttpResponse;

        expect(result).not.toBeNull();
        expect(result.statusCode).toEqual(HttpStatusCode.OK);
        expect(spy).not.toBeCalled();
    });
});
