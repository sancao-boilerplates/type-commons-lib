import { AxiosRequestConfig, Method } from 'axios';
import { RequestOptions } from './request-options';
export declare abstract class HttpClient {
    protected requestConfig: AxiosRequestConfig;
    protected executeRequest(method: Method, url: string, payload: any, requestConfig?: AxiosRequestConfig, requestOptions?: RequestOptions): Promise<any>;
    private getLogTrace;
    private generateRequestConfig;
    private reqLog;
    private handlePayload;
    private handlerError;
    private calclDuration;
}
