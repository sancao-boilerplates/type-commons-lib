import { ClsContextNamespace, StorageContext } from '../../cls';
import { LoggedUser } from '../types/logged-user-type';

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
}
