export interface AwsHttpEventRequestIdentity {
    accessKey: string;
    accountId: string;
    apiKey: string;
    apiKeyId: string;
    caller: string;
    cognitoAuthenticationProvider: string;
    cognitoAuthenticationType: string;
    cognitoIdentityId: string;
    cognitoIdentityPoolId: string;
    principalOrgId: string;
    sourceIp: string;
    user: string;
    userAgent: string;
    userArn: string;
}
export interface AwsHttpEventRequestContext {
    accountId: string;
    apiId: string;
    authorizer: Map<string, unknown>;
    domainName: string;
    domainPrefix: string;
    extendedRequestId: string;
    httpMethod: string;
    identity: AwsHttpEventRequestIdentity;
    operationName: string;
    path: string;
    protocol: string;
    requestId: string;
    requestTime: string;
    requestTimeEpoch: number;
    resourceId: string;
    resourcePath: string;
    stage: string;
}
export interface AwsHttpEvent {
    body: null;
    headers: Map<string, unknown>;
    httpMethod: string;
    isBase64Encoded: boolean;
    multiValueHeaders: Map<string, unknown>;
    multiValueQueryStringParameters: Map<string, unknown>;
    path: string;
    pathParameters: Map<string, unknown>;
    queryStringParameters: Map<string, unknown>;
    requestContext: AwsHttpEventRequestContext;
    resource: string;
    stageVariables: string;
}
