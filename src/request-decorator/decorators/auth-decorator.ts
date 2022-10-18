import { Logger } from '../../logger';
import { InputRequest } from '../dtos';
import { AuthValidator } from '../request-decorator-helper/auth-validator';
import { AuthOptions } from '../types';
import { BaseDecorator } from './base-decorator';

class AuthDecorator extends BaseDecorator {
    /**
     * This method will check if the request is allowed to proceed, you can specify the roles and the header wich sould get the token.
     * In case the request is allowed you can get the logged user through teh session obejcet 'AuthSession'
     * In caso not allowed an NOT AUTHORIZED (403) error will be thrown
     * @param options
     *
     */
    static Auth = (options?: AuthOptions) => (target: object, propertyKey: string, propDesc: PropertyDescriptor) => {
        const originalFunction: Function = propDesc.value;
        const originalTarget = target;

        propDesc.value = function (rawRequest: InputRequest) {
            Logger.debug(originalTarget);

            return AuthValidator.validateRequest(rawRequest)
                .then(() => BaseDecorator.applyOriginal(this, originalFunction, [rawRequest]))
                .catch((err) => {
                    throw err;
                });
        };
        return propDesc;
    };
}
export const Auth = AuthDecorator.Auth;
