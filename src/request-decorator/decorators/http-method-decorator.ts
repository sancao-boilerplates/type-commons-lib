/* eslint-disable prefer-rest-params */
/* eslint-disable no-param-reassign */
/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { RequestDecoratorOptions } from '../decorator-interfaces';
import { BaseHttpMethodDecorator } from './base-http-method-decorator';

class HttpMethodDecorator extends BaseHttpMethodDecorator {
    Get = (options?: RequestDecoratorOptions) => (target: object, propertyKey: string, propDesc: PropertyDescriptor) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'GET', options);

    Post = (options?: RequestDecoratorOptions) => (target: object, propertyKey: string, propDesc: PropertyDescriptor) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'POST', options);

    Put = (options?: RequestDecoratorOptions) => (target: object, propertyKey: string, propDesc: PropertyDescriptor) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'PUT', options);

    Patch = (options?: RequestDecoratorOptions) => (target: object, propertyKey: string, propDesc: PropertyDescriptor) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'PATCH', options);

    Delete = (options?: RequestDecoratorOptions) => (target: object, propertyKey: string, propDesc: PropertyDescriptor) =>
        HttpMethodDecorator.request(target, propertyKey, propDesc, 'DELETE', options);

    Options = (options?: RequestDecoratorOptions) => (target: object, propertyKey: string, propDesc: PropertyDescriptor) =>
        HttpMethodDecorator.request(target, propertyKey, propDesc, 'OPTIONS', options);

    Head = (options?: RequestDecoratorOptions) => (target: object, propertyKey: string, propDesc: PropertyDescriptor) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'HEAD', options);
}
const base = new HttpMethodDecorator();
export const { Get, Post, Put, Delete, Head, Options, Patch } = base;
