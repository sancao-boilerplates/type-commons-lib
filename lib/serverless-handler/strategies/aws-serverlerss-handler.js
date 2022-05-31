"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsServerlessHandler = void 0;
const constants_1 = require("../../constants");
const dependency_injector_1 = require("../../dependency-injector");
const generic_serverless_handler_1 = require("./generic-serverless-handler");
let AwsServerlessHandler = class AwsServerlessHandler extends generic_serverless_handler_1.GenericServerlessHandler {
    handleHttpResponse(response) {
        return {
            statusCode: response.status,
            body: response.data ? JSON.stringify(response.data) : null,
        };
    }
    getRawRequest(event, context) {
        var _a;
        return {
            requestId: (_a = event.headers[constants_1.LoggerConstants.CorrelationIdHeader]) !== null && _a !== void 0 ? _a : context.awsRequestId,
            method: event.httpMethod,
            path: event.path,
            host: event.requestContext.identity.sourceIp,
            userAgent: event.requestContext.identity.userAgent,
            body: this.getBody(event),
            pathParams: event.pathParameters,
            queryParams: event.queryStringParameters,
            headers: event.headers,
            rawRequest: event,
        };
    }
    getBody(event) {
        if (!event.body)
            return event.body;
        event.headers = event.headers || {};
        const contentType = event.headers['Content-Type'] || null;
        if ('application/json' == contentType) {
            return JSON.parse(event.body);
        }
        return event.body;
    }
};
AwsServerlessHandler = __decorate([
    (0, dependency_injector_1.Injectable)('aws')
], AwsServerlessHandler);
exports.AwsServerlessHandler = AwsServerlessHandler;
