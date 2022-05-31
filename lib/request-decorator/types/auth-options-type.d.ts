export interface AuthOptions {
    /**
     * @roles {string} Specify which role is allowed to process this request, you can pass only one or an array
     */
    roles?: string | Array<string>;
    /**
     * @header {string} Provide from which header should get the token, by default it will try get bearer token from Authorization header
     * @default Authorization
     */
    header?: string;
}
