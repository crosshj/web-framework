const { DateTime } = require('./parseDates');

const timeZone = 'America/New_York';

describe('parse dates', () => {
	it('global datetime to local', () => {
		const globalDateString = '2014-06-25T10:00:00.000Z';
		const result = new DateTime(globalDateString, timeZone);
		expect(result.toGlobal()).toBe('2014-06-25T10:00:00.000Z');
		expect(result.toLocal()).toBe('2014-06-25T06:00');
	});
	it('global Date to local', () => {
		const globalDate = new Date('2014-06-25T10:00:00.000Z');
		const result = new DateTime(globalDate, timeZone);
		expect(result.toGlobal()).toBe('2014-06-25T10:00:00.000Z');
		expect(result.toLocal()).toBe('2014-06-25T06:00');
	});

	it('local datetime to global', () => {
		const localDateString = '2014-06-25T06:00';
		const result = new DateTime(localDateString, timeZone);
		expect(result.toGlobal()).toBe('2014-06-25T10:00:00.000Z');
		expect(result.toLocal()).toBe('2014-06-25T06:00');
	});
	it('local Date to global', () => {
		const localDate = new Date('2014-06-25T06:00');
		const result = new DateTime(localDate, timeZone);
		expect(result.toGlobal()).toBe('2014-06-25T10:00:00.000Z');
		expect(result.toLocal()).toBe('2014-06-25T06:00');
	});

	it('local month to global', () => {
		const localDateString = '2014-06';
		const result = new DateTime(localDateString, timeZone);
		//not ideal, would prefer 2014-06-01T00:00:00.000Z
		expect(result.toGlobal()).toBe('2014-06-01T04:00:00.000Z');
		expect(result.toLocal()).toBe('2014-06-01T00:00');
	});
	it('local date (not datetime) to global', () => {
		const localDateString = '2014-06-25';
		const result = new DateTime(localDateString, timeZone);
		//not ideal, would prefer 2014-06-25T00:00:00.000Z
		expect(result.toGlobal()).toBe('2014-06-25T04:00:00.000Z');
		expect(result.toLocal()).toBe('2014-06-25T00:00');
	});

	it.todo('week ?');
	it.todo('time (only) ?');
});
