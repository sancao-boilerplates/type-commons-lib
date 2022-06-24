import { Body, Delete, Get, Param, Patch, Post, Query } from '../request-decorator';

import { HttpStatusCode } from '../status-code';
import { log, Logger } from '../logger';
import { GenericCrudLogc } from './generic-crud-logic';
import { PaginationDto } from '../utils';
import { PaginationSchema } from './schemas';

export abstract class GenericController<T> {
    protected logic: GenericCrudLogc<T>;

    constructor(logic: GenericCrudLogc<T>) {
        this.logic = logic;
    }

    @Post(HttpStatusCode.CREATED)
    @log
    async create(@Body() body: T): Promise<void> {
        try {
            await this.logic.create(body);
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }

    @Get(HttpStatusCode.OK)
    @log
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

    @Get(HttpStatusCode.OK)
    @log
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
    @log
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
