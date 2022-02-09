import { AxiosRequestConfig } from 'axios';
import { HttpService } from './generic-service';
import { RequestOptions } from './request-options';
export declare class DefaultHttpService extends HttpService {
    private static instance;
    static post(url: string, payload?: object | string, requestConfig?: AxiosRequestConfig, requestOptions?: RequestOptions): Promise<any>;
    static patch(url: string, payload?: object | string, requestConfig?: AxiosRequestConfig, requestOptions?: RequestOptions): Promise<any>;
    static delete(url: string, payload?: object | string, requestConfig?: AxiosRequestConfig, requestOptions?: RequestOptions): Promise<any>;
    static put(url: string, payload?: object | string, requestConfig?: AxiosRequestConfig, requestOptions?: RequestOptions): Promise<any>;
    static get(url: string, requestConfig?: AxiosRequestConfig, requestOptions?: RequestOptions): Promise<any>;
}
