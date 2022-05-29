export interface RequestLog {
    action: string;
    requestId?: string;
    path: string;
    method: string;
    userAgent: string;
    host: string;
    headers: Map<string, unknown>;
    queryString: Map<string, unknown> | unknown;
    pathParams: Map<string, unknown>;
}
