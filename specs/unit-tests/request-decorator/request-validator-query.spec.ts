import * as Joi from 'joi';
import { BadRequestError } from '../../../src';
import { InputArgumentParam, ParamDefinition } from '../../../src/request-decorator/decorator-interfaces';
import { RequestStorage } from '../../../src/request-decorator/request-decorator-helper';
import { RequestValidator } from '../../../src/request-decorator/request-decorator-helper/request-validator';
import { ParamType } from '../../../src/request-decorator/types';
import { InputRequestHelper } from './input-request-helper';

describe('[RequestValidator]', () => {
    describe('[Query]', () => {
        const key = 'key';
        const definition: ParamDefinition = {
            target: '',
            method: 'test',
            arguments: new Set(),
        };
        const argument: InputArgumentParam = {
            index: 0,
            type: ParamType.Query,
        };
        const querySchema = Joi.object({
            name: Joi.string().required(),
            age: Joi.number().required(),
        });
        let obj;
        let request;
        beforeEach(() => {
            jest.clearAllMocks();
            RequestStorage.clear();
            obj = {
                name: 'teste',
                age: null,
            };
            argument.type = ParamType.Query;
            argument.validateSchema = querySchema;
            definition.arguments.add(argument);
            request = InputRequestHelper.inputRequest();
        });

        it('Should throw bad request exception validate', () => {
            obj.age = 'teste';
            request.queryParams = obj;
            RequestStorage.storage.set(key, definition);
            expect(() => RequestValidator.validate(key, request)).toThrow(BadRequestError);
        });

        it('Should inject all query string parameters', () => {
            obj.age = 12;
            request.queryParams = obj;
            RequestStorage.storage.set(key, definition);
            const result = RequestValidator.validate(key, request);
            expect(result[0]).toMatchObject(obj);
        });
        it('Should get only querystring param', () => {
            obj.age = 12;
            const arg = [...definition.arguments][0];
            arg.paramName = 'age';
            arg.validateSchema = null;
            definition.arguments = new Set();
            definition.arguments.add(arg);

            request.queryParams = obj;
            RequestStorage.storage.set(key, definition);
            const result = RequestValidator.validate(key, request);
            expect(result).not.toBeNull();
            expect(result[0]).toEqual(obj.age);
        });
        it('Should get only querystring param and validate it', () => {
            const arg = [...definition.arguments][0];
            arg.paramName = 'name';
            arg.validateSchema = Joi.object({
                name: Joi.string().required(),
            });
            definition.arguments = new Set();
            definition.arguments.add(arg);

            request.queryParams = obj;
            RequestStorage.storage.set(key, definition);
            const result = RequestValidator.validate(key, request);
            expect(result).not.toBeNull();
            expect(result[0]).toEqual(obj.name);
        });
        it('Should throw Bad Reques exception in case value not valid as its schema', () => {
            const arg = [...definition.arguments][0];
            arg.paramName = 'name';
            arg.validateSchema = Joi.object({
                name: Joi.string().min(10).required(),
            });
            definition.arguments = new Set();
            definition.arguments.add(arg);

            request.queryParams = obj;
            RequestStorage.storage.set(key, definition);
            expect(() => RequestValidator.validate(key, request)).toThrow(BadRequestError);
        });
    });
});