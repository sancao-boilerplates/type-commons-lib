/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { InputParamOptions } from '../decorator-interfaces';
import { BaseParamDecorator } from './param-base-decorator';
import { ParamType } from '../types';

class ParamDecorator extends BaseParamDecorator {
    private static validateParam(queryParamName?: string | InputParamOptions, paramOptions?: InputParamOptions): { paramName?: string; paramOptions?: InputParamOptions } {
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
    /**
     * Inject body request object
     * @param paramOptions {InputParamOptions} Provide a joi schema object to validate your body.
     */
    static Body = (paramOptions?: InputParamOptions) => (target: Object, propertyKey: string | symbol, index: number) => {
        BaseParamDecorator.setParamMetadata(target, propertyKey, index, paramOptions, ParamType.Body);
    };
    /**
     * Inject data from request query string params, in cano no param name been provided all parameters object will be injected
     * @param queryParamName {string} Name of the parameter to be injected from request query parameters
     * @param paramOptions {InputParamOptions} Provide a joi schema object to validate your param.
     */
    static Query = (queryParamName?: string | InputParamOptions, paramOptions?: InputParamOptions) => (target: Object, propertyKey: string | symbol, index: number) => {
        const values = ParamDecorator.validateParam(queryParamName, paramOptions);
        BaseParamDecorator.setParamMetadata(target, propertyKey, index, values.paramOptions, ParamType.Query, values.paramName);
    };

    /**
     * Inject data from request path params, in cano no param name been provided all parameters object will be injected
     * @param paramName {string} Name of the parameter to be injected from request path parameters
     * @param paramOptions {InputParamOptions} Provide a joi schema object to validate your param.
     */
    static Param = (paramName?: string | InputParamOptions, paramOptions?: InputParamOptions) => (target: Object, propertyKey: string | symbol, index: number) => {
        const values = ParamDecorator.validateParam(paramName, paramOptions);
        BaseParamDecorator.setParamMetadata(target, propertyKey, index, values.paramOptions, ParamType.Params, values.paramName);
    };

    /**
     * Inject data from request path params, in cano no param name been provided all parameters object will be injected
     * @param headerName {string} Name of the parameter to be injected from request header parameters
     * @param paramOptions {InputParamOptions} Provide a joi schema object to validate your param.
     */
    static Header = (headerName?: string | InputParamOptions, paramOptions?: InputParamOptions) => (target: Object, propertyKey: string | symbol, index: number) => {
        const values = ParamDecorator.validateParam(headerName, paramOptions);
        BaseParamDecorator.setParamMetadata(target, propertyKey, index, values.paramOptions, ParamType.Header, values.paramName);
    };

    /**
     * Inject raw request object {InputRequest}
     * @param paramOptions {InputParamOptions} Provide a joi schema object to validate your param.
     */
    static Request = (paramOptions?: InputParamOptions) => (target: Object, propertyKey: string | symbol, index: number) => {
        BaseParamDecorator.setParamMetadata(target, propertyKey, index, paramOptions, ParamType.Request);
    };
}
export const { Body, Query, Param, Header, Request } = ParamDecorator;
