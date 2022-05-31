"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = exports.Header = exports.Param = exports.Query = exports.Body = void 0;
const param_base_decorator_1 = require("./param-base-decorator");
const types_1 = require("../types");
class ParamDecorator extends param_base_decorator_1.BaseParamDecorator {
    static validateParam(queryParamName, paramOptions) {
        if (typeof queryParamName === 'object') {
            return {
                paramOptions: queryParamName,
                paramName: null,
            };
        }
        return {
            paramName: queryParamName,
            paramOptions,
        };
    }
}
/**
 * Inject body request object
 * @param paramOptions {InputParamOptions} Provide a joi schema object to validate your body.
 */
ParamDecorator.Body = (paramOptions) => (target, propertyKey, index) => {
    param_base_decorator_1.BaseParamDecorator.setParamMetadata(target, propertyKey, index, paramOptions, types_1.ParamType.Body);
};
/**
 * Inject data from request query string params, in cano no param name been provided all parameters object will be injected
 * @param queryParamName {string} Name of the parameter to be injected from request query parameters
 * @param paramOptions {InputParamOptions} Provide a joi schema object to validate your param.
 */
ParamDecorator.Query = (queryParamName, paramOptions) => (target, propertyKey, index) => {
    const values = ParamDecorator.validateParam(queryParamName, paramOptions);
    param_base_decorator_1.BaseParamDecorator.setParamMetadata(target, propertyKey, index, values.paramOptions, types_1.ParamType.Query, values.paramName);
};
/**
 * Inject data from request path params, in cano no param name been provided all parameters object will be injected
 * @param paramName {string} Name of the parameter to be injected from request path parameters
 * @param paramOptions {InputParamOptions} Provide a joi schema object to validate your param.
 */
ParamDecorator.Param = (paramName, paramOptions) => (target, propertyKey, index) => {
    const values = ParamDecorator.validateParam(paramName, paramOptions);
    param_base_decorator_1.BaseParamDecorator.setParamMetadata(target, propertyKey, index, values.paramOptions, types_1.ParamType.Params, values.paramName);
};
/**
 * Inject data from request path params, in cano no param name been provided all parameters object will be injected
 * @param headerName {string} Name of the parameter to be injected from request header parameters
 * @param paramOptions {InputParamOptions} Provide a joi schema object to validate your param.
 */
ParamDecorator.Header = (headerName, paramOptions) => (target, propertyKey, index) => {
    const values = ParamDecorator.validateParam(headerName, paramOptions);
    param_base_decorator_1.BaseParamDecorator.setParamMetadata(target, propertyKey, index, values.paramOptions, types_1.ParamType.Header, values.paramName);
};
/**
 * Inject raw request object {InputRequest}
 * @param paramOptions {InputParamOptions} Provide a joi schema object to validate your param.
 */
ParamDecorator.Request = (paramOptions) => (target, propertyKey, index) => {
    param_base_decorator_1.BaseParamDecorator.setParamMetadata(target, propertyKey, index, paramOptions, types_1.ParamType.Request);
};
exports.Body = ParamDecorator.Body, exports.Query = ParamDecorator.Query, exports.Param = ParamDecorator.Param, exports.Header = ParamDecorator.Header, exports.Request = ParamDecorator.Request;
