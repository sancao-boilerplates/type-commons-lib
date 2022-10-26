import { AuthOptions } from './types';
import { LoggedUser } from './types/logged-user-type';
export declare abstract class AuthConfig {
    static tokenValidator: (token: string, options?: AuthOptions) => LoggedUser | unknown;
}
