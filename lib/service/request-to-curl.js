"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestToCurl = void 0;
var RequestToCurl = /** @class */ (function () {
    function RequestToCurl() {
    }
    RequestToCurl.convertToCurl = function (config) {
        var headers = RequestToCurl.getHeaders(config.headers);
        var method = RequestToCurl.getMethod(config.method);
        var body = RequestToCurl.getBody(config.data);
        var url = RequestToCurl.getUrl(config);
        var curl = ("curl " + method + " " + url + " " + headers + " " + (method !== 'GET' ? body : '')).trim().replace(/\s{2,}/g, ' ');
        return curl;
    };
    RequestToCurl.getHeaders = function (headers) {
        if (headers === void 0) { headers = {}; }
        var curlHeaders = '';
        Object.keys(headers).forEach(function (property) {
            var header = property + ":" + headers[property];
            curlHeaders = curlHeaders + " -H '" + header + "'";
        });
        return curlHeaders.trim();
    };
    RequestToCurl.getMethod = function (method) {
        return "-X " + (method || ''.toUpperCase());
    };
    RequestToCurl.getBody = function (data) {
        if (typeof data !== 'undefined' && data !== '' && data !== null) {
            data = typeof data === 'object' || Object.prototype.toString.call(data) === '[object Array]' ? JSON.stringify(data) : data;
            return ("--data '" + data + "'").trim();
        }
        return '';
    };
    RequestToCurl.getUrl = function (config) {
        if (config.baseURL) {
            return config.baseURL + "/" + config.url;
        }
        return config.url;
    };
    return RequestToCurl;
}());
exports.RequestToCurl = RequestToCurl;
