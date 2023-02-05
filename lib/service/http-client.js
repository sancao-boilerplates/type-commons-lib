"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
const axios_1 = require("axios");
const StatusCode = require("http-status-codes");
const uuid_1 = require("uuid");
const node_http_helper_1 = require("node-http-helper");
const node_smart_log_1 = require("node-smart-log");
const constants_1 = require("../constants");
const request_to_curl_1 = require("./request-to-curl");
const http_headers_1 = require("./http-headers");
const node_smart_log_2 = require("node-smart-log");
class HttpClient {
    executeRequest(method, url, payload, requestConfig, requestOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const startLog = new Date();
            let responseStatus = StatusCode.OK;
            let responsePayload;
            let error;
            let duration = 0;
            let config = this.generateRequestConfig(method, url, payload, requestConfig);
            try {
                const result = yield axios_1.default.request(config);
                duration = new Date().getTime() - startLog.getTime();
                config = result.config;
                node_smart_log_1.Logger.debug('Request executed ', { duration, url: config.url });
                responseStatus = result.status;
                responsePayload = result.data;
                if (requestOptions && requestOptions.returnHeaders) {
                    return { data: result.data, headers: result.headers };
                }
                return result.data;
            }
            catch (err) {
                config = err.config || config;
                node_smart_log_1.Logger.error(`Error executing http request method:${method} to: ${config.baseURL}/${config.url}`, err.message);
                responseStatus = err.response && err.response.status ? err.response.status : StatusCode.INTERNAL_SERVER_ERROR;
                responsePayload = err.response && err.response.data ? err.response.data : null;
                error = err;
                throw this.handlerError(err, config, responseStatus);
            }
            finally {
                const integrationLog = this.reqLog(duration, responseStatus, config, responsePayload);
                node_smart_log_1.Logger.info(integrationLog);
                const methodTraceLog = this.getLogTrace(method, startLog, payload, url, config, error);
                node_smart_log_1.Logger.debug(methodTraceLog);
            }
        });
    }
    getLogTrace(method, startLog, payload, url, config, error) {
        return {
            action: constants_1.LogAction.MethodTrace,
            class: this.constructor.name,
            function: method.toLowerCase(),
            method: `${this.constructor.name}.${method.toLowerCase()}`,
            duration: this.calclDuration(startLog),
            errorMessage: error ? error.message : null,
            hasFailed: error !== null && error !== undefined,
            parameters: [method, url, payload, config],
        };
    }
    generateRequestConfig(method, url, payload, requestConfig) {
        var _a;
        requestConfig = requestConfig || this.requestConfig;
        requestConfig.headers = requestConfig.headers || { [http_headers_1.HttpHeaders.ContentType]: http_headers_1.HttpHeaders.MediaTypes.ApplicationJson };
        const correlationId = node_smart_log_1.LoggerContext.getCorrelationId() || (0, uuid_1.v4)();
        requestConfig.headers[constants_1.LoggerConstants.CorrelationIdHeader] = requestConfig.headers[constants_1.LoggerConstants.CorrelationIdHeader] || correlationId;
        const config = Object.assign(Object.assign({}, requestConfig), { method,
            url, data: ((_a = !payload) !== null && _a !== void 0 ? _a : method == 'GET') ? undefined : payload });
        return config;
    }
    reqLog(duration, responseStatus, config, responsePayload) {
        return {
            action: constants_1.LogAction.Integration,
            method: config.method,
            duration,
            responseStatus,
            isError: String(responseStatus > 299),
            baseUrl: config.baseURL,
            path: config.url,
            uri: `${config.baseURL}/${config.url}`,
            curl: request_to_curl_1.RequestToCurl.convertToCurl(config),
            headers: config.headers,
            requestPayload: this.handlePayload(config.data),
            responsePayload: this.handlePayload(responsePayload),
            config,
        };
    }
    handlePayload(payload) {
        try {
            if (!payload) {
                return null;
            }
            return payload;
        }
        catch (err) {
            node_smart_log_1.Logger.warn(`Error while handling service payload: ${payload}`, err);
            return null;
        }
    }
    handlerError(err, config, statusCode) {
        if (err && err.response && err.response.request) {
            delete err.response.request;
        }
        const data = {
            url: `${config.url}`,
            baseUrl: `${config.baseURL}`,
            errorCode: `INT_ERR_CODE_${node_smart_log_1.LoggerContext.getCorrelationId()}`,
            statusCode,
            errorMessage: err.message,
            curl: request_to_curl_1.RequestToCurl.convertToCurl(config),
            originData: err.response && err.response.data ? err.response.data : null,
            response: err.response,
        };
        return new node_http_helper_1.HttpGenericError(statusCode, data.errorMessage, data);
    }
    calclDuration(startDate) {
        return new Date().getTime() - startDate.getTime();
    }
}
__decorate([
    (0, node_smart_log_2.log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object, Object]),
    __metadata("design:returntype", Object)
], HttpClient.prototype, "reqLog", null);
exports.HttpClient = HttpClient;
