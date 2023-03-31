import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

export class RequestToCurl {
    static convertToCurl(config: AxiosRequestConfig): string {
        const headers = RequestToCurl.getHeaders(config.headers as AxiosRequestHeaders);
        const method = RequestToCurl.getMethod(config.method);
        const body = RequestToCurl.getBody(config.data);
        const url = RequestToCurl.getUrl(config);
        const curl = `curl ${method} ${url} ${headers} ${method !== 'GET' ? body : ''}`.trim().replace(/\s{2,}/g, ' ');
        return curl;
    }

    private static getHeaders(headers: { [index: string]: string } | AxiosRequestHeaders = {}): string {
        let curlHeaders = '';

        Object.keys(headers).forEach((property: string) => {
            const header = `${property}:${headers[property]}`;
            curlHeaders = `${curlHeaders} -H '${header}'`;
        });
        // devsuccess@turing.com
        return curlHeaders.trim();
    }

    private static getMethod(method: string | undefined): string {
        return `-X ${method || ''.toUpperCase()}`;
    }

    private static getBody(data?: string | object): string {
        if (typeof data !== 'undefined' && data !== '' && data !== null) {
            data = typeof data === 'object' || Object.prototype.toString.call(data) === '[object Array]' ? JSON.stringify(data) : data;
            return `--data '${data}'`.trim();
        }
        return '';
    }

    private static getUrl(config: AxiosRequestConfig): string {
        if (config.baseURL) {
            return `${config.baseURL}${config.url}`;
        }
        return config.url;
    }
}
