import { AwsContext, AwsHttpEvent } from '../../../src';
import { GcpEvent } from 'node-http-serverless';

export abstract class RequestMockedHelper {
    static AwsContext: AwsContext = {
        awsRequestId: '123456',
        callbackWaitsForEmptyEventLoop: false,
        clientContext: null,
    };
    static generateAwsRequest() {
        return {
            body: null,
            headers: {},
            httpMethod: 'GET',
            path: '/tests',
            isBase64Encoded: false,
            multiValueHeaders: null,
            multiValueQueryStringParameters: null,
            pathParameters: null,
            queryStringParameters: null,
            requestContext: {
                accountId: '123456',
                apiId: '12345',
                authorizer: null,
                domainName: 'localhost',
                domainPrefix: null,
                extendedRequestId: '12345',
                httpMethod: 'GET',
                identity: {
                    accessKey: null,
                    accountId: '123456',
                    apiKey: null,
                    apiKeyId: null,
                    caller: null,
                    cognitoAuthenticationProvider: null,
                    cognitoAuthenticationType: null,
                    cognitoIdentityId: null,
                    cognitoIdentityPoolId: null,
                    principalOrgId: null,
                    sourceIp: '127.0.0.1',
                    user: null,
                    userAgent: 'test',
                    userArn: null,
                },
                operationName: null,
                path: '/test',
                protocol: 'http',
                requestId: '1234567890',
                requestTime: null,
                requestTimeEpoch: null,
                resourceId: null,
                resourcePath: null,
                stage: 'test',
            },
        };
    }
}
