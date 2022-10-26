/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { AxiosRequestConfig } from 'axios';
import { ServiceOptions } from './service-options';
import { HttpHeaders } from './http-headers';
import { log } from 'node-smart-log';
import { RequestOptions } from './request-options';
import { HttpClient } from './http-client';

export abstract class HttpService extends HttpClient {
    protected static readonly TEN_SECONDS_TIMEOUT = 10000;

    constructor(options?: ServiceOptions) {
        super();
        options = options || {};

        this.requestConfig = {
            headers: (options && options.headers) || { [HttpHeaders.ContentType]: HttpHeaders.MediaTypes.ApplicationJson },
            baseURL: options.baseUrl,
            timeout: options.timeout || HttpService.TEN_SECONDS_TIMEOUT,
        };
    }

    @log()
    getRequestConfig(): AxiosRequestConfig {
        return this.requestConfig;
    }

    @log()
    setRequestConfig(config: AxiosRequestConfig): void {
        this.requestConfig = config;
    }

    protected async post(url: string, payload?: object | string, requestConfig?: AxiosRequestConfig, requestOptions?: RequestOptions) {
        const resp = await this.executeRequest('POST', url, payload, requestConfig, requestOptions);
        return resp;
    }

    protected async patch(url: string, payload?: object | string, requestConfig?: AxiosRequestConfig, requestOptions?: RequestOptions) {
        const resp = await this.executeRequest('PATCH', url, payload, requestConfig, requestOptions);
        return resp;
    }

    protected async delete(url: string, payload?: object | string, requestConfig?: AxiosRequestConfig, requestOptions?: RequestOptions) {
        const resp = await this.executeRequest('DELETE', url, payload, requestConfig, requestOptions);
        return resp;
    }

    protected async put(url: string, payload?: object | string, requestConfig?: AxiosRequestConfig, requestOptions?: RequestOptions) {
        const resp = await this.executeRequest('PUT', url, payload, requestConfig, requestOptions);
        return resp;
    }

    protected async get(url: string, requestConfig?: AxiosRequestConfig, requestOptions?: RequestOptions) {
        const resp = await this.executeRequest('GET', url, null, requestConfig, requestOptions);
        return resp;
    }
}
