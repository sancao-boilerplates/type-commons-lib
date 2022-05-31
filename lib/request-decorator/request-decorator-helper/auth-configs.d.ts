import { LoggedUser } from '../types/logged-user-type';
export declare abstract class AuthConfig {
    static tokenValidator: (token: string) => LoggedUser | unknown;
}
