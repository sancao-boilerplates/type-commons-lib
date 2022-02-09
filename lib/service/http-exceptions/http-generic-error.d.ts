export declare class HttpGenericError extends Error {
    statusCode: number;
    status: number;
    data: unknown;
    response: unknown;
    constructor(statusCode: number, message: string, data?: {
        [index: string]: any;
    } | string, stack?: string);
}
