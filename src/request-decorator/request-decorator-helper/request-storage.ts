import { ParamDefinition } from '../decorator-interfaces';

export class RequestStorage {
    static storage: Map<string, ParamDefinition> = new Map();
}
