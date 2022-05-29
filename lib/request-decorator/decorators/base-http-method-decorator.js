"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-rest-params */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseHttpMethodDecorator = void 0;
const dtos_1 = require("../dtos");
const request_validator_1 = require("../request-decorator-helper/request-validator");
const base_decorator_1 = require("./base-decorator");
const status_code_1 = require("../../status-code");
const service_1 = require("../../service");
class BaseHttpMethodDecorator extends base_decorator_1.BaseDecorator {
    static handleError(err) {
        var _a;
        if (err == null || err.status == null) {
            return new dtos_1.HttpResponse(status_code_1.HttpStatusCode.INTERNAL_SERVER_ERROR, status_code_1.HttpStatusCode.getStatusText(status_code_1.HttpStatusCode.INTERNAL_SERVER_ERROR));
        }
        return new dtos_1.HttpResponse(err.status, (_a = err.message) !== null && _a !== void 0 ? _a : status_code_1.HttpStatusCode.getStatusText(err.status));
    }
    static handleSuccess(result, options) {
        const status = (options === null || options === void 0 ? void 0 : options.statusCode) || (result !== null && result !== undefined && result !== '' ? status_code_1.HttpStatusCode.OK : status_code_1.HttpStatusCode.NO_CONTENT);
        return new dtos_1.HttpResponse(status, result);
    }
    static request(target, propertyKey, propDesc, method, options, self) {
        const originalFunction = propDesc.value;
        const originalTarget = target;
        const originalKey = propertyKey;
        const successHandle = (result) => BaseHttpMethodDecorator.handleSuccess(result, options);
        const errorHandle = (err) => BaseHttpMethodDecorator.handleError(err);
        propDesc.value = function (rawRequest) {
            BaseHttpMethodDecorator.validateMethod(method, rawRequest.method);
            const key = BaseHttpMethodDecorator.generateKey(originalTarget, originalKey);
            const args = request_validator_1.RequestValidator.validate(key, rawRequest);
            return BaseHttpMethodDecorator.applyOriginal(this, originalFunction, args, successHandle, errorHandle);
        };
        return propDesc;
    }
    static validateMethod(expected, found) {
        if (expected !== found) {
            throw new service_1.HttpGenericError(status_code_1.HttpStatusCode.METHOD_NOT_ALLOWED, `${expected} - Method not allowed!`);
        }
    }
}
exports.BaseHttpMethodDecorator = BaseHttpMethodDecorator;
