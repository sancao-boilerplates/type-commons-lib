"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidator = void 0;
const cls_1 = require("../../cls");
const logger_1 = require("../../logger");
const service_1 = require("../../service");
const status_code_1 = require("../../status-code");
const auth_configs_1 = require("./auth-configs");
const AuthHeader = 'Authorization';
class AuthValidator {
    static validateRequest(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let token;
            try {
                const header = (options === null || options === void 0 ? void 0 : options.header) || AuthHeader;
                token = request.headers ? request.headers[header] || request.headers[header.toLowerCase()] : null;
                if (!token) {
                    logger_1.Logger.warn('Token not found', {
                        header,
                        token,
                        options,
                        request,
                    });
                    throw new service_1.HttpGenericError(status_code_1.HttpStatusCode.UNAUTHORIZED, 'Token not found');
                }
                if (auth_configs_1.AuthConfig.tokenValidator) {
                    const result = yield auth_configs_1.AuthConfig.tokenValidator(token, options);
                    AuthValidator.setAuthSession(result, token);
                    return;
                }
                yield AuthValidator.validateAuth(token, options);
            }
            catch (err) {
                if (err instanceof service_1.HttpGenericError) {
                    logger_1.Logger.error('Error while validating token', err);
                    throw err;
                }
                logger_1.Logger.error('Invalid token found', { token, err });
                throw new service_1.HttpGenericError(status_code_1.HttpStatusCode.FORBIDDEN, 'invalid Token');
            }
        });
    }
    static validateAuth(token, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const headerName = (options === null || options === void 0 ? void 0 : options.header) || AuthHeader;
            const headers = {};
            headers[headerName] = token;
            const url = process.env.AUTH_TOKEN_VALIDATOR_URL;
            const result = yield service_1.DefaultHttpService.get(url, { headers });
            if (!result) {
                return;
            }
            AuthValidator.validateRole(result === null || result === void 0 ? void 0 : result.role, options === null || options === void 0 ? void 0 : options.role);
            AuthValidator.setAuthSession(result, token);
        });
    }
    static setAuthSession(result, token) {
        cls_1.StorageContext.setContextValue('loggedUser', result, cls_1.ClsContextNamespace.AUTH);
        cls_1.StorageContext.setContextValue('token', token, cls_1.ClsContextNamespace.AUTH);
        cls_1.StorageContext.setContextValue('loggedUserName', result === null || result === void 0 ? void 0 : result.username, cls_1.ClsContextNamespace.AUTH);
        cls_1.StorageContext.setContextValue('loggedUserEmail', result === null || result === void 0 ? void 0 : result.email, cls_1.ClsContextNamespace.AUTH);
        cls_1.StorageContext.setContextValue('loggedUserId', result === null || result === void 0 ? void 0 : result.id, cls_1.ClsContextNamespace.AUTH);
    }
    static validateRole(userRole, requiredRole) {
        if (!requiredRole) {
            return;
        }
        if (userRole < requiredRole) {
            throw new service_1.HttpGenericError(status_code_1.HttpStatusCode.FORBIDDEN, 'User has no permission for this resource.');
        }
    }
}
exports.AuthValidator = AuthValidator;
