import { IDependencyInjector } from './interface-dependency-injector';
import { ObjectType, AbstractType } from './types';

export abstract class GenericDependencyInjector implements IDependencyInjector {
    abstract set(token: unknown, value: unknown): any;
    abstract get<T>(type: ObjectType<T> | string | AbstractType<T> | T): T;
}
