/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AxiosRequestConfig } from 'axios';
import { HttpService } from './generic-service';
import { RequestOptions } from './request-options';

export class DefaultHttpService extends HttpService {
    private static instance: DefaultHttpService = new DefaultHttpService();

    static async post(url: string, payload?: object | string, requestConfig?: AxiosRequestConfig, requestOptions?: RequestOptions) {
        const resp = await this.instance.post(url, payload, requestConfig, requestOptions);
        return resp;
    }

    static async patch(url: string, payload?: object | string, requestConfig?: AxiosRequestConfig, requestOptions?: RequestOptions) {
        const resp = await this.instance.patch(url, payload, requestConfig, requestOptions);
        return resp;
    }

    static async delete(url: string, payload?: object | string, requestConfig?: AxiosRequestConfig, requestOptions?: RequestOptions) {
        const resp = await this.instance.delete(url, payload, requestConfig, requestOptions);
        return resp;
    }

    static async put(url: string, payload?: object | string, requestConfig?: AxiosRequestConfig, requestOptions?: RequestOptions) {
        const resp = await this.instance.put(url, payload, requestConfig, requestOptions);
        return resp;
    }

    static async get(url: string, requestConfig?: AxiosRequestConfig, requestOptions?: RequestOptions) {
        const resp = await this.instance.get(url, requestConfig, requestOptions);
        return resp;
    }
}
