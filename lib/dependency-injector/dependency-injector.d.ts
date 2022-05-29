import { IDependencyInjector } from './interface-dependency-injector';
import { AbstractType } from './types';
declare class DependencyInjector implements IDependencyInjector {
    private custom;
    setCustomInjector(injector: IDependencyInjector): void;
    get<T>(type: T | AbstractType<T>): T;
    set(token: unknown, value: unknown): void;
}
declare const Injector: DependencyInjector;
export { Injector };
