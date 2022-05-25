"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
var axios_1 = require("axios");
var StatusCode = require("http-status-codes");
var uuid_1 = require("uuid");
var http_exceptions_1 = require("./http-exceptions");
var log_1 = require("../logger/log");
var constants_1 = require("../constants");
var request_to_curl_1 = require("./request-to-curl");
var http_headers_1 = require("./http-headers");
var decorator_1 = require("../logger/decorator");
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.prototype.executeRequest = function (method, url, payload, requestConfig, requestOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var startLog, responseStatus, responsePayload, error, duration, config, result, err_1, integrationLog, methodTraceLog;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        startLog = new Date();
                        responseStatus = StatusCode.OK;
                        duration = 0;
                        config = this.generateRequestConfig(method, url, payload, requestConfig);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, axios_1.default.request(config)];
                    case 2:
                        result = _a.sent();
                        duration = new Date().getTime() - startLog.getTime();
                        config = result.config;
                        log_1.Logger.debug('Request executed ', { duration: duration, url: config.url });
                        responseStatus = result.status;
                        responsePayload = result.data;
                        if (requestOptions && requestOptions.returnHeaders) {
                            return [2 /*return*/, { data: result.data, headers: result.headers }];
                        }
                        return [2 /*return*/, result.data];
                    case 3:
                        err_1 = _a.sent();
                        config = err_1.config || config;
                        log_1.Logger.error("Error executing http request method:".concat(method, " to: ").concat(config.baseURL, "/").concat(config.url), err_1.message);
                        responseStatus = err_1.response && err_1.response.status ? err_1.response.status : StatusCode.INTERNAL_SERVER_ERROR;
                        responsePayload = err_1.response && err_1.response.data ? err_1.response.data : null;
                        error = err_1;
                        throw this.handlerError(err_1, config, responseStatus);
                    case 4:
                        integrationLog = this.reqLog(duration, responseStatus, config, responsePayload);
                        log_1.Logger.info(integrationLog);
                        methodTraceLog = this.getLogTrace(method, startLog, payload, url, config, error);
                        log_1.Logger.debug(methodTraceLog);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    HttpClient.prototype.getLogTrace = function (method, startLog, payload, url, config, error) {
        return {
            action: log_1.LogActions.MethodTrace,
            class: this.constructor.name,
            function: method.toLowerCase(),
            method: "".concat(this.constructor.name, ".").concat(method.toLowerCase()),
            duration: this.calclDuration(startLog),
            errorMessage: error ? error.message : null,
            hasFailed: error !== null && error !== undefined,
            parameters: [method, url, payload, config],
        };
    };
    HttpClient.prototype.generateRequestConfig = function (method, url, payload, requestConfig) {
        var _a;
        requestConfig = requestConfig || this.requestConfig;
        requestConfig.headers = requestConfig.headers || (_a = {}, _a[http_headers_1.HttpHeaders.ContentType] = http_headers_1.HttpHeaders.MediaTypes.ApplicationJson, _a);
        var correlationId = log_1.LoggerContext.getCorrelationId() || (0, uuid_1.v4)();
        requestConfig.headers[constants_1.LoggerConstants.CorrelationIdHeader] = requestConfig.headers[constants_1.LoggerConstants.CorrelationIdHeader] || correlationId;
        var config = __assign(__assign({}, requestConfig), { method: method, url: url, data: payload });
        return config;
    };
    HttpClient.prototype.reqLog = function (duration, responseStatus, config, responsePayload) {
        return {
            action: log_1.LogActions.integration,
            method: config.method,
            duration: duration,
            responseStatus: responseStatus,
            isError: String(responseStatus > 299),
            baseUrl: config.baseURL,
            path: config.url,
            uri: "".concat(config.baseURL, "/").concat(config.url),
            curl: request_to_curl_1.RequestToCurl.convertToCurl(config),
            headers: config.headers,
            requestPayload: this.handlePayload(config.data),
            responsePayload: this.handlePayload(responsePayload),
            config: config,
        };
    };
    HttpClient.prototype.handlePayload = function (payload) {
        try {
            if (!payload) {
                return null;
            }
            return payload;
        }
        catch (err) {
            log_1.Logger.warn("Error while handling service payload: ".concat(payload), err);
            return null;
        }
    };
    HttpClient.prototype.handlerError = function (err, config, statusCode) {
        if (err && err.response && err.response.request) {
            delete err.response.request;
        }
        var data = {
            url: "".concat(config.url),
            baseUrl: "".concat(config.baseURL),
            errorCode: "INT_ERR_CODE_".concat(log_1.LoggerContext.getCorrelationId()),
            statusCode: statusCode,
            errorMessage: err.message,
            curl: request_to_curl_1.RequestToCurl.convertToCurl(config),
            originData: err.response && err.response.data ? err.response.data : null,
            response: err.response,
        };
        return new http_exceptions_1.HttpGenericError(statusCode, data.errorMessage, data);
    };
    HttpClient.prototype.calclDuration = function (startDate) {
        return new Date().getTime() - startDate.getTime();
    };
    __decorate([
        decorator_1.log,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Number, Object, Object]),
        __metadata("design:returntype", Object)
    ], HttpClient.prototype, "reqLog", null);
    return HttpClient;
}());
exports.HttpClient = HttpClient;
