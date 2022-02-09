"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageContext = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
var acl = require("async-local-storage");
// eslint-disable-next-line jest/require-hook
acl.enable();
var LocalStorageContext = /** @class */ (function () {
    function LocalStorageContext() {
    }
    LocalStorageContext.prototype.scope = function () {
        try {
            acl.scope();
        }
        catch (err) {
            // eslint-disable-next-line no-console
            console.warn('Error while creating new log scope');
        }
    };
    LocalStorageContext.prototype.setContext = function (namespace, context) {
        acl.set(namespace, context);
    };
    LocalStorageContext.prototype.getContext = function (namespace) {
        return acl.get(namespace) || {};
    };
    LocalStorageContext.prototype.setContextValue = function (key, value, namespace) {
        var context = acl.get(namespace) || {};
        context[key] = value;
        this.setContext(namespace, context);
    };
    LocalStorageContext.prototype.getContextValue = function (key, namespace) {
        var context = acl.get(namespace) || {};
        return context[key];
    };
    return LocalStorageContext;
}());
var StorageContext = new LocalStorageContext();
exports.StorageContext = StorageContext;
