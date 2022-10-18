import { ObjectType } from '../../dependency-injector';
import { HttpResponse } from '../../request-decorator/dtos';
import { InputRequest } from '../../request-decorator/dtos/input-request';
export declare abstract class GenericServerlessHandler<E, C> {
    protected abstract handleHttpResponse(response: HttpResponse): unknown;
    protected abstract getRawRequest(event: E, context: C): InputRequest;
    protected logRequest(rawRequest: InputRequest): void;
    protected logResponse(rawRequest: InputRequest, response: HttpResponse, start: Date): void;
    private defaultHandlerError;
    private defaultHandleSuccessResponse;
    applyCall<T>(type: ObjectType<T>, method: string, p0: E, p1: C, start: Date, dbConnection?: Function): Promise<unknown>;
    private conectDb;
}
