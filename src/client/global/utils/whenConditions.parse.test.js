import { whenParser } from './whenConditions';

describe('when Condition parser (syntax)', () => {
	/*
		each test ran in for loop after this array
		each test is defined as:
		[
			string to parse,
			expected results from parse
		]
	*/
	const tests = [
		[
			'DEBUG   WHEN childDedsCreateDedMethodSelected IS 1 THEN flex ELSE none',
			{
				debug: true,
				when: 'childDedsCreateDedMethodSelected',
				is: '1',
				then: 'flex',
				else: 'none',
			},
		],
		/* 	[
			'DEBUG   WHEN         showEducation    IS    true THEN true ELSE skip',
			{
				debug: true,
				when: 'showEducation',
				is: "true",
				then: "true",
				else: 'skip',
			},
		], */
		[
			'WHEN someVarName IS booleanValue THEN booleanValue ELSE someString',
			{
				debug: false,
				when: 'someVarName',
				is: 'booleanValue',
				then: 'booleanValue',
				else: 'someString',
			},
		],
		[
			'DEBUG WHEN anotherVar IS someOtherString THEN 13',
			{
				debug: true,
				when: 'anotherVar',
				is: 'someOtherString',
				then: '13',
			},
		],
		[
			'WHEN noElseVar IS true THEN true',
			{
				debug: false,
				when: 'noElseVar',
				is: 'true',
				then: 'true',
				else: undefined,
			},
		],
		[
			'DEBUG WHEN noThenElseVar IS cool',
			{
				debug: true,
				when: 'noThenElseVar',
				is: 'cool',
				then: undefined,
				else: undefined,
			},
		],
		[
			'WHEN noIsThenElseVar',
			{
				debug: false,
				when: 'noIsThenElseVar',
				is: undefined,
				then: undefined,
				else: undefined,
			},
		],
		[
			'WHEN noIsVar THEN foo ELSE bar',
			{
				debug: false,
				when: 'noIsVar',
				then: 'foo',
				else: 'bar',
				is: undefined,
			},
		],
		[
			'WHEN noIsElseVar THEN bar',
			{
				debug: false,
				when: 'noIsElseVar',
				then: 'bar',
				is: undefined,
				else: undefined,
			},
		],
		[
			'WHEN noIsThenVar ELSE bar',
			{
				debug: false,
				when: 'noIsThenVar',
				is: undefined,
				then: undefined,
				else: 'bar',
			},
		],
		[
			'       WHEN     showEducation         ',
			{
				debug: false,
				when: 'showEducation',
				is: undefined,
				then: undefined,
				else: undefined,
			},
		],
		[
			'DEBUG WHEN anotherVarForParseTrue IS true THEN TrueGotParsed',
			{
				debug: true,
				when: 'anotherVarForParseTrue',
				is: 'true',
				then: 'TrueGotParsed',
			},
		],
		[
			'DEBUG WHEN anotherVarForParseTrue IS true THEN TrueGotParsed',
			{
				debug: true,
				when: 'anotherVarForParseTrue',
				is: 'true',
				then: 'TrueGotParsed',
			},
		],
		[
			'DEBUG WHEN anotherVarForParseFalse IS false THEN FalseGotParsed',
			{
				debug: true,
				when: 'anotherVarForParseFalse',
				is: 'false',
				then: 'FalseGotParsed',
			},
		],
		[
			'DEBUG WHEN anotherVarForParseFalse IS false THEN FalseGotParsed',
			{
				debug: true,
				when: 'anotherVarForParseFalse',
				is: 'false',
				then: 'FalseGotParsed',
			},
		],
		[
			'WHEN dotVar.child THEN value1 ELSE value2',
			{
				debug: false,
				when: 'dotVar.child',
				is: undefined,
				then: 'value1',
				else: 'value2',
			},
		],
		[
			'WHEN deep.0.nested IS 0 THEN flex ELSE none',
			{
				debug: false,
				when: 'deep.0.nested',
				is: '0',
				then: 'flex',
				else: 'none',
			},
		],
		[
			'WHEN global_simple IS "Lorem ipsum" THEN true ELSE false',
			{
				debug: false,
				when: 'global_simple',
				is: 'Lorem ipsum',
				then: 'true',
				else: 'false',
			},
		],
	];

	//use this to isolate one of the cases above
	// it.only('parse: isolated case', () => {
	// 	const inputString = 'WHEN noIsThenVar ELSE bar'; // <<< your search string
	// 	const [when, then] = tests.find((x) => x[0].includes(inputString));
	// 	const parsed = whenParser(when);
	// 	expect(parsed).toEqual(then);
	// });

	for (const [when, then] of tests) {
		it(`parse: "${when}"`, () => {
			expect(whenParser(when)).toEqual(then);
		});
	}
});

describe('when Condition parser: (syntax) - AND/OR/NOT', () => {
	it('parse: AND', () => {
		const when = `WHEN x IS y AND a IS b THEN aa ELSE bb`;
		const then = {
			debug: false,
			and: [
				{
					when: 'x',
					is: 'y',
				},
				{
					when: 'a',
					is: 'b',
				},
			],
			then: 'aa',
			else: 'bb',
		};
		const parsed = whenParser(when);
		expect(parsed).toEqual(then);
	});

	it('parse: AND (multiple)', () => {
		const when = `WHEN x IS y AND a IS b AND c IS d THEN aa ELSE bb`;
		const then = {
			debug: false,
			and: [
				{
					when: 'x',
					is: 'y',
				},
				{
					when: 'a',
					is: 'b',
				},
				{
					when: 'c',
					is: 'd',
				},
			],
			then: 'aa',
			else: 'bb',
		};
		const parsed = whenParser(when);
		expect(parsed).toEqual(then);
	});
	it('parse: OR', () => {
		const when = `WHEN x IS y OR a IS b THEN aa ELSE bb`;
		const then = {
			debug: false,
			or: [
				{
					when: 'x',
					is: 'y',
				},
				{
					when: 'a',
					is: 'b',
				},
			],
			then: 'aa',
			else: 'bb',
		};
		const parsed = whenParser(when);
		expect(parsed).toEqual(then);
	});

	it('parse: OR (multiple)', () => {
		const when = `WHEN x IS y OR a IS b OR c IS d THEN aa ELSE bb`;
		const then = {
			debug: false,
			or: [
				{
					when: 'x',
					is: 'y',
				},
				{
					when: 'a',
					is: 'b',
				},
				{
					when: 'c',
					is: 'd',
				},
			],
			then: 'aa',
			else: 'bb',
		};
		const parsed = whenParser(when);
		expect(parsed).toEqual(then);
	});

	it('parse: IS NOT', () => {
		const when = `WHEN x IS NOT y THEN aa ELSE bb`;
		const then = {
			debug: false,
			when: 'x',
			isnot: 'y',
			then: 'aa',
			else: 'bb',
		};
		const parsed = whenParser(when);
		expect(parsed).toEqual(then);
	});

	it('parse: IS / IS NOT + ANDs', () => {
		const when = `WHEN x IS NOT y AND a IS NOT b THEN aa ELSE bb`;
		const then = {
			debug: false,
			and: [
				{
					when: 'x',
					isnot: 'y',
				},
				{
					when: 'a',
					isnot: 'b',
				},
			],
			then: 'aa',
			else: 'bb',
		};
		const parsed = whenParser(when);
		expect(parsed).toEqual(then);
	});
});
