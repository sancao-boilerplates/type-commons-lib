"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponse = void 0;
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
class HttpResponse {
    constructor(status, data, error) {
        this.status = status;
        this.data = data;
        this.error = error;
    }
}
exports.HttpResponse = HttpResponse;
