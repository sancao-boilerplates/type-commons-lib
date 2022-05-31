/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable no-param-reassign */

import { Logger } from '../../logger';
import { BadRequestError } from '../../service/http-exceptions';
import { InputArgumentParam } from '../decorator-interfaces';
import { InputRequest } from '../dtos';
import { ParamType } from '../types';
import { RequestStorage } from './request-storage';

interface ParameterValidationError {
    source: string;
    message: string;
    detail?: unknown;
}
export class RequestValidator {
    static validate(key: string, args: InputRequest): Array<unknown> {
        const definition = RequestStorage.storage.get(key);
        if (!definition) return;

        const parameters = [definition.arguments?.size];
        const errors: Array<ParameterValidationError> = [];

        definition.arguments.forEach((argument) => {
            RequestValidator.validateArgument(argument, args, parameters, errors);
        });
        if (errors.length > 0) {
            throw new BadRequestError('Invalid request', errors);
        }
        return parameters;
    }

    private static getParameterOurce(param: InputArgumentParam, arg: InputRequest): unknown {
        switch (param?.type) {
            case ParamType.Body:
                if (param.paramName) {
                    return arg?.body ? arg?.body[param.paramName] : undefined;
                }
                return arg.body;
            case ParamType.Header:
                if (param.paramName) {
                    return arg?.headers ? arg?.headers[param.paramName] : undefined;
                }
                return arg.headers;
            case ParamType.Query:
                if (param.paramName) {
                    return arg?.queryParams ? arg?.queryParams[param.paramName] : undefined;
                }
                return arg.queryParams;
            case ParamType.Params:
                if (param.paramName) {
                    return arg?.pathParams ? arg?.pathParams[param.paramName] : undefined;
                }
                return arg.pathParams;
            default:
                return arg;
        }
    }

    private static validateArgument(param: InputArgumentParam, arg: InputRequest, parameters: Array<unknown>, errors: Array<ParameterValidationError>): Array<unknown> {
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
                Logger.warn(result.warning.details);
            }
        }

        parameters[param.index] = param.paramName ? parameterValue[param.paramName] : parameterValue;
        return parameters;
    }

    private static getParameterSourceDesc(type: ParamType): string {
        switch (type) {
            case ParamType.Body:
                return 'Request Body';
            case ParamType.Header:
                return 'Request header';
            case ParamType.Query:
                return 'Query String Params';
            case ParamType.Params:
                return 'Path Parameters';
            default:
                return 'Request';
        }
    }
}
