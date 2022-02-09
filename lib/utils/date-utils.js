"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtils = void 0;
var moment = require("moment");
var unit_of_time_1 = require("./unit-of-time");
var constants_1 = require("../constants");
var DateUtils = /** @class */ (function () {
    function DateUtils() {
    }
    DateUtils.parseToMoment = function (source, format) {
        if (format === void 0) { format = constants_1.AppConstants.DEFAULT_DATE_FORMAT; }
        var date = moment(source, format);
        if (date.isValid()) {
            return date;
        }
        return date;
    };
    DateUtils.formatDate = function (source, format) {
        if (format === void 0) { format = constants_1.AppConstants.DEFAULT_DATE_FORMAT; }
        var date = DateUtils.parseToMoment(source, format);
        return date.format(format);
    };
    DateUtils.stringToDate = function (source, format) {
        if (format === void 0) { format = constants_1.AppConstants.DEFAULT_DATE_FORMAT; }
        var date = DateUtils.parseToMoment(source, format);
        return date.toDate();
    };
    DateUtils.datePlusTime = function (source, amount, unit, format) {
        if (format === void 0) { format = constants_1.AppConstants.DEFAULT_DATE_FORMAT; }
        var date = DateUtils.parseToMoment(source, format).add(amount, unit);
        return date.toDate();
    };
    DateUtils.nowPlusAsDate = function (amount, unit) {
        return DateUtils.now().add(amount, unit).toDate();
    };
    DateUtils.nowPlusAsString = function (amount, unit, format) {
        if (format === void 0) { format = constants_1.AppConstants.DEFAULT_DATE_FORMAT; }
        return DateUtils.formatDate(DateUtils.nowPlusAsDate(amount, unit), format);
    };
    DateUtils.nowAsDate = function () {
        return DateUtils.now().toDate();
    };
    DateUtils.now = function () {
        return moment().add(constants_1.AppConstants.GMT_TIME, unit_of_time_1.UnitOfTime.HOUR);
    };
    DateUtils.nowAsString = function (format) {
        if (format === void 0) { format = constants_1.AppConstants.DEFAULT_DATE_FORMAT; }
        return DateUtils.formatDate(DateUtils.nowAsDate(), format);
    };
    DateUtils.nowAsTime = function (amount, unit, format) {
        if (amount === void 0) { amount = 0; }
        if (unit === void 0) { unit = unit_of_time_1.UnitOfTime.HOUR; }
        if (format === void 0) { format = constants_1.AppConstants.DEFAULT_TIME_FORMAT; }
        var now = DateUtils.now().add(amount, unit).format(format);
        return now;
    };
    DateUtils.getDiffDaysFromNow = function (timestamp) {
        if (!timestamp) {
            return 0;
        }
        var diffDays = timestamp / (1000 * 3600 * 24);
        return diffDays;
    };
    DateUtils.getDiff = function (endTimeStamp, unitTime, startTimeStamp) {
        if (unitTime === void 0) { unitTime = unit_of_time_1.UnitOfTime.HOUR; }
        if (startTimeStamp === void 0) { startTimeStamp = DateUtils.now().unix(); }
        var end = moment.unix(endTimeStamp);
        var start = moment.unix(startTimeStamp);
        var duration = moment.duration(end.diff(start));
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
    };
    DateUtils.getDateList = function (start, end) {
        var startDate = DateUtils.parseToMoment(start);
        var endDate = DateUtils.parseToMoment(end);
        var list = [];
        while (startDate.isSameOrBefore(endDate)) {
            list.push({
                dayOdWeek: startDate.days(),
                date: DateUtils.formatDate(startDate.toDate()),
            });
            startDate = startDate.add(1, unit_of_time_1.UnitOfTime.DAY);
        }
        return list;
    };
    return DateUtils;
}());
exports.DateUtils = DateUtils;
