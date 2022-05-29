"use strict";
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable no-param-reassign */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidator = void 0;
const logger_1 = require("../../logger");
const http_exceptions_1 = require("../../service/http-exceptions");
const types_1 = require("../types");
const request_storage_1 = require("./request-storage");
class RequestValidator {
    static validate(key, args) {
        var _a;
        const definition = request_storage_1.RequestStorage.storage.get(key);
        if (!definition)
            return;
        const parameters = [(_a = definition.arguments) === null || _a === void 0 ? void 0 : _a.size];
        const errors = [];
        definition.arguments.forEach((argument) => {
            RequestValidator.validateArgument(argument, args, parameters, errors);
        });
        if (errors.length > 0) {
            throw new http_exceptions_1.BadRequestError('Invalid request', errors);
        }
        return parameters;
    }
    static getParameterOurce(param, arg) {
        switch (param === null || param === void 0 ? void 0 : param.type) {
            case types_1.ParamType.Body:
                return arg.body;
            case types_1.ParamType.Header:
                return arg.headers;
            case types_1.ParamType.Query:
                if (param.paramName) {
                    return (arg === null || arg === void 0 ? void 0 : arg.queryParams) ? arg === null || arg === void 0 ? void 0 : arg.queryParams[param.paramName] : undefined;
                }
                return arg.queryParams;
            case types_1.ParamType.Params:
                if (param.paramName) {
                    return (arg === null || arg === void 0 ? void 0 : arg.pathParams) ? arg === null || arg === void 0 ? void 0 : arg.pathParams[param.paramName] : undefined;
                }
                return arg.pathParams;
            default:
                return arg;
        }
    }
    static validateArgument(param, arg, parameters, errors) {
        let parameterValue = RequestValidator.getParameterOurce(param, arg);
        if (param.paramName) {
            parameterValue = { [param.paramName]: parameterValue };
        }
        if (param.validateSchema) {
            const result = param.validateSchema.validate(parameterValue);
            if (result.error) {
                errors.push({
                    source: RequestValidator.getParameterSourceDesc(param.type),
                    message: result.error.message,
                });
                return;
            }
            if (result.value) {
                parameterValue = result.value;
            }
            if (result.warning) {
                logger_1.Logger.warn(result.warning.details);
            }
        }
        parameters[param.index] = param.paramName ? parameterValue[param.paramName] : parameterValue;
        return parameters;
    }
    static getParameterSourceDesc(type) {
        switch (type) {
            case types_1.ParamType.Body:
                return 'Request Body';
            case types_1.ParamType.Header:
                return 'Request header';
            case types_1.ParamType.Query:
                return 'Query String Params';
            case types_1.ParamType.Params:
                return 'Path Parameters';
            default:
                return 'Request';
        }
    }
}
exports.RequestValidator = RequestValidator;
