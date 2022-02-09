import * as HttpStatus from 'http-status-codes';
import { HttpGenericError } from './http-generic-error';

export class InternalServerError extends HttpGenericError {
    constructor(message: string, data?: Record<string, unknown> | string, stack?: string) {
        super(HttpStatus.INTERNAL_SERVER_ERROR, message, data, stack);
    }
}
