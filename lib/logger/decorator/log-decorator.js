"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-rest-params */
var logger_1 = require("../log/logger");
var log_1 = require("../log");
function handleParameters(args, parameters) {
    var e_1, _a;
    try {
        for (var parameters_1 = __values(parameters), parameters_1_1 = parameters_1.next(); !parameters_1_1.done; parameters_1_1 = parameters_1.next()) {
            var parameter = parameters_1_1.value;
            if (typeof parameter === 'object') {
                if (parameter != null && parameter && parameter.constructor.name === 'Object') {
                    args.push(parameter);
                }
            }
            else {
                args.push(parameter);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (parameters_1_1 && !parameters_1_1.done && (_a = parameters_1.return)) _a.call(parameters_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return args;
}
function handlerMethodTrace(logTrace, start, err) {
    if (err) {
        logTrace.hasFailed = true;
        logTrace.errorMessage = err.message;
    }
    logTrace.duration = new Date().getTime() - start.getTime();
    logger_1.Logger.debug("Called method: " + logTrace.method, logTrace);
}
function handleAsyncFunction(result, logTrace, start) {
    return new Promise(function (resolve, reject) {
        result
            .then(function (funcResult) {
            handlerMethodTrace(logTrace, start);
            return resolve(funcResult);
        })
            .catch(function (err) {
            handlerMethodTrace(logTrace, start, err);
            return reject(err);
        });
    });
}
var log = function (target, key, descriptor) {
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        var start = new Date();
        var args = handleParameters([], arguments);
        var logTrace = {
            action: log_1.LogActions.MethodTrace,
            method: this.constructor.name + "." + String(key),
            class: this.constructor.name,
            function: String(key),
            parameters: args,
            hasFailed: false,
        };
        try {
            var result = originalMethod.apply(this, arguments);
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
