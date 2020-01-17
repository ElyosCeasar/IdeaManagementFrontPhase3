import { min } from "rxjs/operators";

export class DateTime {
    protected year: number;
    protected month: number;
    protected day: number;

    protected hour: number;
    protected minute: number;
    protected second: number;

    get invalid(): boolean { return this.year == -1 || this.month == -1 || this.day == -1 || this.hour == -1 || this.minute == -1 || this.second == -1; }
    get value(): string { return `${this.year * 10000 + this.month * 100 + this.day}${this.hour < 10 ? '0' : ''}${this.hour * 10000  + this.minute * 100 + this.second}`; }

    public constructor(year: number = -1, month: number = -1, day: number = -1, hour: number = -1, minute: number = -1, second: number = -1) {
        this.setYear(year);
        this.setMonth(month);
        this.setDay(day);
        this.setHour(hour);
        this.setMinute(minute);
        this.setSecond(second);
    }
    public setYear(year: number): DateTime { this.year = (year >= 0 ? year : -1); return this; }
    public setMonth(month: number): DateTime { this.month = (month >= 0 && month <= 12 ? month : -1); return this; }
    public setDay(day: number): DateTime { this.day = (day >= 0 && day <= 31 ? day : -1); return this; }

    public setHour(hour: number): DateTime { this.hour = (hour >= 0 && hour <= 23 ? hour : -1); return this; }
    public setMinute(minute: number): DateTime { this.minute = (minute >= 0 && minute <= 59 ? minute : -1); return this; }
    public setSecond(second: number): DateTime { this.second = (second >= 0 && second <= 59 ? second : -1); return this; }

    public getYear(): number { return this.year; }
    public getMonth(): number { return this.month; }
    public getDay(): number { return this.day; }

    public getHour(): number { return this.hour; }
    public getMinute(): number { return this.minute; }
    public getSecond(): number { return this.second; }

    public getStartDayOfMonth(): number { let date = this.clone().setDay(1).toDate(); return date.getDay(); }
    public getDayOfWeek(): number { return (this.getStartDayOfMonth() + this.day)%7; }

