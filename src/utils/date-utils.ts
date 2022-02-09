import * as moment from 'moment';
import { UnitOfTime } from './unit-of-time';
import { AppConstants } from '../constants';

export class DateUtils {
    static parseToMoment(source: string | Date, format: string = AppConstants.DEFAULT_DATE_FORMAT): moment.Moment {
        const date = moment(source, format);
        if (date.isValid()) {
            return date;
        }
        return date;
    }

    static formatDate(source: string | Date, format: string = AppConstants.DEFAULT_DATE_FORMAT): string {
        const date = DateUtils.parseToMoment(source, format);
        return date.format(format);
    }

    static stringToDate(source: string, format: string = AppConstants.DEFAULT_DATE_FORMAT): Date {
        const date = DateUtils.parseToMoment(source, format);

        return date.toDate();
    }

    static datePlusTime(source: string | Date, amount: number, unit: UnitOfTime, format: string = AppConstants.DEFAULT_DATE_FORMAT): Date {
        const date = DateUtils.parseToMoment(source, format).add(amount, unit);

        return date.toDate();
    }

    static nowPlusAsDate(amount: number, unit: UnitOfTime): Date {
        return DateUtils.now().add(amount, unit).toDate();
    }

    static nowPlusAsString(amount: number, unit: UnitOfTime, format: string = AppConstants.DEFAULT_DATE_FORMAT): string {
        return DateUtils.formatDate(DateUtils.nowPlusAsDate(amount, unit), format);
    }

    static nowAsDate(): Date {
        return DateUtils.now().toDate();
    }

    static now(): moment.Moment {
        return moment().add(AppConstants.GMT_TIME, UnitOfTime.HOUR);
    }

    static nowAsString(format: string = AppConstants.DEFAULT_DATE_FORMAT): string {
        return DateUtils.formatDate(DateUtils.nowAsDate(), format);
    }

    static nowAsTime(amount = 0, unit: UnitOfTime = UnitOfTime.HOUR, format: string = AppConstants.DEFAULT_TIME_FORMAT): string {
        const now = DateUtils.now().add(amount, unit).format(format);
        return now;
    }

    static getDiffDaysFromNow(timestamp: number): number {
        if (!timestamp) {
            return 0;
        }
        const diffDays = timestamp / (1000 * 3600 * 24);
        return diffDays;
    }

    static getDiff(endTimeStamp: number, unitTime: UnitOfTime = UnitOfTime.HOUR, startTimeStamp: number = DateUtils.now().unix()): number {
        const end = moment.unix(endTimeStamp);
        const start = moment.unix(startTimeStamp);

        const duration = moment.duration(end.diff(start));

        switch (unitTime) {
        case UnitOfTime.MILISECONDS:
            return duration.asMilliseconds();
        case UnitOfTime.SECOND:
            return duration.asSeconds();
        case UnitOfTime.MINUTE:
            return duration.asMinutes();
        case UnitOfTime.DAY:
            return duration.asDays();
        case UnitOfTime.WEEK:
            return duration.asWeeks();
        case UnitOfTime.MONTH:
            return duration.asMonths();
        case UnitOfTime.YEAR:
            return duration.asYears();
        default:
            return duration.asHours();
        }
    }

    static getDateList(start: string, end: string): Array<{ date: string; dayOdWeek: number }> {
        let startDate = DateUtils.parseToMoment(start);
        const endDate = DateUtils.parseToMoment(end);
        const list: Array<{ date: string; dayOdWeek: number }> = [];
        while (startDate.isSameOrBefore(endDate)) {
            list.push({
                dayOdWeek: startDate.days(),
                date: DateUtils.formatDate(startDate.toDate()),
            });
            startDate = startDate.add(1, UnitOfTime.DAY);
        }

        return list;
    }
}
