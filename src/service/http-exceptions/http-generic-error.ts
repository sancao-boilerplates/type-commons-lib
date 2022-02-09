/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExceptionName } from './exception-names';

export class HttpGenericError extends Error {
    statusCode: number;

    status: number;

    data: unknown;

    response: unknown;

    constructor(statusCode: number, message: string, data?: { [index: string]: any } | string, stack?: string) {
        super(message);
        this.name = ExceptionName(statusCode);
        this.statusCode = statusCode;
        this.status = statusCode;
        this.message = message;
        this.response = data && typeof data === 'object' ? data.response : null;
        this.data = data;
        this.stack = stack || this.stack;
    }
}
