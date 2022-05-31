import * as moment from 'moment';
import { UnitOfTime } from './unit-of-time';
export declare class DateUtils {
    static parseToMoment(source: string | Date, format?: string): moment.Moment;
    static formatDate(source: string | Date, format?: string): string;
    static stringToDate(source: string, format?: string): Date;
    static datePlusTime(source: string | Date, amount: number, unit: UnitOfTime, format?: string): Date;
    static nowPlusAsDate(amount: number, unit: UnitOfTime): Date;
    static nowPlusAsString(amount: number, unit: UnitOfTime, format?: string): string;
    static nowAsDate(): Date;
    static now(): moment.Moment;
    static nowAsString(format?: string): string;
    static nowAsTime(amount?: number, unit?: UnitOfTime, format?: string): string;
    static getDiffDaysFromNow(timestamp: number): number;
    static getDiff(endTimeStamp: number, unitTime?: UnitOfTime, startTimeStamp?: number): number;
    static getDateList(start: string, end: string): Array<{
        date: string;
        dayOdWeek: number;
    }>;
    static compare(start: string, end: string): number;
}
