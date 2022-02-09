import * as HttpStatus from 'http-status-codes';
import { HttpGenericError } from './http-generic-error';

export class PreConditionError extends HttpGenericError {
    constructor(message: string, data?: Record<string, unknown> | string | Array<unknown>, stack?: string) {
        super(HttpStatus.PRECONDITION_FAILED, message, data, stack);
    }
}
