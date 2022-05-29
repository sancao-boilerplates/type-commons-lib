import Container from 'typedi';
import { GenericDependencyInjector } from './abstract-dependency-injector';
import { IDependencyInjector } from './interface-dependency-injector';
import { AbstractType, ObjectType } from './types';

class DependencyInjector implements IDependencyInjector {
    private custom: GenericDependencyInjector;

    setCustomInjector(injector: IDependencyInjector): void {
        this.custom = injector;
    }

    get<T>(type: T | AbstractType<T>): T {
        if (this.custom) {
            return this.custom.get(type);
        }
        return Container.get(type);
    }
    set(token: unknown, value: unknown): void {
        if (this.custom) {
            return this.custom.set(token, value);
        }
        Container.set(token, value);
    }
}
const Injector = new DependencyInjector();

export { Injector };
