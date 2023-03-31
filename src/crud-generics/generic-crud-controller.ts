import {
 Body, Delete, Get, Param, Patch, Post, Query,
} from 'node-http-serverless';

import { log, Logger } from 'node-smart-log';
import { GenericCrudLogc } from './generic-crud-logic';
import { PaginationDto } from '../utils';
import { PaginationSchema } from './schemas';

export abstract class GenericCrudController<T> {
    protected logic: GenericCrudLogc<T>;

    constructor(logic: GenericCrudLogc<T>) {
        this.logic = logic;
    }

    @Post()
    @log()
    async create(@Body() body: T): Promise<void> {
        try {
            await this.logic.create(body);
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }

    @Get()
    @log()
    async getAll(
        @Query({ validateSchema: PaginationSchema, allowAditionalProperties: true })
        query: PaginationDto<T, string>,
    ): Promise<PaginationDto<T, string>> {
        try {
            const result = await this.logic.getAll(query);
            return result;
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }

    @Get()
    @log()
    async getById(@Param('id') id: string): Promise<T> {
        try {
            const result = await this.logic.getById(id);
            return result;
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }

    @Patch()
    @log()
    async update(@Param('id') id: string, @Body() body: T): Promise<T> {
        try {
            const result = await this.logic.update(id, body);
            return result;
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }

    @Delete()
    async delete(@Param('id') id: string): Promise<void> {
        try {
            await this.logic.deleteById(id);
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }
}
