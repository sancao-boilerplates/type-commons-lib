import { InputParamOptions } from '../decorator-interfaces';
import { BaseDecorator } from './base-decorator';
import { ParamType } from '../types';
export declare class BaseParamDecorator extends BaseDecorator {
    protected static setParamMetadata(target: Object, propertyKey: string | symbol, index: number, paramOptions: InputParamOptions, type: ParamType, paramName?: string): void;
}
