import * as Joi from 'joi';

export const PaginationSchema = Joi.object({
    skip: Joi.number().min(0).default(0),
    offSet: Joi.number().min(1).default(10),
});
