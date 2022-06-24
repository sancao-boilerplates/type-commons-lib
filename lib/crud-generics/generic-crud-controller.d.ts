import { GenericCrudLogc } from './generic-crud-logic';
import { PaginationDto } from '../utils';
export declare abstract class GenericCrudController<T> {
    protected logic: GenericCrudLogc<T>;
    constructor(logic: GenericCrudLogc<T>);
    create(body: T): Promise<void>;
    getAll(query: PaginationDto<T, string>): Promise<PaginationDto<T, string>>;
    getById(id: string): Promise<T>;
    update(id: string, body: T): Promise<T>;
    delete(id: string): Promise<void>;
}
