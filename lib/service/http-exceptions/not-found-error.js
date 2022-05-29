"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const HttpStatus = require("http-status-codes");
const http_generic_error_1 = require("./http-generic-error");
class NotFoundError extends http_generic_error_1.HttpGenericError {
    constructor(message, data, stack) {
        super(HttpStatus.NOT_FOUND, message, data, stack);
    }
}
exports.NotFoundError = NotFoundError;
