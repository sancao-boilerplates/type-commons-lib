import { AuthOptions } from './types';
import { LoggedUser } from './types/logged-user-type';

export abstract class AuthConfig {
    static tokenValidator: (token: string, options?: AuthOptions) => LoggedUser | unknown;
}
