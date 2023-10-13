import { format, zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';

export class DateTime {
	constructor(dateSrc, timeZoneSrc) {
		//https://stackoverflow.com/questions/1091372/getting-the-clients-time-zone-and-offset-in-javascript
		const { timeZone } =
			typeof timeZoneSrc !== 'undefined'
				? { timeZone: timeZoneSrc }
				: undefined; // trust date-fns-tz to guess?
		//      : Intl.DateTimeFormat().resolvedOptions(); //works in 95% of browsers?
		this.tz = timeZone;
		this.date = this.parseDate(dateSrc);
	}
	parseDate(dateIn) {
		if (dateIn?.endsWith && dateIn.endsWith('Z')) {
			return dateIn;
		}
		const utcDate = zonedTimeToUtc(dateIn, this.tz);
		return utcDate.toISOString();
	}
	toGlobal() {
		return this.date;
	}
	toLocal() {
		const date = utcToZonedTime(this.date, this.tz);
		return format(new Date(date), "yyyy-MM-dd'T'HH:mm");
	}
}
