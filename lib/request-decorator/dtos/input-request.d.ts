import { HttpMethod } from '../types';
export interface InputRequest {
    requestId: string;
    method: HttpMethod;
    rawRequest: unknown;
    queryParams?: unknown;
    pathParams?: unknown;
    headers?: unknown;
    body?: string | Map<string, unknown> | unknown;
    host?: string;
    path?: string;
    userAgent?: string;
}
