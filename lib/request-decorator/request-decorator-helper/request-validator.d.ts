import { InputRequest } from '../dtos';
export declare class RequestValidator {
    static validate(key: string, args: InputRequest): Array<unknown>;
    private static extractParameterValue;
    private static getParameterOurce;
    private static validateArgument;
    private static getParameterSourceDesc;
}
