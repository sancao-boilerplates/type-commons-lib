import { HttpService } from '../../../src/service';
import { AxiosRequestConfig } from 'axios';
import { ServiceOptions } from '../../../src/service/service-options';
import { RequestOptions } from '../../../src/service/request-options';

export class GenericServiceTest extends HttpService {
    protected requestConfig2: AxiosRequestConfig;
    constructor(options?: ServiceOptions) {
        super(options);
        this.requestConfig2 = {};
    }

    public async post(url: string, payload?: object | string, requestConfig?: AxiosRequestConfig, requestOptions?: RequestOptions) {
        return await super.post(url, payload, requestConfig, requestOptions);
    }

    public async patch(url: string, payload?: object | string, requestConfig?: AxiosRequestConfig, requestOptions?: RequestOptions) {
        return await super.patch(url, payload, requestConfig, requestOptions);
    }

    public async delete(url: string, payload?: object | string, requestConfig?: AxiosRequestConfig, requestOptions?: RequestOptions) {
        return await super.delete(url, payload, requestConfig, requestOptions);
    }

    public async put(url: string, payload?: object | string, requestConfig?: AxiosRequestConfig, requestOptions?: RequestOptions) {
        return await super.put(url, payload, requestConfig, requestOptions);
    }

    public async get(url: string, requestConfig?: AxiosRequestConfig, requestOptions?: RequestOptions) {
        return await super.get(url, requestConfig, requestOptions);
    }
}
