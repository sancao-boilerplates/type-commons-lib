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
const context_local_storage_1 = require("context-local-storage");
const node_smart_log_1 = require("node-smart-log");
const service_1 = require("../service");
const node_http_helper_1 = require("node-http-helper");
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
                    node_smart_log_1.Logger.warn('Token not found', {
                        header,
                        token,
                        options,
                        request,
                    });
                    throw new node_http_helper_1.UnauthorizedError('Token not found');
                }
                if (auth_configs_1.AuthConfig.tokenValidator) {
                    const result = yield auth_configs_1.AuthConfig.tokenValidator(token, options);
                    AuthValidator.setAuthSession(result, token);
                    return;
                }
                yield AuthValidator.validateAuth(token, options);
            }
            catch (err) {
                if (err instanceof node_http_helper_1.HttpGenericError) {
                    node_smart_log_1.Logger.error('Error while validating token', err);
                    throw err;
                }
                node_smart_log_1.Logger.error('Invalid token found', { token, err });
                throw new node_http_helper_1.ForbidenError('invalid Token');
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
        context_local_storage_1.StorageContext.setContextValue('loggedUser', result, context_local_storage_1.ClsContextNamespace.AUTH);
        context_local_storage_1.StorageContext.setContextValue('token', token, context_local_storage_1.ClsContextNamespace.AUTH);
        context_local_storage_1.StorageContext.setContextValue('loggedUserName', result === null || result === void 0 ? void 0 : result.username, context_local_storage_1.ClsContextNamespace.AUTH);
        context_local_storage_1.StorageContext.setContextValue('loggedUserEmail', result === null || result === void 0 ? void 0 : result.email, context_local_storage_1.ClsContextNamespace.AUTH);
        context_local_storage_1.StorageContext.setContextValue('loggedUserId', result === null || result === void 0 ? void 0 : result.id, context_local_storage_1.ClsContextNamespace.AUTH);
    }
    static validateRole(userRole, requiredRole) {
        if (!requiredRole) {
            return;
        }
        if (userRole < requiredRole) {
            throw new node_http_helper_1.ForbidenError('User has no permission for this resource.');
        }
    }
}
exports.AuthValidator = AuthValidator;
