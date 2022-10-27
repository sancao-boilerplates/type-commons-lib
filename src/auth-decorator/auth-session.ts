import { ClsContextNamespace, StorageContext } from 'context-local-storage';

export abstract class AuthSession {
    /**
     * Get the logged user found in request headers from your bearer token
     * @returns {T | null}
     */
    static getLoggedUser<T>(): T | null {
        return StorageContext.getContextValue('loggedUser', ClsContextNamespace.AUTH) as T;
    }

    /**
     * Returns the username extracted from bearer token
     * @returns {string | null}
     */
    static getLoggedUserName(): string | null {
        return StorageContext.getContextValue('loggedUserName', ClsContextNamespace.AUTH);
    }

    /**
     * Returns access token from income request header
     * @returns {string | null}
     */
    static getToken(): string | null {
        return StorageContext.getContextValue('token', ClsContextNamespace.AUTH);
    }

    /**
     * Returns loggedUserEmail extracted from bearer token
     * @returns {string | null}
     */
    static getLoggedUserEmail(): string | null {
        return StorageContext.getContextValue('loggedUserEmail', ClsContextNamespace.AUTH);
    }

    /**
     * Returns loggedUserId extracted from bearer token
     * @returns {string | null}
     */
    static getLoggedUserId(): string | null {
        return StorageContext.getContextValue('loggedUserId', ClsContextNamespace.AUTH);
    }
}
