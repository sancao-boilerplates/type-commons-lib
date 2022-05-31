import { BaseDecorator } from './base-decorator';
import { HttpMethod } from '../types';
export declare class BaseHttpMethodDecorator extends BaseDecorator {
    protected static handleError(err?: any): unknown;
    protected static handleSuccess(result: any, statusCode?: number): unknown;
    static request(target: object, propertyKey: string, propDesc: PropertyDescriptor, method: HttpMethod, statusCode?: number, self?: any): PropertyDescriptor;
    protected static validateMethod(expected: HttpMethod, found: HttpMethod): void;
}
