import { InputRequest } from '../dtos';
import { AuthOptions } from '../types';
export declare class AuthValidator {
    static validateRequest(request: InputRequest, options?: AuthOptions): Promise<void>;
    private static validateAuth;
    private static setAuthSession;
    private static validateRole;
}
