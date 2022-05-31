import { InputRequest } from '../dtos';
import { AuthOptions } from '../types';
export declare class AuthValidator {
    static validateRequest(request: InputRequest, options?: AuthOptions): void;
}
