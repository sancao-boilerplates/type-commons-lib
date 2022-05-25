import { AxiosRequestHeaders } from 'axios';

export interface ServiceOptions {
    /**
     *  Base service URL
     */
    baseUrl?: string;
    /**
     * The service timeout in miliseconds
     * Default: 10 seconds (10000)
     */
    timeout?: number;
    /**
     * The default service timeout in seconds
     */
    headers?: AxiosRequestHeaders;
    /**
     * The Class responsible for Logging
     */
    logger?: object;
}
