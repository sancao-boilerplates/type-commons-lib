import { InputArgumentParam } from './input-argument-param';
export interface ParamDefinition {
    target: unknown;
    method: string | symbol;
    arguments: Set<InputArgumentParam>;
}
