import Joi = require('joi');
import { Get, Param, Header, Query, Injectable, Auth, Head } from '..';

@Injectable()
export class ControllerHelper {
    @Get()
    public async getTest(): Promise<string> {
        return new Promise<string>((resolve) => resolve('OK'));
    }

    //HEAD
    @Get()
    public async testHeader(@Header('token') token: string): Promise<string> {
        return new Promise<string>((resolve) => resolve(token));
    }

    @Get()
    public async testHeaderValidateSchema1(@Header('token', { validateSchema: Joi.object({ token: Joi.string() }) }) token: string): Promise<string> {
        return new Promise<string>((resolve) => resolve(token));
    }

    @Get()
    public async testHeaderAllParams(@Header({ validateSchema: Joi.object({ token: Joi.string() }) }) token: unknown): Promise<unknown> {
        return new Promise<unknown>((resolve) => resolve(token));
    }
    @Get()
    public async testHeaderAllowAitional(@Header({ validateSchema: Joi.object({ token: Joi.string() }), allowAditionalProperties: true }) token: unknown): Promise<unknown> {
        return new Promise<unknown>((resolve) => resolve(token));
    }

    //Param

    @Get()
    public async testParam(@Param('token') token: string): Promise<string> {
        return new Promise<string>((resolve) => resolve(token));
    }

    @Get()
    public async testParamValidateSchema1(@Param('token', { validateSchema: Joi.object({ token: Joi.string() }) }) token: string): Promise<string> {
        return new Promise<string>((resolve) => resolve(token));
    }

    @Get()
    public async testParamAllParams(@Param({ validateSchema: Joi.object({ token: Joi.string() }) }) token: unknown): Promise<unknown> {
        return new Promise<unknown>((resolve) => resolve(token));
    }
    @Get()
    public async testParamAllowAitional(@Param({ validateSchema: Joi.object({ token: Joi.string() }), allowAditionalProperties: true }) token: unknown): Promise<unknown> {
        return new Promise<unknown>((resolve) => resolve(token));
    }

    //QUERY

    @Get()
    public async testQuery(@Query('token') token: string): Promise<string> {
        return new Promise<string>((resolve) => resolve(token));
    }

    @Get()
    public async testQueryValidateSchema1(@Query('token', { validateSchema: Joi.object({ token: Joi.string() }) }) token: string): Promise<string> {
        return new Promise<string>((resolve) => resolve(token));
    }

    @Get()
    public async testQueryAllParams(@Query({ validateSchema: Joi.object({ token: Joi.string() }) }) token: unknown): Promise<unknown> {
        return new Promise<unknown>((resolve) => resolve(token));
    }
    @Get()
    public async testQueryAllowAitional(@Query({ validateSchema: Joi.object({ token: Joi.string() }), allowAditionalProperties: true }) token: unknown): Promise<unknown> {
        return new Promise<unknown>((resolve) => resolve(token));
    }

    @Auth()
    public async testAuth(): Promise<string> {
        return new Promise<string>((resolve) => resolve('ok'));
    }
}
