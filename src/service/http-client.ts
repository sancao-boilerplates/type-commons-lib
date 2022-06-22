/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import axios, { AxiosRequestConfig, Method } from 'axios';
import * as StatusCode from 'http-status-codes';
import { v4 as uuid } from 'uuid';

import { HttpGenericError } from './http-exceptions';
import { LoggerContext, Logger, LogActions } from '../logger/log';
import { LoggerConstants } from '../constants';
import { RequestToCurl } from './request-to-curl';
import { HttpHeaders } from './http-headers';
import { log, LogTrace } from '../logger/decorator';
import { RequestOptions } from './request-options';

export abstract class HttpClient {
    protected requestConfig: AxiosRequestConfig;

    protected async executeRequest(method: Method, url: string, payload: any, requestConfig?: AxiosRequestConfig, requestOptions?: RequestOptions) {
        const startLog = new Date();
        let responseStatus = StatusCode.OK;
        let responsePayload: any;
        let error: any;
        let duration = 0;
        let config: AxiosRequestConfig = this.generateRequestConfig(method, url, payload, requestConfig);

        try {
            const result = await axios.request(config);
            duration = new Date().getTime() - startLog.getTime();
            config = result.config;
            Logger.debug('Request executed ', { duration, url: config.url });

            responseStatus = result.status;

            responsePayload = result.data;

            if (requestOptions && requestOptions.returnHeaders) {
                return { data: result.data, headers: result.headers };
            }

            return result.data;
        } catch (err) {
            config = err.config || config;
            Logger.error(`Error executing http request method:${method} to: ${config.baseURL}/${config.url}`, err.message);

            responseStatus = err.response && err.response.status ? err.response.status : StatusCode.INTERNAL_SERVER_ERROR;

            responsePayload = err.response && err.response.data ? err.response.data : null;

            error = err;

            throw this.handlerError(err, config, responseStatus);
        } finally {
            const integrationLog = this.reqLog(duration, responseStatus, config, responsePayload);
            Logger.info(integrationLog);
            const methodTraceLog: LogTrace = this.getLogTrace(method, startLog, payload, url, config, error);
            Logger.debug(methodTraceLog);
        }
    }

    private getLogTrace(method: string, startLog: Date, payload: any, url: string, config: AxiosRequestConfig, error: any): LogTrace {
        return {
            action: LogActions.MethodTrace,
            class: this.constructor.name,
            function: method.toLowerCase(),
            method: `${this.constructor.name}.${method.toLowerCase()}`,
            duration: this.calclDuration(startLog),
            errorMessage: error ? error.message : null,
            hasFailed: error !== null && error !== undefined,
            parameters: [method, url, payload, config],
        };
    }

    private generateRequestConfig(method: Method, url: string, payload: any, requestConfig?: AxiosRequestConfig): AxiosRequestConfig {
        requestConfig = requestConfig || this.requestConfig;
        requestConfig.headers = requestConfig.headers || { [HttpHeaders.ContentType]: HttpHeaders.MediaTypes.ApplicationJson };
        const correlationId = LoggerContext.getCorrelationId() || uuid();

        requestConfig.headers[LoggerConstants.CorrelationIdHeader] = requestConfig.headers[LoggerConstants.CorrelationIdHeader] || correlationId;

        const config = {
            ...requestConfig,
            method,
            url,
            data: !payload ?? method == 'GET' ? undefined : payload,
        };
        return config;
    }

    @log
    private reqLog(duration: number, responseStatus: number, config: AxiosRequestConfig, responsePayload?: unknown): { [key: string]: unknown } {
        return {
            action: LogActions.integration,
            method: config.method,
            duration,
            responseStatus,
            isError: String(responseStatus > 299),
            baseUrl: config.baseURL,
            path: config.url,
            uri: `${config.baseURL}/${config.url}`,
            curl: RequestToCurl.convertToCurl(config),
            headers: config.headers,
            requestPayload: this.handlePayload(config.data),
            responsePayload: this.handlePayload(responsePayload),
            config,
        };
    }

    private handlePayload(payload: any): string | null {
        try {
            if (!payload) {
                return null;
            }

            return payload;
        } catch (err) {
            Logger.warn(`Error while handling service payload: ${payload}`, err);
            return null;
        }
    }

    private handlerError(err: any, config: AxiosRequestConfig, statusCode: number): Error {
        if (err && err.response && err.response.request) {
            delete err.response.request;
        }
        const data = {
            url: `${config.url}`,
            baseUrl: `${config.baseURL}`,
            errorCode: `INT_ERR_CODE_${LoggerContext.getCorrelationId()}`,
            statusCode,
            errorMessage: err.message,
            curl: RequestToCurl.convertToCurl(config),
            originData: err.response && err.response.data ? err.response.data : null,
            response: err.response,
        };

        return new HttpGenericError(statusCode, data.errorMessage, data);
    }

    private calclDuration(startDate: Date): number {
        return new Date().getTime() - startDate.getTime();
    }
}
