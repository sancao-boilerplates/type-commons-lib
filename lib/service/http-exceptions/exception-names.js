"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionName = void 0;
var StatusCode = require("http-status-codes");
var ExceptionName = function (status) {
    switch (status) {
        case StatusCode.BAD_GATEWAY:
            return 'HttpBadGateway';
        case StatusCode.BAD_REQUEST:
            return 'HttpBadRequest';
        case StatusCode.CONFLICT:
            return 'HttpConflict';
        case StatusCode.EXPECTATION_FAILED:
            return 'HttpExpectationFailed';
        case StatusCode.FAILED_DEPENDENCY:
            return 'HttpFailedDependecy';
        case StatusCode.FORBIDDEN:
            return 'HttpForbidden';
        case StatusCode.GATEWAY_TIMEOUT:
            return 'HttpGatewayTimeout';
        case StatusCode.GONE:
            return 'HttpGone';
        case StatusCode.INTERNAL_SERVER_ERROR:
            return 'HttpInternalServerError';
        case StatusCode.NOT_FOUND:
            return 'HttpNotFound';
        case StatusCode.NOT_IMPLEMENTED:
            return 'HttpImplemented';
        case StatusCode.UNAUTHORIZED:
            return 'HttpUnauthorized';
        case StatusCode.REQUEST_TIMEOUT:
            return 'HttpRequestTimeout';
        case StatusCode.SERVICE_UNAVAILABLE:
            return 'HttpServiceUnavailable';
        case StatusCode.PRECONDITION_FAILED:
            return 'HttpPreConditionFailed';
        default:
            return "HttpGenericError-".concat(StatusCode.getStatusText(status).toUpperCase().replace(/\s/g, '_'));
    }
};
exports.ExceptionName = ExceptionName;
