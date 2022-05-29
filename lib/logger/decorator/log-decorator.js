"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-rest-params */
const logger_1 = require("../log/logger");
const log_1 = require("../log");
function handleParameters(args, parameters) {
    for (const parameter of parameters) {
        if (typeof parameter === 'object') {
            if (parameter != null && parameter && parameter.constructor.name === 'Object') {
                args.push(parameter);
            }
        }
        else {
            args.push(parameter);
        }
    }
    return args;
}
function handlerMethodTrace(logTrace, start, err) {
    if (err) {
        logTrace.hasFailed = true;
        logTrace.errorMessage = err.message;
    }
    logTrace.duration = new Date().getTime() - start.getTime();
    logger_1.Logger.debug(`Called method: ${logTrace.method}`, logTrace);
}
function handleAsyncFunction(result, logTrace, start) {
    return new Promise((resolve, reject) => {
        result
            .then((funcResult) => {
            handlerMethodTrace(logTrace, start);
            return resolve(funcResult);
        })
            .catch((err) => {
            handlerMethodTrace(logTrace, start, err);
            return reject(err);
        });
    });
}
const log = (target, key, descriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = function () {
        const start = new Date();
        const args = handleParameters([], arguments);
        const logTrace = {
            action: log_1.LogActions.MethodTrace,
            method: `${this.constructor.name}.${String(key)}`,
            class: this.constructor.name,
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
        }
        catch (err) {
            handlerMethodTrace(logTrace, start, err);
            throw err;
        }
    };
    return descriptor;
};
exports.log = log;
