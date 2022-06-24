import { PaginationDto } from '../utils/pagination-dto';
import { GenericCrudService } from './generic-crud-service';
export declare abstract class GenericCrudLogc<T> {
    protected service: GenericCrudService<T>;
    constructor(service: GenericCrudService<T>);
    create(t: T): Promise<T>;
    getAll<F>(pagination: PaginationDto<T, F>): Promise<PaginationDto<T, F>>;
    getById(id: string): Promise<T>;
    update(id: string, toUpdate: T): Promise<T>;
    deleteById(id: string): Promise<void>;
}