    public isLeapYear(): boolean { let year = this.toDate().getFullYear(); return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0); }

    public equalsDate(date: DateTime): boolean { return this.value.substr(0,8) == date.value.substr(0,8); }
    public equalsTime(date: DateTime): boolean { return this.value.substr(8,6) == date.value.substr(8,6); }
    public equals(date: DateTime): boolean { return this.value == date.value; }
    public smallerDate(date: DateTime): boolean { return this.value.substr(0,8) < date.value.substr(0,8); }
    public smallerTime(date: DateTime): boolean { return this.value.substr(8,6) < date.value.substr(8,6); }
    public smaller(date: DateTime): boolean { return this.value < date.value; }
    public greaterDate(date: DateTime): boolean { return this.value.substr(0,8) > date.value.substr(0,8); }
    public greaterTime(date: DateTime): boolean { return this.value.substr(8,6) > date.value.substr(8,6); }
    public greater(date: DateTime): boolean { return this.value > date.value; }

    public addSeconds(value: number): DateTime {
        let dif = this.second + value;
        let remain = Math.floor(dif % 60);
        let added = Math.floor(dif / 60);
        if(dif < 0) { this.second = remain + 60; }
        else this.second = remain;
        if(added != 0) this.addMinutes(added);
        return this;
    }
    public addMinutes(value: number): DateTime {
        let dif = this.minute + value;
        let remain = Math.floor(dif % 60);
        let added = Math.floor(dif / 60);
        if(dif < 0) { this.minute = remain + 60; }
        else this.minute = remain;
        if(added != 0) this.addHours(added);
        return this;
    }
    public addHours(value: number): DateTime {
        let dif = this.hour + value;
        let remain = Math.floor(dif % 24);
        let added = Math.floor(dif / 24);
        if(dif < 0) { this.hour = remain + 24; }
        else this.hour = remain;
        if(added != 0) this.addDays(added);
        return this;
    }
    public addDays(value: number): DateTime {
        let dif = this.day + value;
        let remain = Math.floor(dif % 31);
        let added = Math.floor(dif / 31);
        if(dif < 1) { this.day = remain + 31; if(dif >= 0) added--; }
        else this.day = remain;
        if(added != 0) this.addMonth(added);
        return this;
    }
    public addMonth(value: number): DateTime {
        let dif = this.month + value;
        let remain = Math.floor(dif % 12);
        let added = Math.floor(dif / 12);
        if(dif < 1) { this.month = remain + 12; if(dif >= 0) added--; }
        else this.month = remain;
        if(added != 0) this.addYear(added);
        return this;
    }
    public addYear(value: number): DateTime {
        this.year += value;
        return this;
    }

    public format(format: string = 'yyyy/MM/dd hh:mm:ss'): string { return DateTime.format(this, format); }
    public toDate(): Date { return DateTime.toDate(this); }
    public toJDate(): JDate { return DateTime.toJDate(this); }
    public clone(): DateTime { return new DateTime(this.year,this.month,this.day,this.hour,this.minute,this.second); }

    protected static parseOnce(value: string, format: string, find: string): number {
        let index = format.indexOf(find);
        if (index > -1)
        {
            let sub = value.substring(index, index + find.length);
            if (sub) {
                let result = parseInt(sub);
                if(result + '' != 'NaN') return result;
                return -1;
            }
        }
        return 0;
    }
    public static parse(value: string, format: string = 'yyyy/MM/dd hh:mm:ss'): DateTime {
        if(value) 
        {
            return new DateTime(
                DateTime.parseOnce(value, format, 'yyyy'),
                DateTime.parseOnce(value, format, 'MM'),
                DateTime.parseOnce(value, format, 'dd'),
                DateTime.parseOnce(value, format, 'hh'),
                DateTime.parseOnce(value, format, 'mm'),
                DateTime.parseOnce(value, format, 'ss'),
            );
        }
        return new DateTime;
    }
    public static format(value: Date|DateTime|JDate, format: string = 'yyyy/MM/dd hh:mm:ss'): string {
        let year,month,day,hour,minute,second;
        if(value instanceof Date) {
            year = value.getFullYear();
            month = value.getMonth() + 1;
            day = value.getDate();
            hour = value.getHours();
            minute = value.getMinutes();
            second = value.getSeconds();
        } else {
            year = value.getYear();
            month = value.getMonth();
            day = value.getDay();
            hour = value.getHour();
            minute = value.getMinute();
            second = value.getSecond();
        }
        format = format.replace(/yyyy/g, year.toString());
        format = format.replace(/MM/g, (month < 10 ? '0' + month : month).toString());
        format = format.replace(/dd/g, (day < 10 ? '0' + day : day).toString());
        format = format.replace(/hh/g, (hour < 10 ? '0' + hour : hour).toString());
        format = format.replace(/mm/g, (minute < 10 ? '0' + minute : minute).toString());
        format = format.replace(/ss/g, (second < 10 ? '0' + second : second).toString());
        return format;
    }
    public static toDateTime(date: Date | JDate): DateTime {
        if(date instanceof Date) return new DateTime(date.getFullYear(),date.getMonth() + 1,date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds());
        else return new DateTime(date.getYear(),date.getMonth(),date.getDay(),date.getHour(),date.getMinute(),date.getSecond());
    }
    public static toDate(date: DateTime): Date {        
        let year = date.getYear();
        let month = date.getMonth();
        let day = date.getDay();

        var tday = month * 100 + day;
        year += (tday <= 1010 ? 621 : 622);
        if (tday <= 111) { month = 3; day += 20; }
        else if (tday <= 131) { month = 4; day -= 11; }
        else if (tday <= 210) { month = 4; day += 20; }
        else if (tday <= 231) { month = 5; day -= 10; }
        else if (tday <= 310) { month = 5; day += 21; }
        else if (tday <= 331) { month = 6; day -= 10; }
        else if (tday <= 409) { month = 6; day += 21; }
        else if (tday <= 431) { month = 7; day -= 9; }
        else if (tday <= 509) { month = 7; day += 22; }
        else if (tday <= 531) { month = 8; day -= 9; }
        else if (tday <= 609) { month = 8; day += 22; }
        else if (tday <= 631) { month = 9; day -= 9; }
        else if (tday <= 708) { month = 9; day += 22; }
        else if (tday <= 730) { month = 10; day -= 8; }
        else if (tday <= 809) { month = 10; day += 22; }
        else if (tday <= 830) { month = 11; day -= 9; }
        else if (tday <= 909) { month = 11; day += 21; }
        else if (tday <= 930) { month = 12; day -= 9; }
        else if (tday <= 1010) { month = 12; day += 21; }
        else if (tday <= 1030) { month = 1; day -= 10; }
        else if (tday <= 1111) { month = 1; day += 20; }
        else if (tday <= 1130) { month = 2; day -= 11; }
        else if (tday <= 1209) { month = 2; day += 19; }
        else if (tday <= 1230) { month = 3; day -= 9; }
        return new Date(year, month - 1, day, date.hour, date.month, date.second);
    }
    public static toJDate(date: DateTime| Date): JDate {
        let year = 0,month = 0,day = 0,hour = 0,minute = 0,second = 0;
        if(date instanceof Date) {
            year = date.getFullYear();
            month = date.getMonth() + 1;
            day = date.getDate();
            hour = date.getHours();
            minute = date.getMinutes();
            second = date.getSeconds();
        } else {
            year = date.getYear();
            month = date.getMonth();
            day = date.getDay();
            hour = date.getHour();
            minute = date.getMinute();
            second = date.getSecond();
        }

        var tday = month * 100 + day;
        year -= (tday <= 320 ? 622 : 621);
        if (tday <= 120) { month = 10; day += 10; }
        else if (tday <= 131) { month = 11; day -= 20; }
        else if (tday <= 219) { month = 11; day += 11; }
        else if (tday <= 228) { month = 12; day -= 19; }
        else if (tday <= 320) { month = 12; day += 9; }
        else if (tday <= 331) { month = 1; day -= 20; }
        else if (tday <= 420) { month = 1; day += 11; }
        else if (tday <= 430) { month = 2; day -= 20; }
        else if (tday <= 521) { month = 2; day += 10; }
        else if (tday <= 531) { month = 3; day -= 21; }
        else if (tday <= 621) { month = 3; day += 10; }
        else if (tday <= 630) { month = 4; day -= 21; }
        else if (tday <= 722) { month = 4; day += 9; }
        else if (tday <= 731) { month = 5; day -= 22; }
        else if (tday <= 822) { month = 5; day += 9; }
        else if (tday <= 831) { month = 6; day -= 22; }
        else if (tday <= 922) { month = 6; day += 9; }
        else if (tday <= 930) { month = 7; day -= 22; }
        else if (tday <= 1022) { month = 7; day += 8; }
        else if (tday <= 1031) { month = 8; day -= 22; }
        else if (tday <= 1121) { month = 8; day += 9; }
        else if (tday <= 1130) { month = 9; day -= 21; }
        else if (tday <= 1221) { month = 9; day += 9; }
        else if (tday <= 1231) { month = 10; day -= 21; }
        
        return new JDate(year, month, day, hour, minute, second);
    }
    public static parseJDate(value: string, format: string = 'yyyy/MM/dd hh:mm:ss'): JDate {
        let date = this.parse(value,format);
        return new JDate(date.getYear(),date.getMonth(),date.getDay(),date.getHour(),date.getMinute(),date.getSecond());
    }
    public static parseDate(value: string, format: string = 'yyyy/MM/dd hh:mm:ss'): Date {
        let date = this.parse(value,format);
        return new Date(date.getYear(),date.getMonth() - 1,date.getDay(),date.getHour(),date.getMinute(),date.getSecond());
    }
    public static parseDateTime(value: string, format: string = 'yyyy/MM/dd hh:mm:ss'): DateTime {
        return DateTime.toDateTime(DateTime.parseDate(value,format));
    }

    public static get now(): DateTime { return DateTime.toDateTime(new Date()); }
}
export class JDate extends DateTime {
    private days: number[] = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30, 30]    
    
    public constructor(year: number = -1, month: number = -1, day: number = -1, hour: number = -1, minute: number = -1, second: number = -1) { super(year,month,day,hour,minute,second); }
    
    public getStartDayOfMonth(): number { let date = this.clone().setDay(2).toDate(); return date.getDay(); }
    public getDayOfWeek(): number { return (this.getStartDayOfMonth() + this.day)%7; }

    public addDays(value: number): DateTime {
        if (value < 0) {
            value *= -1;
            if (value > 365) { this.year -= Math.floor(value / 365); value = Math.floor(value % 365); }
            while (value > this.days[this.month - 1]) {
                value -= this.days[this.month - 1];
                this.addMonth(-1);
            }
            this.day -= value;
            if (this.day < 1) { this.addMonth(-1); this.day = this.days[this.month - 1] + this.day; }
        }
        else {
            if (value > 365) { this.year += Math.floor(value / 365); value = Math.floor(value % 365); }
            while (value > this.days[this.month - 1]) {
                value -= this.days[this.month - 1];
                this.addMonth(1);
                if (this.month > 12) { this.year++; this.month = 1; }
            }
            this.day += value;
            if (this.day > this.days[this.month - 1]) { this.day -= this.days[this.month - 1]; this.addMonth(1); }
        }
        return this;
    }

    public clone(): JDate { return new JDate(this.year,this.month,this.day,this.hour,this.minute,this.second); }
    
    public static get now(): JDate { return DateTime.toJDate(new Date()); }
}