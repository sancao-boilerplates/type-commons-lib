"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpGenericError = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const exception_names_1 = require("./exception-names");
class HttpGenericError extends Error {
    constructor(statusCode, message, data, stack) {
        super(message);
        this.name = (0, exception_names_1.ExceptionName)(statusCode);
        this.statusCode = statusCode;
        this.status = statusCode;
        this.message = message;
        this.response = data && typeof data === 'object' ? data.response : null;
        this.data = data;
        this.stack = stack || this.stack;
    }
}
exports.HttpGenericError = HttpGenericError;
