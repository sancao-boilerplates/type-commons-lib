import { RequestDecoratorOptions } from '../decorator-interfaces';
export declare const Get: (options?: RequestDecoratorOptions) => (target: object, propertyKey: string, propDesc: PropertyDescriptor) => PropertyDescriptor, Post: (options?: RequestDecoratorOptions) => (target: object, propertyKey: string, propDesc: PropertyDescriptor) => PropertyDescriptor, Put: (options?: RequestDecoratorOptions) => (target: object, propertyKey: string, propDesc: PropertyDescriptor) => PropertyDescriptor, Delete: (options?: RequestDecoratorOptions) => (target: object, propertyKey: string, propDesc: PropertyDescriptor) => PropertyDescriptor, Head: (options?: RequestDecoratorOptions) => (target: object, propertyKey: string, propDesc: PropertyDescriptor) => PropertyDescriptor, Options: (options?: RequestDecoratorOptions) => (target: object, propertyKey: string, propDesc: PropertyDescriptor) => PropertyDescriptor, Patch: (options?: RequestDecoratorOptions) => (target: object, propertyKey: string, propDesc: PropertyDescriptor) => PropertyDescriptor;
