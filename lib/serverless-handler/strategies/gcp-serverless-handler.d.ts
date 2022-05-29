import { Request, Response } from 'express';
import { HttpResponse, InputRequest } from '../../request-decorator/dtos';
import { GenericServerlessHandler } from './generic-serverless-handler';
export declare class GcpServerlessHandler extends GenericServerlessHandler<unknown, unknown> {
    private resp;
    protected handleHttpResponse(response: HttpResponse): unknown;
    protected getRawRequest(event: Request, response: Response): InputRequest;
}
