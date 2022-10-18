import { ClsContextNamespace } from './cls-context-namespaces';
declare class LocalStorageContext {
    private storage;
    run(next: Function): Promise<void>;
    scope(): void;
    setContext(namespace: ClsContextNamespace, context: object): void;
    getContext(namespace: ClsContextNamespace): object;
    setContextValue(key: string, value: unknown, namespace: ClsContextNamespace): void;
    getContextValue(key: string, namespace: ClsContextNamespace): any;
}
declare const StorageContext: LocalStorageContext;
export { StorageContext };
