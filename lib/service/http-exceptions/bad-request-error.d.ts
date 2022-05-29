import { HttpGenericError } from './http-generic-error';
export declare class BadRequestError extends HttpGenericError {
    constructor(message: string, data?: any | string, stack?: string);
}
