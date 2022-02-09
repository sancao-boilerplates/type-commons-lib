import * as HttpStatus from 'http-status-codes';
import { HttpGenericError } from './http-generic-error';

export class NotFoundError extends HttpGenericError {
    constructor(message: string, data?: Record<string, unknown> | string, stack?: string) {
        super(HttpStatus.NOT_FOUND, message, data, stack);
    }
}
