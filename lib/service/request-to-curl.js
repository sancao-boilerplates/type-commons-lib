"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestToCurl = void 0;
class RequestToCurl {
    static convertToCurl(config) {
        const headers = RequestToCurl.getHeaders(config.headers);
        const method = RequestToCurl.getMethod(config.method);
        const body = RequestToCurl.getBody(config.data);
        const url = RequestToCurl.getUrl(config);
        const curl = `curl ${method} ${url} ${headers} ${method !== 'GET' ? body : ''}`.trim().replace(/\s{2,}/g, ' ');
        return curl;
    }
    static getHeaders(headers = {}) {
        let curlHeaders = '';
        Object.keys(headers).forEach((property) => {
            const header = `${property}:${headers[property]}`;
            curlHeaders = `${curlHeaders} -H '${header}'`;
        });
        //devsuccess@turing.com
        return curlHeaders.trim();
    }
    static getMethod(method) {
        return `-X ${method || ''.toUpperCase()}`;
    }
    static getBody(data) {
        if (typeof data !== 'undefined' && data !== '' && data !== null) {
            data = typeof data === 'object' || Object.prototype.toString.call(data) === '[object Array]' ? JSON.stringify(data) : data;
            return `--data '${data}'`.trim();
        }
        return '';
    }
    static getUrl(config) {
        if (config.baseURL) {
            return `${config.baseURL}/${config.url}`;
        }
        return config.url;
    }
}
exports.RequestToCurl = RequestToCurl;
