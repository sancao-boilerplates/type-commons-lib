"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthSession = void 0;
const context_local_storage_1 = require("context-local-storage");
class AuthSession {
    /**
     * Get the logged user found in request headers from your bearer token
     * @returns {T | null}
     */
    static getLoggedUser() {
        return context_local_storage_1.StorageContext.getContextValue('loggedUser', context_local_storage_1.ClsContextNamespace.AUTH);
    }
    /**
     * Returns the username extracted from bearer token
     * @returns {string | null}
     */
    static getLoggedUserName() {
        return context_local_storage_1.StorageContext.getContextValue('loggedUserName', context_local_storage_1.ClsContextNamespace.AUTH);
    }
    /**
     * Returns access token from income request header
     * @returns {string | null}
     */
    static getToken() {
        return context_local_storage_1.StorageContext.getContextValue('token', context_local_storage_1.ClsContextNamespace.AUTH);
    }
    /**
     * Returns loggedUserEmail extracted from bearer token
     * @returns {string | null}
     */
    static getLoggedUserEmail() {
        return context_local_storage_1.StorageContext.getContextValue('loggedUserEmail', context_local_storage_1.ClsContextNamespace.AUTH);
    }
    /**
     * Returns loggedUserId extracted from bearer token
     * @returns {string | null}
     */
    static getLoggedUserId() {
        return context_local_storage_1.StorageContext.getContextValue('loggedUserId', context_local_storage_1.ClsContextNamespace.AUTH);
    }
}
exports.AuthSession = AuthSession;
