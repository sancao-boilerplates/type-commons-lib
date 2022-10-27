"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const node_smart_log_1 = require("node-smart-log");
const auth_validator_1 = require("./auth-validator");
const base_decorator_1 = require("./base-decorator");
class AuthDecorator extends base_decorator_1.BaseDecorator {
}
/**
 * This method will check if the request is allowed to proceed, you can specify the roles and the header wich sould get the token.
 * In case the request is allowed you can get the logged user through teh session obejcet 'AuthSession'
 * In caso not allowed an NOT AUTHORIZED (403) error will be thrown
 * @param options
 *
 */
AuthDecorator.Auth = (options) => (target, propertyKey, propDesc) => {
    const originalFunction = propDesc.value;
    const originalTarget = target;
    propDesc.value = function (rawRequest) {
        node_smart_log_1.Logger.debug(originalTarget);
        return auth_validator_1.AuthValidator.validateRequest(rawRequest, options)
            .then(() => base_decorator_1.BaseDecorator.applyOriginal(this, originalFunction, [rawRequest]))
            .catch((err) => {
            throw err;
        });
    };
    return propDesc;
};
exports.Auth = AuthDecorator.Auth;
