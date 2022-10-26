import { ClsContextNamespace, StorageContext } from 'context-local-storage';
import { Logger } from 'node-smart-log';
import { DefaultHttpService } from '../service';
import { ForbidenError, HttpGenericError, UnauthorizedError } from 'node-http-helper';
import { AuthOptions } from './types';
import { AuthConfig } from './auth-configs';

const AuthHeader = 'Authorization';
export class AuthValidator {
    static async validateRequest(request: any, options?: AuthOptions): Promise<void> {
        let token;
        try {
            const header = options?.header || AuthHeader;

            token = request.headers ? request.headers[header] || request.headers[header.toLowerCase()] : null;

            if (!token) {
                Logger.warn('Token not found', {
                    header,
                    token,
                    options,
                    request,
                });
                throw new UnauthorizedError('Token not found');
            }

            if (AuthConfig.tokenValidator) {
                const result = await AuthConfig.tokenValidator(token, options);
                AuthValidator.setAuthSession(result, token);
                return;
            }

            await AuthValidator.validateAuth(token, options);
        } catch (err) {
            if (err instanceof HttpGenericError) {
                Logger.error('Error while validating token', err);
                throw err;
            }
            Logger.error('Invalid token found', { token, err });
            throw new ForbidenError('invalid Token');
        }
    }

    private static async validateAuth(token: string, options?: AuthOptions): Promise<void> {
        const headerName = options?.header || AuthHeader;
        const headers = {};
        headers[headerName] = token;
        const url = process.env.AUTH_TOKEN_VALIDATOR_URL;
        const result = await DefaultHttpService.get(url, { headers });
        if (!result) {
            return;
        }
        AuthValidator.validateRole(result?.role, options?.role);
        AuthValidator.setAuthSession(result, token);
    }

    private static setAuthSession(result: any, token: string) {
        StorageContext.setContextValue('loggedUser', result, ClsContextNamespace.AUTH);
        StorageContext.setContextValue('token', token, ClsContextNamespace.AUTH);
        StorageContext.setContextValue('loggedUserName', result?.username, ClsContextNamespace.AUTH);
        StorageContext.setContextValue('loggedUserEmail', result?.email, ClsContextNamespace.AUTH);
        StorageContext.setContextValue('loggedUserId', result?.id, ClsContextNamespace.AUTH);
    }

    private static validateRole(userRole: number, requiredRole: number) {
        if (!requiredRole) {
            return;
        }

        if (userRole < requiredRole) {
            throw new ForbidenError('User has no permission for this resource.');
        }
    }
}
