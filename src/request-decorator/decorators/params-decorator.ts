/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { InputParamOptions } from '../decorator-interfaces';
import { BaseParamDecorator } from './param-base-decorator';
import { ParamType } from '../types';

class ParamDecorator extends BaseParamDecorator {
    static Body = (paramOptions: InputParamOptions) => (target: Object, propertyKey: string | symbol, index: number) => {
        BaseParamDecorator.setParamMetadata(target, propertyKey, index, paramOptions, ParamType.Body);
    };

    /**
     *
     * @param paramOptions
     * Name of the parameter to be injected from request query parameters
     * @param queryParamName
     * @returns
     */
    static Query = (queryParamName?: string, paramOptions?: InputParamOptions) => (target: Object, propertyKey: string | symbol, index: number) => {
        BaseParamDecorator.setParamMetadata(target, propertyKey, index, paramOptions, ParamType.Query, queryParamName);
    };

    static Param = (paramName: string, paramOptions: InputParamOptions) => (target: Object, propertyKey: string | symbol, index: number) => {
        BaseParamDecorator.setParamMetadata(target, propertyKey, index, paramOptions, ParamType.Params, paramName);
    };

    /**
     * The name of header
     * @param headerName
     * options
     * @param paramOptions
     */
    static Header = (headerName: string, paramOptions: InputParamOptions) => (target: Object, propertyKey: string | symbol, index: number) => {
        BaseParamDecorator.setParamMetadata(target, propertyKey, index, paramOptions, ParamType.Header, headerName);
    };

    static Request = (paramOptions?: InputParamOptions) => (target: Object, propertyKey: string | symbol, index: number) => {
        BaseParamDecorator.setParamMetadata(target, propertyKey, index, paramOptions, ParamType.Request);
    };
}
export const { Body, Query, Param, Header, Request } = ParamDecorator;
