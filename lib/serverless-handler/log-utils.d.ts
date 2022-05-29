import { EventLog, RequestLog, ResponseLog } from './types';
export declare class LogUtils {
    static doLog(log: RequestLog | EventLog | ResponseLog): void;
}
