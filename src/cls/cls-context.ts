/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import * as acl from 'async-local-storage';
import { ClsContextNamespace } from './cls-context-namespaces';

// eslint-disable-next-line jest/require-hook
acl.enable();
class LocalStorageContext {
    public scope(): void {
        try {
            acl.scope();
        } catch (err) {
            // eslint-disable-next-line no-console
            console.warn('Error while creating new log scope');
        }
    }

    setContext(namespace: ClsContextNamespace, context: object): void {
        acl.set(namespace, context);
    }

    getContext(namespace: ClsContextNamespace): object {
        return acl.get(namespace) || {};
    }

    setContextValue(key: string, value: unknown, namespace: ClsContextNamespace): void {
        const context = acl.get(namespace) || {};
        context[key] = value;
        this.setContext(namespace, context);
    }

    getContextValue(key: string, namespace: ClsContextNamespace): any {
        const context = acl.get(namespace) || {};
        return context[key];
    }
}

const StorageContext = new LocalStorageContext();

export { StorageContext };
