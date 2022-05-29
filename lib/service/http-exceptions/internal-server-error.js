"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = void 0;
const HttpStatus = require("http-status-codes");
const http_generic_error_1 = require("./http-generic-error");
class InternalServerError extends http_generic_error_1.HttpGenericError {
    constructor(message, data, stack) {
        super(HttpStatus.INTERNAL_SERVER_ERROR, message, data, stack);
    }
}
exports.InternalServerError = InternalServerError;
