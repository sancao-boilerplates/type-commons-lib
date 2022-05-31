import { AuthOptions } from '../types';
export declare const Auth: (options?: AuthOptions) => (target: object, propertyKey: string, propDesc: PropertyDescriptor) => PropertyDescriptor;
