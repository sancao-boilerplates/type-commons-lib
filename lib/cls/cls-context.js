"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageContext = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
const acl = require("async-local-storage");
// eslint-disable-next-line jest/require-hook
acl.enable();
class LocalStorageContext {
    scope() {
        try {
            acl.scope();
        }
        catch (err) {
            // eslint-disable-next-line no-console
            console.warn('Error while creating new log scope');
        }
    }
    setContext(namespace, context) {
        acl.set(namespace, context);
    }
    getContext(namespace) {
        return acl.get(namespace) || {};
    }
    setContextValue(key, value, namespace) {
        const context = acl.get(namespace) || {};
        context[key] = value;
        this.setContext(namespace, context);
    }
    getContextValue(key, namespace) {
        const context = acl.get(namespace) || {};
        return context[key];
    }
}
const StorageContext = new LocalStorageContext();
exports.StorageContext = StorageContext;
