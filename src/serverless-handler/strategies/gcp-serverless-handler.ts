import { Injectable } from '../../dependency-injector';
import { HttpResponse, InputRequest } from '../../request-decorator/dtos';
import { GenericServerlessHandler } from './generic-serverless-handler';

@Injectable('gcp')
export class GcpServerlessHandler extends GenericServerlessHandler<unknown, unknown> {
    protected handleHttpResponse(response: HttpResponse): unknown {
        return null;
    }

    protected getRawRequest(event: unknown, context: unknown): InputRequest {
        return null;
    }
}
