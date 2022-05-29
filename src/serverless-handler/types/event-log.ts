export interface EventLog {
    action: string;
    operationName: string;
    requestId?: string;
    duration: number;
    isFail: boolean;
    input?: unknown;
    error?: unknown;
}
