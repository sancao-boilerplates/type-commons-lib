/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import { InputArgumentParam, InputParamOptions, ParamDefinition } from '../decorator-interfaces';
import { RequestStorage } from '../request-decorator-helper';
import { BaseDecorator } from './base-decorator';
import { ParamType } from '../types';

export class BaseParamDecorator extends BaseDecorator {
    protected static setParamMetadata(target: Object, propertyKey: string | symbol, index: number, paramOptions: InputParamOptions, type: ParamType, paramName?: string) {
        const key = BaseParamDecorator.generateKey(target, propertyKey);

        let definition: ParamDefinition = RequestStorage.storage.get(key);
        paramOptions = paramOptions || {};
        const inputArgument: InputArgumentParam = {
            ...paramOptions,
            index,
            type,
            paramName,
        };

        if (!definition) {
            definition = {
                method: propertyKey,
                target,
                arguments: new Set<InputArgumentParam>(),
            };
        }

        if (!definition.arguments.has(inputArgument)) {
            definition.arguments.add(inputArgument);
            RequestStorage.storage.set(key, definition);
        }
    }
}
