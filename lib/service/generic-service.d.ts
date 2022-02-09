import { AxiosRequestConfig } from 'axios';
import { ServiceOptions } from './service-options';
import { RequestOptions } from './request-options';
import { HttpClient } from './http-client';
export declare abstract class HttpService extends HttpClient {
    protected static readonly TEN_SECONDS_TIMEOUT = 10000;
    constructor(options?: ServiceOptions);
    getRequestConfig(): AxiosRequestConfig;
    setRequestConfig(config: AxiosRequestConfig): void;
    protected post(url: string, payload?: object | string, requestConfig?: AxiosRequestConfig, requestOptions?: RequestOptions): Promise<any>;
    protected patch(url: string, payload?: object | string, requestConfig?: AxiosRequestConfig, requestOptions?: RequestOptions): Promise<any>;
    protected delete(url: string, payload?: object | string, requestConfig?: AxiosRequestConfig, requestOptions?: RequestOptions): Promise<any>;
    protected put(url: string, payload?: object | string, requestConfig?: AxiosRequestConfig, requestOptions?: RequestOptions): Promise<any>;
    protected get(url: string, requestConfig?: AxiosRequestConfig, requestOptions?: RequestOptions): Promise<any>;
}
