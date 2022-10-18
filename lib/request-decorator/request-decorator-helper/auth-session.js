"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthSession = void 0;
const cls_1 = require("../../cls");
class AuthSession {
    /**
     * Get the logged user found in request headers from your bearer token
     * @returns {T | null}
     */
    static getLoggedUser() {
        return cls_1.StorageContext.getContextValue('loggedUser', cls_1.ClsContextNamespace.AUTH);
    }
    /**
     * Returns the username extracted from bearer token
     * @returns {string | null}
     */
    static getLoggedUserName() {
        return cls_1.StorageContext.getContextValue('loggedUserName', cls_1.ClsContextNamespace.AUTH);
    }
    /**
     * Returns access token from income request header
     * @returns {string | null}
     */
    static getToken() {
        return cls_1.StorageContext.getContextValue('token', cls_1.ClsContextNamespace.AUTH);
    }
}
exports.AuthSession = AuthSession;
