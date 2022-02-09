export interface LogTrace {
    action: string;
    method: string;
    class: string;
    function: string;
    parameters?: any;
    hasFailed?: boolean;
    duration?: number;
    errorMessage?: unknown;
}
declare const log: (target: any, key: PropertyKey, descriptor: PropertyDescriptor) => PropertyDescriptor;
export { log };
