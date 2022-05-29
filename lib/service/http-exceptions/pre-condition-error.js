"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreConditionError = void 0;
const HttpStatus = require("http-status-codes");
const http_generic_error_1 = require("./http-generic-error");
class PreConditionError extends http_generic_error_1.HttpGenericError {
    constructor(message, data, stack) {
        super(HttpStatus.PRECONDITION_FAILED, message, data, stack);
    }
}
exports.PreConditionError = PreConditionError;
