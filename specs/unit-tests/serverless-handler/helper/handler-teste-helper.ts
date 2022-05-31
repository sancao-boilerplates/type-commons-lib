import { AwsContext, AwsHttpEvent, LoggerConstants } from '../../../../src';
import { HttpResponse, InputRequest } from '../../../../src/request-decorator/dtos';
import { HttpMethod } from '../../../../src/request-decorator/types';
import { GenericServerlessHandler } from '../../../../src/serverless-handler/strategies/generic-serverless-handler';

export class HandlerHelperTest extends GenericServerlessHandler<AwsHttpEvent, AwsContext> {
    protected handleHttpResponse(response: HttpResponse): HttpResponse {
        return response;
    }
    protected getRawRequest(event: AwsHttpEvent, context: AwsContext): InputRequest {
        return {
            requestId: event.headers[LoggerConstants.CorrelationIdHeader] ?? context.awsRequestId,
            method: event.httpMethod as HttpMethod,
            path: event.path,
            host: event.requestContext.identity.sourceIp,
            userAgent: event.requestContext.identity.userAgent,
            body: event.body,
            pathParams: event.pathParameters,
            queryParams: event.queryStringParameters,
            headers: event.headers,
            rawRequest: event,
        };
    }
}
