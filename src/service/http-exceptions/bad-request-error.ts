import * as HttpStatus from 'http-status-codes';
import { HttpGenericError } from './http-generic-error';

export class BadRequestError extends HttpGenericError {
    constructor(message: string, data?: any | string, stack?: string) {
        super(HttpStatus.StatusCodes.BAD_REQUEST, message, data, stack);
    }
}
