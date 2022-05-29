import { RequestDecoratorOptions } from '../decorator-interfaces';
import { BaseDecorator } from './base-decorator';
import { HttpMethod } from '../types';
export declare class BaseHttpMethodDecorator extends BaseDecorator {
    protected static handleError(err?: any): unknown;
    protected static handleSuccess(result: any, options: RequestDecoratorOptions): unknown;
    static request(target: object, propertyKey: string, propDesc: PropertyDescriptor, method: HttpMethod, options: RequestDecoratorOptions, self?: any): PropertyDescriptor;
    protected static validateMethod(expected: HttpMethod, found: HttpMethod): void;
}
