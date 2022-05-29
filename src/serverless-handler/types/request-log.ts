export interface RequestLog {
    action: string;
    requestId?: string;
    path: string;
    method: string;
    userAgent: string;
    host: string;
    headers: unknown;
    queryString: unknown;
    pathParams: unknown;
}
