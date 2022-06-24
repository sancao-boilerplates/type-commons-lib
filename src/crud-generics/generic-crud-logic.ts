import { log, Logger } from '../logger';
import { NotFoundError } from '../service/http-exceptions';
import { PaginationDto } from '../utils/pagination-dto';
import { GenericCrudService } from './generic-crud-service';

export abstract class GenericCrudLogc<T> {
    protected service: GenericCrudService<T>;

    constructor(service: GenericCrudService<T>) {
        this.service = service;
    }

    @log
    async create(t: T): Promise<T> {
        return await this.service.create(t);
    }

    @log
    async getAll<F>(pagination: PaginationDto<T, F>): Promise<PaginationDto<T, F>> {
        return this.service.getAll(pagination);
    }

    @log
    async getById(id: string): Promise<T> {
        try {
            const t = this.service.getById(id);
            if (!t) throw new NotFoundError(`Not found entity for id: ${id}`);
            return t;
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }

    @log
    async update(id: string, toUpdate: T): Promise<T> {
        return this.service.update(id, toUpdate);
    }

    @log
    async deleteById(id: string): Promise<void> {
        return this.service.deleteById(id);
    }
}
