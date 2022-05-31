import { LoggedUser } from '../types/logged-user-type';

export abstract class AuthSession {
    static loggedUser: LoggedUser | unknown;
}
