"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtils = void 0;
const moment = require("moment");
const unit_of_time_1 = require("./unit-of-time");
const constants_1 = require("../constants");
class DateUtils {
    static parseToMoment(source, format = constants_1.AppConstants.DEFAULT_DATE_FORMAT) {
        const date = moment(source, format);
        if (date.isValid()) {
            return date;
        }
        return date;
    }
    static formatDate(source, format = constants_1.AppConstants.DEFAULT_DATE_FORMAT) {
        const date = DateUtils.parseToMoment(source, format);
        return date.format(format);
    }
    static stringToDate(source, format = constants_1.AppConstants.DEFAULT_DATE_FORMAT) {
        const date = DateUtils.parseToMoment(source, format);
        return date.toDate();
    }
    static datePlusTime(source, amount, unit, format = constants_1.AppConstants.DEFAULT_DATE_FORMAT) {
        const date = DateUtils.parseToMoment(source, format).add(amount, unit);
        return date.toDate();
    }
    static nowPlusAsDate(amount, unit) {
        return DateUtils.now().add(amount, unit).toDate();
    }
    static nowPlusAsString(amount, unit, format = constants_1.AppConstants.DEFAULT_DATE_FORMAT) {
        return DateUtils.formatDate(DateUtils.nowPlusAsDate(amount, unit), format);
    }
    static nowAsDate() {
        return DateUtils.now().toDate();
    }
    static now() {
        return moment().add(constants_1.AppConstants.GMT_TIME, unit_of_time_1.UnitOfTime.HOUR);
    }
    static nowAsString(format = constants_1.AppConstants.DEFAULT_DATE_FORMAT) {
        return DateUtils.formatDate(DateUtils.nowAsDate(), format);
    }
    static nowAsTime(amount = 0, unit = unit_of_time_1.UnitOfTime.HOUR, format = constants_1.AppConstants.DEFAULT_TIME_FORMAT) {
        const now = DateUtils.now().add(amount, unit).format(format);
        return now;
    }
    static getDiffDaysFromNow(timestamp) {
        if (!timestamp) {
            return 0;
        }
        const diffDays = timestamp / (1000 * 3600 * 24);
        return diffDays;
    }
    static getDiff(endTimeStamp, unitTime = unit_of_time_1.UnitOfTime.HOUR, startTimeStamp = DateUtils.now().unix()) {
        const end = moment.unix(endTimeStamp);
        const start = moment.unix(startTimeStamp);
        const duration = moment.duration(end.diff(start));
        switch (unitTime) {
            case unit_of_time_1.UnitOfTime.MILISECONDS:
                return duration.asMilliseconds();
            case unit_of_time_1.UnitOfTime.SECOND:
                return duration.asSeconds();
            case unit_of_time_1.UnitOfTime.MINUTE:
                return duration.asMinutes();
            case unit_of_time_1.UnitOfTime.DAY:
                return duration.asDays();
            case unit_of_time_1.UnitOfTime.WEEK:
                return duration.asWeeks();
            case unit_of_time_1.UnitOfTime.MONTH:
                return duration.asMonths();
            case unit_of_time_1.UnitOfTime.YEAR:
                return duration.asYears();
            default:
                return duration.asHours();
        }
    }
    static getDateList(start, end) {
        let startDate = DateUtils.parseToMoment(start);
        const endDate = DateUtils.parseToMoment(end);
        const list = [];
        while (startDate.isSameOrBefore(endDate)) {
            list.push({
                dayOdWeek: startDate.days(),
                date: DateUtils.formatDate(startDate.toDate()),
            });
            startDate = startDate.add(1, unit_of_time_1.UnitOfTime.DAY);
        }
        return list;
    }
}
exports.DateUtils = DateUtils;
