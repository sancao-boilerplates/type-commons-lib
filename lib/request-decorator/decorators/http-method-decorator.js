"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patch = exports.Options = exports.Head = exports.Delete = exports.Put = exports.Post = exports.Get = void 0;
const base_http_method_decorator_1 = require("./base-http-method-decorator");
class HttpMethodDecorator extends base_http_method_decorator_1.BaseHttpMethodDecorator {
    constructor() {
        super(...arguments);
        /**
         * Set method as a Http Get Method
         * @param statusCode {number} Response status code
         */
        this.Get = (statusCode) => (target, propertyKey, propDesc) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'GET', statusCode);
        /**
         * Set method as a Http Post Method
         * @param statusCode {number} Response status code
         */
        this.Post = (statusCode) => (target, propertyKey, propDesc) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'POST', statusCode);
        /**
         * Set method as a Http Put Method
         * @param statusCode {number} Response status code
         */
        this.Put = (statusCode) => (target, propertyKey, propDesc) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'PUT', statusCode);
        /**
         * Set method as a Http Patch Method
         * @param statusCode {number} Response status code
         */
        this.Patch = (statusCode) => (target, propertyKey, propDesc) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'PATCH', statusCode);
        /**
         * Set method as a Http Delete Method
         * @param statusCode {number} Response status code
         */
        this.Delete = (statusCode) => (target, propertyKey, propDesc) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'DELETE', statusCode);
        /**
         * Set method as a Http Options Method
         * @param statusCode {number} Response status code
         */
        this.Options = (statusCode) => (target, propertyKey, propDesc) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'OPTIONS', statusCode);
        /**
         * Set method as a Http Head Method
         * @param statusCode {number} Response status code
         */
        this.Head = (statusCode) => (target, propertyKey, propDesc) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'HEAD', statusCode);
    }
}
const base = new HttpMethodDecorator();
exports.Get = base.Get, exports.Post = base.Post, exports.Put = base.Put, exports.Delete = base.Delete, exports.Head = base.Head, exports.Options = base.Options, exports.Patch = base.Patch;
