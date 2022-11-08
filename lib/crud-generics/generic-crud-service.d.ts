import { HttpService } from '../service';
import { ServiceOptions } from '../service/service-options';
import { PaginationDto } from '../utils/pagination-dto';
export declare abstract class GenericCrudService<T> extends HttpService {
    resource: string;
    constructor(resource: string, options?: ServiceOptions);
    private setAuthHeader;
    create(t: T): Promise<T>;
    getAll<F>(pagination: PaginationDto<T, F>): Promise<PaginationDto<T, F>>;
    getById(id: string): Promise<T>;
    update(id: string, toUpdate: T): Promise<T>;
    deleteById(id: string): Promise<void>;
    private getQuery;
}
