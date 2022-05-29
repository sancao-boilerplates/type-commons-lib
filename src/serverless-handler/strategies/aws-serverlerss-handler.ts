import { LoggerConstants } from '../../constants';
import { Injectable } from '../../dependency-injector';
import { HttpResponse } from '../../request-decorator/dtos';
import { InputRequest } from '../../request-decorator/dtos/input-request';
import { HttpMethod } from '../../request-decorator/types';
import { AwsContext, AwsHttpEvent } from '../types';
import { GenericServerlessHandler } from './generic-serverless-handler';

@Injectable('aws')
export class AwsServerlessHandler extends GenericServerlessHandler<AwsHttpEvent, AwsContext> {
    protected handleHttpResponse(response: HttpResponse): unknown {
        return {
            statusCode: response.status,
            body: response.data ? JSON.stringify(response.data) : null,
        };
    }
    protected getRawRequest(event: AwsHttpEvent, context: AwsContext): InputRequest {
        return {
            method: event.httpMethod as HttpMethod,
            requestId: event.headers[LoggerConstants.CorrelationIdHeader] ?? context.awsRequestId,
            body: event.body,
            pathParams: event.pathParameters,
            queryParams: event.queryStringParameters,
            headers: event.headers,
            rawRequest: event,
        };
    }
}
