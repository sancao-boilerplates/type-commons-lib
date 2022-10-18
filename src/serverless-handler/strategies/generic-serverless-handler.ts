import { Injector, ObjectType } from '../../dependency-injector';

import { Logger, LoggerContext } from '../../logger';
import { HttpResponse } from '../../request-decorator/dtos';
import { InputRequest } from '../../request-decorator/dtos/input-request';
import { HttpGenericError } from '../../service/http-exceptions';
import { HttpStatusCode } from '../../status-code';
import { v4 as uuid } from 'uuid';
import { RequestLog, ResponseLog } from '../types';
import { LogUtils } from '../log-utils';

export abstract class GenericServerlessHandler<E, C> {
    protected abstract handleHttpResponse(response: HttpResponse): unknown;

    protected abstract getRawRequest(event: E, context: C): InputRequest;

    protected logRequest(rawRequest: InputRequest): void {
        LoggerContext.setCorrelationId(rawRequest.requestId ?? uuid());
        const log: RequestLog = {
            action: 'request',
            host: rawRequest.host,
            headers: rawRequest.headers,
            method: rawRequest.method,
            path: rawRequest.path,
            pathParams: rawRequest.pathParams,
            queryString: rawRequest.queryParams,
            userAgent: rawRequest.userAgent,
            requestId: rawRequest.requestId,
        };
        LogUtils.doLog(log);
    }
    protected logResponse(rawRequest: InputRequest, response: HttpResponse, start: Date): void {
        const log: ResponseLog = {
            action: 'response',
            statusCode: response.status,
            duration: `${new Date().getTime() - start.getTime()}ms`,
            method: rawRequest.method,
            path: rawRequest.path,
            userAgent: rawRequest.userAgent,
            host: rawRequest.host,
            headers: rawRequest.headers,
            pathParams: rawRequest.pathParams,
            queryString: rawRequest.queryParams,
            requestId: rawRequest.requestId,
        };
        LogUtils.doLog(log);
    }

    private defaultHandlerError(err: unknown): HttpResponse {
        if (err instanceof HttpGenericError) {
            return new HttpResponse(err.statusCode, { message: err.message, error: err.data });
        }
        if (err instanceof HttpResponse) {
            return err;
        }
        return new HttpResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, HttpStatusCode.getStatusText(HttpStatusCode.INTERNAL_SERVER_ERROR), err);
    }

    private defaultHandleSuccessResponse(response: unknown, rawRequest: InputRequest, start: Date): unknown {
        let httpResponse: HttpResponse;

        if (response instanceof HttpResponse) {
            httpResponse = response;
        } else if (response) {
            httpResponse = new HttpResponse(HttpStatusCode.OK, response);
        } else {
            httpResponse = new HttpResponse(HttpStatusCode.NO_CONTENT);
        }

        this.logResponse(rawRequest, httpResponse, start);

        return this.handleHttpResponse(httpResponse);
    }

    public async applyCall<T>(type: ObjectType<T>, method: string, p0: E, p1: C, start: Date, dbConnection?: Function): Promise<unknown> {
        const inputRequest: InputRequest = this.getRawRequest(p0, p1);
        try {
            this.logRequest(inputRequest);
            await this.conectDb(dbConnection);
            const controller = Injector.get(type);
            const response = await controller[method](inputRequest);
            return this.defaultHandleSuccessResponse(response, inputRequest, start);
        } catch (err) {
            Logger.error(err);
            const httpResponse = this.defaultHandlerError(err);
            this.logResponse(inputRequest, httpResponse, start);
            return this.handleHttpResponse(httpResponse);
        }
    }

    private async conectDb(connect: Function): Promise<void> {
        if (connect) {
            await connect();
        }
    }
}
