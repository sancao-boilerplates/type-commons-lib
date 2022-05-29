import { ServiceOptions } from 'typedi';
import { AbstractType, ObjectType, ServiceType } from './types';

export interface IDependencyInjector {
    get<T>(type: ObjectType<T>): T;

    get<T>(id: string): T;

    get<T>(type: AbstractType<T>): T;

    //set(identify: any, value: any);

    set<T = unknown>(type: Function, value: any);
    set<T = unknown>(type: ObjectType<T>, value: any);
    set<T = unknown>(type: AbstractType<T>, value: any);
    set<T = unknown>(name: string, value: any);
    set<T = unknown>(token: any, value: any);
}
