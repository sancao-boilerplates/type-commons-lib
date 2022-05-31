import { InputRequest } from '../../../src/request-decorator/dtos';

export abstract class InputRequestHelper {
    static inputRequest(): InputRequest {
        return {
            method: 'GET',
            requestId: '123',
            body: {
                user: 'test',
                password: 'teste',
            },
            headers: { 'x-correlation-id': '123' },
            host: 'localhost',
            rawRequest: {},
            path: '/test',
            pathParams: { id: '1' },
            queryParams: { name: 'teste' },
            userAgent: 'test',
        };
    }
}
