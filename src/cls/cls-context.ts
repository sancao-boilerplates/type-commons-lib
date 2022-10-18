/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */

import { AsyncLocalStorage } from 'async_hooks';
import { v4 as uuid } from 'uuid';
import { ClsContextNamespace } from './cls-context-namespaces';

// eslint-disable-next-line jest/require-hook

class LocalStorageContext {
    private storage = new AsyncLocalStorage();

    public async run(next: Function) {
        const state = { id: uuid() };
        return this.storage.run(state, async () => await next());
    }

    public scope(): void {
        try {
        } catch (err) {
            console.warn('Error while creating new log scope', err);
        }
    }

    setContext(namespace: ClsContextNamespace, context: object): void {
        if (!this.storage.getStore()) return;
        (this.storage.getStore() as object)[namespace] = context;
    }

    getContext(namespace: ClsContextNamespace): object {
        if (!this.storage.getStore()) return {};
        return (this.storage.getStore() as object)[namespace] || {};
    }

    setContextValue(key: string, value: unknown, namespace: ClsContextNamespace): void {
        const context = this.getContext(namespace) || {};
        context[key] = value;
        this.setContext(namespace, context);
    }

    getContextValue(key: string, namespace: ClsContextNamespace): any {
        const context = this.getContext(namespace);
        return context[key];
    }
}

const StorageContext = new LocalStorageContext();

export { StorageContext };
