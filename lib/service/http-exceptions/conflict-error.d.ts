import { HttpGenericError } from './http-generic-error';
export declare class ConflictError extends HttpGenericError {
    constructor(message: string, data?: Record<string, unknown> | string, stack?: string);
}
