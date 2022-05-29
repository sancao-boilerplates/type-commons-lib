import { AbstractType, ObjectType } from './types';
export interface IDependencyInjector {
    get<T>(type: ObjectType<T>): T;
    get<T>(id: string): T;
    get<T>(type: AbstractType<T>): T;
    set<T = unknown>(type: Function, value: any): any;
    set<T = unknown>(type: ObjectType<T>, value: any): any;
    set<T = unknown>(type: AbstractType<T>, value: any): any;
    set<T = unknown>(name: string, value: any): any;
    set<T = unknown>(token: any, value: any): any;
}
