import * as Joi from 'joi';
export interface InputParamOptions {
    /**
     * Schema for validation
     * @validateSchema
     */
    validateSchema?: Joi.ObjectSchema;
}
