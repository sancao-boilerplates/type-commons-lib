import * as HttpStatusCode from 'http-status-codes';

export class ServiceTestHelper {
    static AxiosResponses = {
        Created: {
            data: { value: 'Created!' },
            status: HttpStatusCode.CREATED,
            statusText: HttpStatusCode.getStatusText(HttpStatusCode.CREATED),
            config: {},
            headers: {},
        },
        Ok: {
            data: { value: 'Ok!' },
            status: HttpStatusCode.OK,
            statusText: HttpStatusCode.getStatusText(HttpStatusCode.OK),
            config: {},
            headers: {},
        },
        NoContent: {
            status: HttpStatusCode.NO_CONTENT,
            statusText: HttpStatusCode.getStatusText(HttpStatusCode.NO_CONTENT),
            config: {},
            headers: {},
        },
        List: {
            data: [{ value: 'Ok!' }, { value: 'Ok!' }],
            status: HttpStatusCode.OK,
            statusText: HttpStatusCode.getStatusText(HttpStatusCode.OK),
            config: {},
            headers: {},
        },
        GrantCode: {
            data: {
                redirect_uri: 'http://localhost/?code=6a015fe6-da92-38f1-9d01-bd8c5007d20d',
            },
            status: HttpStatusCode.CREATED,
            statusText: HttpStatusCode.getStatusText(HttpStatusCode.OK),
            config: { baseUrl: 'sensedia.com', url: 'grantCode', method: 'post', headers: {} },
            headers: {},
        },
        AccessToken: {
            data: {
                access_token: '1e4f3191-90a0-3008-8566-730a99329398',
                refresh_token: '8e836c2d-651f-3db4-ad41-13096dffb9df',
                token_type: 'access_token',
                expires_in: 86400,
            },
            status: HttpStatusCode.CREATED,
            statusText: HttpStatusCode.getStatusText(HttpStatusCode.OK),
            config: { baseUrl: 'sensedia.com', url: 'grantCode', method: 'post', headers: {} },
            headers: {},
        },
    };

    static async delay(time = 300) {
        return new Promise<void>((resolve) => {
            setTimeout(async () => {
                resolve();
            }, time);
        });
    }
    static getAccessTokenResponse(expires: number = 100, token?: string) {
        const response = ServiceTestHelper.AxiosResponses.AccessToken;
        response.data.expires_in = expires;
        response.data.access_token = token || response.data.access_token;
        return response;
    }

    static loadEnvs() {
        process.env.SENSEDIA_URL = 'any';
        process.env.SENSEDIA_CLIENT_ID = 'any';
        process.env.SENSEDIA_SECRET_ID = 'any';
    }
    static clearEnvs() {
        delete process.env['SENSEDIA_CLIENT_ID'];
        delete process.env['SENSEDIA_SECRET_ID'];
    }

    static mockGenerateTokenCalls<T>(object: T, mockResult = true): { localTokenSPy: jest.SpyInstance; grantCodeSpy: jest.SpyInstance; postSpy: jest.SpyInstance } {
        const localTokenSPy: jest.SpyInstance = jest.spyOn(object as any, 'localToken');

        const grantCodeSpy: jest.SpyInstance = jest.spyOn(object as any, 'getGrantCode');

        const postSpy: jest.SpyInstance = jest.spyOn(object as any, 'post');
        if (mockResult) {
            localTokenSPy.mockReturnValueOnce(null);
            grantCodeSpy.mockResolvedValueOnce('code');
            postSpy.mockResolvedValueOnce(ServiceTestHelper.AxiosResponses.AccessToken.data);
        }
        return { localTokenSPy, grantCodeSpy, postSpy };
    }
}
