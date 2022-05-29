import { RequestLog } from './request-log';

export interface ResponseLog extends RequestLog {
    duration: string;
    statusCode: number;
}
