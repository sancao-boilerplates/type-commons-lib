"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestStorage = void 0;
class RequestStorage {
    static clear() {
        RequestStorage.storage = new Map();
    }
}
exports.RequestStorage = RequestStorage;
RequestStorage.storage = new Map();
RequestStorage.authStorage = new Map();
