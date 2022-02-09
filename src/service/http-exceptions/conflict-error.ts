import * as HttpStatus from 'http-status-codes';
import { HttpGenericError } from './http-generic-error';

export class ConflictError extends HttpGenericError {
    constructor(message: string, data?: Record<string, unknown> | string, stack?: string) {
        super(HttpStatus.CONFLICT, message, data, stack);
    }
}
