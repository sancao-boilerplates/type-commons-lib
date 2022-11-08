import { log, Logger } from 'node-smart-log';
import { AuthSession } from '../auth-decorator';
import { HttpService } from '../service';
import { ServiceOptions } from '../service/service-options';
import { PaginationDto } from '../utils/pagination-dto';

export abstract class GenericCrudService<T> extends HttpService {
    resource: string;
    constructor(resource: string, options?: ServiceOptions) {
        super(options);
        this.resource = resource;
    }
    private setAuthHeader() {
        if (AuthSession.getToken()) {
            const config = this.getRequestConfig();
            config.headers = config.headers ?? {};
            config.headers['Authorization'] = AuthSession.getToken();
            this.setRequestConfig(config);
            Logger.info('Token added to request header');
        }
    }
    @log()
    async create(t: T): Promise<T> {
        this.setAuthHeader();
        return await this.post(this.resource, t as unknown as object);
    }

    @log()
    async getAll<F>(pagination: PaginationDto<T, F>): Promise<PaginationDto<T, F>> {
        this.setAuthHeader();
        const query = this.getQuery(pagination);
        const url = `${this.resource}${query}`;
        return this.get(url);
    }

    @log()
    async getById(id: string): Promise<T> {
        this.setAuthHeader();
        const url = `${this.resource}/${id}`;
        return this.get(url);
    }

    @log()
    async update(id: string, toUpdate: T): Promise<T> {
        this.setAuthHeader();
        const url = `${this.resource}/${id}`;
        return this.patch(url, toUpdate as unknown as Object);
    }

    @log()
    async deleteById(id: string): Promise<void> {
        this.setAuthHeader();
        const url = `${this.resource}/${id}`;
        return this.delete(url);
    }

    @log()
    private getQuery<F>(pagination: PaginationDto<T, F>): string {
        let query = '';
        if (!pagination) return query;
        pagination = pagination.filter ? pagination.filter : pagination;
        if (pagination.skip) {
            query = `?skip=${pagination.skip}`;
        }
        if (pagination.offSet) {
            query = query ? `${query}&offSet=${pagination.offSet}` : `?offSet=${pagination.offSet}`;
        }
        Object.keys(pagination).forEach((k) => {
            if (k == 'total' || k == 'skip' || k == 'offSet' || k == 'data') return;
            if (!query) {
                query = `?${k}=${pagination[k]}`;
            } else {
                query = `${query}&${k}=${pagination[k]}`;
            }
        });
        Logger.debug('get by query', { query });
        return query;
    }
}
