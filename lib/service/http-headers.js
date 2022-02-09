"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpHeaders = void 0;
var HttpHeaders = /** @class */ (function () {
    function HttpHeaders() {
    }
    HttpHeaders.ContentType = 'Content-Type';
    HttpHeaders.Accept = 'Accept';
    HttpHeaders.Authorization = 'Accept';
    HttpHeaders.AccessToken = 'access_token';
    HttpHeaders.MediaTypes = {
        ApplicationJson: 'application/json',
        ApplicationXml: 'application/xml',
    };
    return HttpHeaders;
}());
exports.HttpHeaders = HttpHeaders;
