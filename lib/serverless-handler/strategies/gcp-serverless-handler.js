"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GcpServerlessHandler = void 0;
const constants_1 = require("../../constants");
const dependency_injector_1 = require("../../dependency-injector");
const generic_serverless_handler_1 = require("./generic-serverless-handler");
const uuid_1 = require("uuid");
let GcpServerlessHandler = class GcpServerlessHandler extends generic_serverless_handler_1.GenericServerlessHandler {
    handleHttpResponse(response) {
        return this.resp.status(response.status).send(response.data);
    }
    getRawRequest(event, response) {
        var _a;
        this.resp = response;
        return {
            requestId: ((_a = event.headers[constants_1.LoggerConstants.CorrelationIdHeader]) !== null && _a !== void 0 ? _a : (0, uuid_1.v4)()),
            method: event.method,
            path: event.path,
            host: event.hostname,
            userAgent: event.get('User-Agent'),
            body: event.body,
            pathParams: event.params,
            queryParams: event.query,
            headers: event.headers,
            rawRequest: event,
        };
    }
};
GcpServerlessHandler = __decorate([
    (0, dependency_injector_1.Injectable)('gcp')
], GcpServerlessHandler);
exports.GcpServerlessHandler = GcpServerlessHandler;
