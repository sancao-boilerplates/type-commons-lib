/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-rest-params */
import { Logger } from '../log/logger';
import { LogActions } from '../log';

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

function handleParameters(args: any, parameters: any): any {
    for (const parameter of parameters) {
        if (typeof parameter === 'object') {
            if (parameter != null && parameter && parameter.constructor.name === 'Object') {
                args.push(parameter);
            }
        } else {
            args.push(parameter);
        }
    }
    return args;
}

function handlerMethodTrace(logTrace: LogTrace, start: Date, err?: Error): void {
    if (err) {
        logTrace.hasFailed = true;
        logTrace.errorMessage = err.message;
    }
    logTrace.duration = new Date().getTime() - start.getTime();
    Logger.debug(`Called method: ${logTrace.method}`, logTrace);
}

function handleAsyncFunction(result: any, logTrace: LogTrace, start: Date): Promise<unknown> {
    return new Promise((resolve, reject) => {
        result
            .then((funcResult: any) => {
                handlerMethodTrace(logTrace, start);
                return resolve(funcResult);
            })
            .catch((err: Error | undefined) => {
                handlerMethodTrace(logTrace, start, err);
                return reject(err);
            });
    });
}
const log = (target: any, key: PropertyKey, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = function () {
        const start = new Date();
        const args = handleParameters([], arguments);
        const constructorName = this && this.constructor ? this.constructor.name : 'unknown';
        const logTrace: LogTrace = {
            action: LogActions.MethodTrace,
            method: `${constructorName}.${String(key)}`,
            class: constructorName,
            function: String(key),
            parameters: args,
            hasFailed: false,
        };
        try {
            const result = originalMethod.apply(this, arguments);
            if (result instanceof Promise) {
                return handleAsyncFunction(result, logTrace, start);
            }
            handlerMethodTrace(logTrace, start);
            return result;
        } catch (err) {
            handlerMethodTrace(logTrace, start, err);
            throw err;
        }
    };
    return descriptor;
};

export { log };
