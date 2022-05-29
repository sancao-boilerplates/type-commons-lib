import { HttpMethod } from '../types';
export interface InputRequest {
    requestId: string;
    method: HttpMethod;
    rawRequest: unknown;
    queryParams?: Map<string, unknown> | unknown;
    pathParams?: Map<string, unknown>;
    headers?: Map<string, unknown>;
    body?: string | Map<string, unknown> | unknown;
    host?: string;
    path?: string;
    userAgent?: string;
}
