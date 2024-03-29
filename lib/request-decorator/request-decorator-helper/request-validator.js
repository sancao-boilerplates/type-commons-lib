"use strict";
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable no-param-reassign */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidator = void 0;
const node_smart_log_1 = require("node-smart-log");
const node_http_helper_1 = require("node-http-helper");
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
            throw new node_http_helper_1.BadRequestError('Invalid request', errors);
        }
        return parameters;
    }
    static extractParameterValue(param, source) {
        if (!source)
            return undefined;
        return source[param] ? source[param] : source[param.toLowerCase()] ? source[param.toLowerCase()] : undefined;
    }
    static getParameterOurce(param, arg) {
        switch (param === null || param === void 0 ? void 0 : param.type) {
            case types_1.ParamType.Body:
                if (param.paramName) {
                    return RequestValidator.extractParameterValue(param.paramName, arg === null || arg === void 0 ? void 0 : arg.body);
                }
                return arg.body;
            case types_1.ParamType.Header:
                if (param.paramName) {
                    return RequestValidator.extractParameterValue(param.paramName, arg === null || arg === void 0 ? void 0 : arg.headers);
                }
                return arg.headers;
            case types_1.ParamType.Query:
                if (param.paramName) {
                    return RequestValidator.extractParameterValue(param.paramName, arg === null || arg === void 0 ? void 0 : arg.queryParams);
                }
                return arg.queryParams;
            case types_1.ParamType.Params:
                if (param.paramName) {
                    return RequestValidator.extractParameterValue(param.paramName, arg === null || arg === void 0 ? void 0 : arg.pathParams);
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
            const result = param.validateSchema.validate(parameterValue || {}, { allowUnknown: param.allowAditionalProperties || false });
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
                node_smart_log_1.Logger.warn(result.warning.details);
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
