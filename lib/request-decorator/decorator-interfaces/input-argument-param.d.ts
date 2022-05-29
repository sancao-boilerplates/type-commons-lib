import { ParamType } from '../types';
import { InputParamOptions } from './input-param-options';
export interface InputArgumentParam extends InputParamOptions {
    paramName?: string;
    index: number;
    type: ParamType;
}
