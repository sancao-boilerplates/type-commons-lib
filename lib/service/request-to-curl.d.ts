import { AxiosRequestConfig } from 'axios';
export declare class RequestToCurl {
    static convertToCurl(config: AxiosRequestConfig): string;
    private static getHeaders;
    private static getMethod;
    private static getBody;
    private static getUrl;
}
