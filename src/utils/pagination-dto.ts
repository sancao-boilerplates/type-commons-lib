export interface PaginationDto<T, F> {
    offSet: number;
    skip: number;
    total: number;
    filter: F;
    data: Array<T>;
}
