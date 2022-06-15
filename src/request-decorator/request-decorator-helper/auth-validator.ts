import { Logger } from '../../logger';
import { HttpGenericError } from '../../service';
import { HttpStatusCode } from '../../status-code';
import { JwtUtils } from '../../utils';
import { RegexUtils } from '../../utils/regex-utils';
import { InputRequest } from '../dtos';
import { AuthOptions } from '../types';
import { AuthConfig } from './auth-configs';
import { AuthSession } from './auth-session';

export class AuthValidator {
    static validateRequest(request: InputRequest, options?: AuthOptions): void {
        let token;
        try {
            const header = options?.header || 'Authorization';
            const headerValue: string = request.headers ? request.headers[header] || request.headers[header.toLowerCase()] : null;
            const token = headerValue ? RegexUtils.extract(headerValue, RegexUtils.BEARER_REGEX) : null;
            if (!token) {
                Logger.error('Token not found', { header, headerValue, options, request });
                throw new HttpGenericError(HttpStatusCode.FORBIDDEN, 'Token not found');
            }

            if (AuthConfig.tokenValidator) {
                const result = AuthConfig.tokenValidator(token);
                AuthSession.loggedUser = result;
                return;
            }

            const result = JwtUtils.validate(token);
            const roles: Array<string> = result['roles'] || [];
            if (roles.length == 0) {
                AuthSession.loggedUser = result;
                return;
            }
            let requiredRoles = options?.roles || [];

            if (typeof requiredRoles === 'string') {
                requiredRoles = [requiredRoles];
            }

            for (const requiredRole in requiredRoles) {
                for (const role in roles) {
                    if (requiredRole == role) {
                        AuthSession.loggedUser = result;
                        return;
                    }
                }
            }
        } catch (err) {
            if (err instanceof HttpGenericError) {
                Logger.error('Error while validating token', err);
                throw err;
            }
            Logger.error('Invalid token found', { token, err });
            throw new HttpGenericError(HttpStatusCode.FORBIDDEN, 'invalid Token');
        }
    }
}
