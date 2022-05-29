"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictError = void 0;
const HttpStatus = require("http-status-codes");
const http_generic_error_1 = require("./http-generic-error");
class ConflictError extends http_generic_error_1.HttpGenericError {
    constructor(message, data, stack) {
        super(HttpStatus.CONFLICT, message, data, stack);
    }
}
exports.ConflictError = ConflictError;
