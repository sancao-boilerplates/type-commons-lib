import { AwsHttpResponse, HttpStatusCode, Injector, ServerlessHandler } from '../../../src';
import { BaseDecorator } from '../../../src/request-decorator/decorators/base-decorator';
import { ControllerHelper } from '../../../src/request-decorator/controller-helper';
import { RequestMockedHelper } from '../serverless-handler/helper/request-mocked-helper';

describe('[Param]', () => {
    let injectoMock;
    let controllerSpy;
    let req;
    let token = 'est4535token';
    beforeEach(() => {
        injectoMock = jest.spyOn(Injector, 'get');
        injectoMock.mockImplementationOnce(() => new ControllerHelper());
        controllerSpy = jest.fn().mockResolvedValue('123');
        req = RequestMockedHelper.GetRequest;
        req.pathParameters = { token };
        BaseDecorator['applyOriginal'] = controllerSpy;
    });
    it('Should inject only the name of parameter provided', async () => {
        const handler = ServerlessHandler.handler(ControllerHelper, 'testParam');
        const resp = (await handler(req, RequestMockedHelper.AwsContext)) as AwsHttpResponse;
        expect(controllerSpy.mock.calls[0][2][0]).toEqual(req.pathParameters['token']);
        expect(resp.statusCode).toEqual(HttpStatusCode.OK);
    });
    it('Should inject and validate only the name of parameter provided', async () => {
        req.pathParameters = { token, test: 'shouldNotValidate' };
        const handler = ServerlessHandler.handler(ControllerHelper, 'testParamValidateSchema1');
        const resp = (await handler(req, RequestMockedHelper.AwsContext)) as AwsHttpResponse;
        expect(controllerSpy.mock.calls[0][2][0]).toEqual(req.pathParameters['token']);
        expect(resp.statusCode).toEqual(HttpStatusCode.OK);
    });

    it('Should inject all headers and validate', async () => {
        req.pathParameters = { token };
        const handler = ServerlessHandler.handler(ControllerHelper, 'testParamAllParams');
        const resp = (await handler(req, RequestMockedHelper.AwsContext)) as AwsHttpResponse;
        expect(controllerSpy.mock.calls[0][2][0]).toMatchObject(req.pathParameters);
        expect(resp.statusCode).toEqual(HttpStatusCode.OK);
    });
    it('Should inject all headers and validate', async () => {
        req.pathParameters = { token: 1234 };
        const handler = ServerlessHandler.handler(ControllerHelper, 'testParamAllParams');
        const resp = (await handler(req, RequestMockedHelper.AwsContext)) as AwsHttpResponse;
        expect(resp.statusCode).toEqual(HttpStatusCode.BAD_REQUEST);
    });

    it('Should inject all headers, validate and allow aditional keys', async () => {
        req.pathParameters = { token, test: 'shouldNotValidate' };
        const handler = ServerlessHandler.handler(ControllerHelper, 'testParamAllowAitional');
        const resp = (await handler(req, RequestMockedHelper.AwsContext)) as AwsHttpResponse;
        expect(resp.statusCode).toEqual(HttpStatusCode.OK);
    });
});
