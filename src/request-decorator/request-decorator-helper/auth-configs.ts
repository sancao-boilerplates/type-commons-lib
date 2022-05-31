import { LoggedUser } from '../types/logged-user-type';

export abstract class AuthConfig {
    static tokenValidator: (token: string) => LoggedUser | unknown;
}
