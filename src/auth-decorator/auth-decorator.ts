/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { Logger } from 'node-smart-log';
import { AuthValidator } from './auth-validator';
import { BaseDecorator } from './base-decorator';
import { AuthOptions } from './types';

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

        propDesc.value = function (rawRequest: any) {
            Logger.debug(originalTarget);

            return AuthValidator.validateRequest(rawRequest, options)
                .then(() => BaseDecorator.applyOriginal(this, originalFunction, [rawRequest]))
                .catch((err) => {
                    throw err;
                });
        };
        return propDesc;
    };
}
export const { Auth } = AuthDecorator;
