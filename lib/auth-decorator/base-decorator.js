"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDecorator = void 0;
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
class BaseDecorator {
    static defaultHandleError(err) {
        throw err;
    }
    static defaultHandleSuccess(result) {
        return result;
    }
    static applyOriginal(source, originalFunction, args, successHandle, errorHandle) {
        try {
            const result = originalFunction.apply(source, args);
            if (result instanceof Promise) {
                return BaseDecorator.handleAsyncFunction(result, successHandle, errorHandle);
            }
            return successHandle ? successHandle(result) : BaseDecorator.defaultHandleSuccess(result);
        }
        catch (err) {
            return errorHandle ? errorHandle(err) : BaseDecorator.defaultHandleError(err);
        }
    }
    static handleAsyncFunction(result, successHandle, errorHandle) {
        return new Promise((resolve) => {
            result
                .then((funcResult) => {
                const resp = successHandle ? successHandle(funcResult) : BaseDecorator.defaultHandleSuccess(funcResult);
                resolve(resp);
            })
                .catch((err) => {
                resolve(errorHandle ? errorHandle(err) : BaseDecorator.defaultHandleError(err));
            });
        });
    }
    static generateKey(target, propertyKey) {
        var _a, _b;
        return `${(_b = (_a = target === null || target === void 0 ? void 0 : target.constructor) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : 'default'}.${propertyKey}`;
    }
}
exports.BaseDecorator = BaseDecorator;
