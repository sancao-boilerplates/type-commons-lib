import { HttpResponse, InputRequest } from '../../request-decorator/dtos';
import { GenericServerlessHandler } from './generic-serverless-handler';
export declare class GcpServerlessHandler extends GenericServerlessHandler<unknown, unknown> {
    protected handleHttpResponse(response: HttpResponse): unknown;
    protected getRawRequest(event: unknown, context: unknown): InputRequest;
}
