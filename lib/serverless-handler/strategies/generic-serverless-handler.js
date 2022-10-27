"use strict";
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
exports.GenericServerlessHandler = void 0;
const dependency_injector_1 = require("../../dependency-injector");
const node_smart_log_1 = require("node-smart-log");
const dtos_1 = require("../../request-decorator/dtos");
const node_http_helper_1 = require("node-http-helper");
const uuid_1 = require("uuid");
const log_utils_1 = require("../log-utils");
class GenericServerlessHandler {
    logRequest(rawRequest) {
        var _a;
        node_smart_log_1.LoggerContext.setCorrelationId((_a = rawRequest.requestId) !== null && _a !== void 0 ? _a : (0, uuid_1.v4)());
        const log = {
            action: 'request',
            host: rawRequest.host,
            headers: rawRequest.headers,
            method: rawRequest.method,
            path: rawRequest.path,
            pathParams: rawRequest.pathParams,
            queryString: rawRequest.queryParams,
            userAgent: rawRequest.userAgent,
            requestId: rawRequest.requestId,
        };
        log_utils_1.LogUtils.doLog(log);
    }
    logResponse(rawRequest, response, start) {
        const log = {
            action: 'response',
            statusCode: response.status,
            duration: `${new Date().getTime() - start.getTime()}ms`,
            method: rawRequest.method,
            path: rawRequest.path,
            userAgent: rawRequest.userAgent,
            host: rawRequest.host,
            headers: rawRequest.headers,
            pathParams: rawRequest.pathParams,
            queryString: rawRequest.queryParams,
            requestId: rawRequest.requestId,
        };
        log_utils_1.LogUtils.doLog(log);
    }
    defaultHandlerError(err) {
        if (err instanceof node_http_helper_1.HttpGenericError) {
            return new dtos_1.HttpResponse(err.statusCode, { message: err.message, error: err.data });
        }
        if (err instanceof dtos_1.HttpResponse) {
            return err;
        }
        return new dtos_1.HttpResponse(node_http_helper_1.HttpStatusCode.INTERNAL_SERVER_ERROR, node_http_helper_1.HttpStatusCode.parse(node_http_helper_1.HttpStatusCode.INTERNAL_SERVER_ERROR), err);
    }
    defaultHandleSuccessResponse(response, rawRequest, start) {
        let httpResponse;
        if (response instanceof dtos_1.HttpResponse) {
            httpResponse = response;
        }
        else if (response) {
            httpResponse = new dtos_1.HttpResponse(node_http_helper_1.HttpStatusCode.OK, response);
        }
        else {
            httpResponse = new dtos_1.HttpResponse(node_http_helper_1.HttpStatusCode.NO_CONTENT);
        }
        this.logResponse(rawRequest, httpResponse, start);
        return this.handleHttpResponse(httpResponse);
    }
    applyCall(type, method, p0, p1, start, dbConnection) {
        return __awaiter(this, void 0, void 0, function* () {
            const inputRequest = this.getRawRequest(p0, p1);
            try {
                this.logRequest(inputRequest);
                yield this.conectDb(dbConnection);
                const controller = dependency_injector_1.Injector.get(type);
                const response = yield controller[method](inputRequest);
                return this.defaultHandleSuccessResponse(response, inputRequest, start);
            }
            catch (err) {
                node_smart_log_1.Logger.error(err);
                const httpResponse = this.defaultHandlerError(err);
                this.logResponse(inputRequest, httpResponse, start);
                return this.handleHttpResponse(httpResponse);
            }
        });
    }
    conectDb(connect) {
        return __awaiter(this, void 0, void 0, function* () {
            if (connect) {
                yield connect();
            }
        });
    }
}
exports.GenericServerlessHandler = GenericServerlessHandler;
