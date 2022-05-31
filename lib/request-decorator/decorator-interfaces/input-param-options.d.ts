import * as Joi from 'joi';
export interface InputParamOptions {
    /**
     *
     * @validateSchema {Joi.object} Schema for validation
     */
    validateSchema?: Joi.ObjectSchema;
    /**
     *
     * @allowAditionalProperties {boolean} Should allow aditional properties ? default false
     * @default false
     */
    allowAditionalProperties?: boolean;
}
