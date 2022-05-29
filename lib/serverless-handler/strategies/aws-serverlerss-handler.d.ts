import { HttpResponse } from '../../request-decorator/dtos';
import { InputRequest } from '../../request-decorator/dtos/input-request';
import { AwsContext, AwsHttpEvent } from '../types';
import { GenericServerlessHandler } from './generic-serverless-handler';
export declare class AwsServerlessHandler extends GenericServerlessHandler<AwsHttpEvent, AwsContext> {
    protected handleHttpResponse(response: HttpResponse): unknown;
    protected getRawRequest(event: AwsHttpEvent, context: AwsContext): InputRequest;
}
