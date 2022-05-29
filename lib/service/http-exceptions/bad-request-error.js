"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const HttpStatus = require("http-status-codes");
const http_generic_error_1 = require("./http-generic-error");
class BadRequestError extends http_generic_error_1.HttpGenericError {
    constructor(message, data, stack) {
        super(HttpStatus.StatusCodes.BAD_REQUEST, message, data, stack);
    }
}
exports.BadRequestError = BadRequestError;
