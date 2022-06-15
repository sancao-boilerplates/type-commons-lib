"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidator = void 0;
const logger_1 = require("../../logger");
const service_1 = require("../../service");
const status_code_1 = require("../../status-code");
const utils_1 = require("../../utils");
const regex_utils_1 = require("../../utils/regex-utils");
const auth_configs_1 = require("./auth-configs");
const auth_session_1 = require("./auth-session");
class AuthValidator {
    static validateRequest(request, options) {
        let token;
        try {
            const header = (options === null || options === void 0 ? void 0 : options.header) || 'Authorization';
            const headerValue = request.headers ? request.headers[header] || request.headers[header.toLowerCase()] : null;
            const token = headerValue ? regex_utils_1.RegexUtils.extract(headerValue, regex_utils_1.RegexUtils.BEARER_REGEX) : null;
            if (!token) {
                logger_1.Logger.error('Token not found', { header, headerValue, options, request });
                throw new service_1.HttpGenericError(status_code_1.HttpStatusCode.FORBIDDEN, 'Token not found');
            }
            if (auth_configs_1.AuthConfig.tokenValidator) {
                const result = auth_configs_1.AuthConfig.tokenValidator(token);
                auth_session_1.AuthSession.loggedUser = result;
                return;
            }
            const result = utils_1.JwtUtils.validate(token);
            const roles = result['roles'] || [];
            if (roles.length == 0) {
                auth_session_1.AuthSession.loggedUser = result;
                return;
            }
            let requiredRoles = (options === null || options === void 0 ? void 0 : options.roles) || [];
            if (typeof requiredRoles === 'string') {
                requiredRoles = [requiredRoles];
            }
            for (const requiredRole in requiredRoles) {
                for (const role in roles) {
                    if (requiredRole == role) {
                        auth_session_1.AuthSession.loggedUser = result;
                        return;
                    }
                }
            }
        }
        catch (err) {
            if (err instanceof service_1.HttpGenericError) {
                logger_1.Logger.error('Error while validating token', err);
                throw err;
            }
            logger_1.Logger.error('Invalid token found', { token, err });
            throw new service_1.HttpGenericError(status_code_1.HttpStatusCode.FORBIDDEN, 'invalid Token');
        }
    }
}
exports.AuthValidator = AuthValidator;
