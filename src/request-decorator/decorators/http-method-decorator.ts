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
    /**
     * Set method as a Http Get Method
     * @param statusCode {number} Response status code
     */
    Get = (statusCode?: number) => (target: object, propertyKey: string, propDesc: PropertyDescriptor) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'GET', statusCode);

    /**
     * Set method as a Http Post Method
     * @param statusCode {number} Response status code
     */
    Post = (statusCode?: number) => (target: object, propertyKey: string, propDesc: PropertyDescriptor) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'POST', statusCode);

    /**
     * Set method as a Http Put Method
     * @param statusCode {number} Response status code
     */
    Put = (statusCode?: number) => (target: object, propertyKey: string, propDesc: PropertyDescriptor) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'PUT', statusCode);

    /**
     * Set method as a Http Patch Method
     * @param statusCode {number} Response status code
     */
    Patch = (statusCode?: number) => (target: object, propertyKey: string, propDesc: PropertyDescriptor) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'PATCH', statusCode);

    /**
     * Set method as a Http Delete Method
     * @param statusCode {number} Response status code
     */
    Delete = (statusCode?: number) => (target: object, propertyKey: string, propDesc: PropertyDescriptor) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'DELETE', statusCode);

    /**
     * Set method as a Http Options Method
     * @param statusCode {number} Response status code
     */
    Options = (statusCode?: number) => (target: object, propertyKey: string, propDesc: PropertyDescriptor) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'OPTIONS', statusCode);

    /**
     * Set method as a Http Head Method
     * @param statusCode {number} Response status code
     */
    Head = (statusCode?: number) => (target: object, propertyKey: string, propDesc: PropertyDescriptor) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'HEAD', statusCode);
}
const base = new HttpMethodDecorator();
export const { Get, Post, Put, Delete, Head, Options, Patch } = base;
