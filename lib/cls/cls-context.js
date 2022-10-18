"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageContext = void 0;
const async_hooks_1 = require("async_hooks");
const uuid_1 = require("uuid");
// eslint-disable-next-line jest/require-hook
class LocalStorageContext {
    constructor() {
        this.storage = new async_hooks_1.AsyncLocalStorage();
    }
    run(next) {
        return __awaiter(this, void 0, void 0, function* () {
            const state = { id: (0, uuid_1.v4)() };
            return this.storage.run(state, () => __awaiter(this, void 0, void 0, function* () { return yield next(); }));
        });
    }
    scope() {
        try {
        }
        catch (err) {
            console.warn('Error while creating new log scope', err);
        }
    }
    setContext(namespace, context) {
        if (!this.storage.getStore())
            return;
        this.storage.getStore()[namespace] = context;
    }
    getContext(namespace) {
        if (!this.storage.getStore())
            return {};
        return this.storage.getStore()[namespace] || {};
    }
    setContextValue(key, value, namespace) {
        const context = this.getContext(namespace) || {};
        context[key] = value;
        this.setContext(namespace, context);
    }
    getContextValue(key, namespace) {
        const context = this.getContext(namespace);
        return context[key];
    }
}
const StorageContext = new LocalStorageContext();
exports.StorageContext = StorageContext;
