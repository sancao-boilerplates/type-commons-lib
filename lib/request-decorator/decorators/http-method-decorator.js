"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patch = exports.Options = exports.Head = exports.Delete = exports.Put = exports.Post = exports.Get = void 0;
const base_http_method_decorator_1 = require("./base-http-method-decorator");
class HttpMethodDecorator extends base_http_method_decorator_1.BaseHttpMethodDecorator {
    constructor() {
        super(...arguments);
        this.Get = (options) => (target, propertyKey, propDesc) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'GET', options);
        this.Post = (options) => (target, propertyKey, propDesc) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'POST', options);
        this.Put = (options) => (target, propertyKey, propDesc) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'PUT', options);
        this.Patch = (options) => (target, propertyKey, propDesc) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'PATCH', options);
        this.Delete = (options) => (target, propertyKey, propDesc) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'DELETE', options);
        this.Options = (options) => (target, propertyKey, propDesc) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'OPTIONS', options);
        this.Head = (options) => (target, propertyKey, propDesc) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'HEAD', options);
    }
}
const base = new HttpMethodDecorator();
exports.Get = base.Get, exports.Post = base.Post, exports.Put = base.Put, exports.Delete = base.Delete, exports.Head = base.Head, exports.Options = base.Options, exports.Patch = base.Patch;
