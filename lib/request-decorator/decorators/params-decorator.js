"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = exports.Header = exports.Param = exports.Query = exports.Body = void 0;
const param_base_decorator_1 = require("./param-base-decorator");
const types_1 = require("../types");
class ParamDecorator extends param_base_decorator_1.BaseParamDecorator {
}
ParamDecorator.Body = (paramOptions) => (target, propertyKey, index) => {
    param_base_decorator_1.BaseParamDecorator.setParamMetadata(target, propertyKey, index, paramOptions, types_1.ParamType.Body);
};
/**
 *
 * @param paramOptions
 * Name of the parameter to be injected from request query parameters
 * @param queryParamName
 * @returns
 */
ParamDecorator.Query = (queryParamName, paramOptions) => (target, propertyKey, index) => {
    param_base_decorator_1.BaseParamDecorator.setParamMetadata(target, propertyKey, index, paramOptions, types_1.ParamType.Query, queryParamName);
};
ParamDecorator.Param = (paramName, paramOptions) => (target, propertyKey, index) => {
    param_base_decorator_1.BaseParamDecorator.setParamMetadata(target, propertyKey, index, paramOptions, types_1.ParamType.Params, paramName);
};
/**
 * The name of header
 * @param headerName
 * options
 * @param paramOptions
 */
ParamDecorator.Header = (headerName, paramOptions) => (target, propertyKey, index) => {
    param_base_decorator_1.BaseParamDecorator.setParamMetadata(target, propertyKey, index, paramOptions, types_1.ParamType.Header, headerName);
};
ParamDecorator.Request = (paramOptions) => (target, propertyKey, index) => {
    param_base_decorator_1.BaseParamDecorator.setParamMetadata(target, propertyKey, index, paramOptions, types_1.ParamType.Request);
};
exports.Body = ParamDecorator.Body, exports.Query = ParamDecorator.Query, exports.Param = ParamDecorator.Param, exports.Header = ParamDecorator.Header, exports.Request = ParamDecorator.Request;
