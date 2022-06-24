"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationSchema = void 0;
const Joi = require("joi");
exports.PaginationSchema = Joi.object({
    skip: Joi.number().min(0).default(0),
    offSet: Joi.number().min(1).default(10),
});
