export declare abstract class AuthSession {
    /**
     * Get the logged user found in request headers from your bearer token
     * @returns {T | null}
     */
    static getLoggedUser<T>(): T | null;
    /**
     * Returns the username extracted from bearer token
     * @returns {string | null}
     */
    static getLoggedUserName(): string | null;
    /**
     * Returns access token from income request header
     * @returns {string | null}
     */
    static getToken(): string | null;
    /**
     * Returns loggedUserEmail extracted from bearer token
     * @returns {string | null}
     */
    static getLoggedUserEmail(): string | null;
    /**
     * Returns loggedUserId extracted from bearer token
     * @returns {string | null}
     */
    static getLoggedUserId(): string | null;
}
