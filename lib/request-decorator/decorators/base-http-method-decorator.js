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
const node_http_helper_1 = require("node-http-helper");
const node_http_helper_2 = require("node-http-helper");
class BaseHttpMethodDecorator extends base_decorator_1.BaseDecorator {
    static handleError(err) {
        var _a;
        if (err == null || err.status == null) {
            return new dtos_1.HttpResponse(node_http_helper_1.HttpStatusCode.INTERNAL_SERVER_ERROR, node_http_helper_1.HttpStatusCode.parse(node_http_helper_1.HttpStatusCode.INTERNAL_SERVER_ERROR));
        }
        return new dtos_1.HttpResponse(err.status, (_a = err.message) !== null && _a !== void 0 ? _a : node_http_helper_1.HttpStatusCode.parse(err.status));
    }
    static handleSuccess(result, statusCode) {
        const status = statusCode || (result !== null && result !== undefined && result !== '' ? node_http_helper_1.HttpStatusCode.OK : node_http_helper_1.HttpStatusCode.NO_CONTENT);
        return new dtos_1.HttpResponse(status, result);
    }
    static request(target, propertyKey, propDesc, method, statusCode, self) {
        const originalFunction = propDesc.value;
        const originalTarget = target;
        const originalKey = propertyKey;
        const successHandle = (result) => BaseHttpMethodDecorator.handleSuccess(result, statusCode);
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
            throw new node_http_helper_2.HttpGenericError(node_http_helper_1.HttpStatusCode.METHOD_NOT_ALLOWED, `${found} - Method not allowed!`);
        }
    }
}
exports.BaseHttpMethodDecorator = BaseHttpMethodDecorator;
