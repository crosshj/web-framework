import { whenParser, whenRunner } from './whenConditions';

describe('when Condition runner', () => {
	/* standard syntax:
		'WHEN w IS x THEN y ELSE z'
	*/
	it('returns "shown" for showEducation when true', () => {
		const state = { showEducation: true };
		const statement =
			'DEBUG WHEN showEducation IS true THEN shown ELSE hidden';
		const logger = jest.fn();
		const result = whenRunner(statement, state, logger);
		expect(result).toEqual('shown');
	});
	it('returns "hidden" for showEducation when false', () => {
		const state = { showEducation: false };
		const statement = 'WHEN showEducation IS true THEN shown ELSE hidden';
		const result = whenRunner(statement, state);
		expect(result).toEqual('hidden');
	});

	/* shorter syntax:
		'WHEN x THEN shown ELSE hidden'
		equivalent to
		'WHEN x IS true THEN shown ELSE hidden'
	*/
	it('returns "shown" for showEducation when true (shorter)', () => {
		const state = { showEducation: true };
		const statement = 'WHEN showEducation THEN shown ELSE hidden';
		const result = whenRunner(statement, state);
		expect(result).toEqual('shown');
	});
	it('returns "hidden" for showEducation when true (shorter)', () => {
		const state = { showEducation: false };
		const statement = 'WHEN showEducation THEN shown ELSE hidden';
		const result = whenRunner(statement, state);
		expect(result).toEqual('hidden');
	});

	/* even shorter syntax:
		'WHEN x'
		equivalent to
		'WHEN x THEN true ELSE false'
	*/
	it('returns true for showEducation when true (shorter - just boolean)', () => {
		const state = { showEducation: 'TRUE' };
		const statement = 'WHEN showEducation';
		const result = whenRunner(statement, state);
		expect(result).toEqual(true);
	});
	it('returns false for showEducation when false/undefined (shorter - just boolean)', () => {
		const state = { showEducation: 'FALSE' };
		const statement = 'WHEN showEducation';
		const result = whenRunner(statement, state);
		expect(result).toEqual(false);
	});

	/* errors */
	it('no WHEN statement', () => {
		const state = { showEducation: true };
		const statement = '';
		const logger = jest.fn();
		const result = whenRunner(statement, state, logger);
		expect(result).toEqual(undefined);
	});
	it('WHEN statement missing specifier', () => {
		const state = { showEducation: true };
		const statement = 'WHEN';
		const logger = jest.fn();
		const result = whenRunner(statement, state, logger);
		expect(result).toEqual(undefined);
	});

	/* debug helper */
	it('logs everything, successful case', () => {
		const state = { showEducation: 'hello' };
		const statement = 'DEBUG WHEN showEducation';
		const logger = jest.fn();
		whenRunner(statement, state, logger);
		expect(logger).toHaveBeenCalledWith({
			message: 'When runner for: "DEBUG WHEN showEducation"',
			state,
			theResult: true,
			conditions: {
				debug: true,
				else: undefined,
				is: undefined,
				then: undefined,

				// here the "when prop", which is "showEducation", as already replaced by the value from state
				when: 'hello',
			},
		});
	});
	it('logs everything, error case', () => {
		const state = { showEducation: 'hello' };
		const statement = 'foo';
		const logger = jest.fn();
		whenRunner(statement, state, logger);
		expect(logger).toHaveBeenCalledWith({
			error: 'Problem parsing when statement: "foo"',
		});
	});

	/* nested */
	it('can parse nested state values', () => {
		const state = { nested: { child: true } };
		const statement = 'WHEN nested.child THEN string1 ELSE string2';
		const result = whenRunner(statement, state);
		expect(result).toEqual('string1');
	});
	it('can parse nested state values, with embedded array', () => {
		const state = { nested: { child: [{ value: false }] } };
		const statement =
			'WHEN nested.child.0.value IS 0 THEN string1 ELSE string2';
		const result = whenRunner(statement, state);
		expect(result).toEqual('string1');
	});

	it('supports values with string literals in "" with delimiters', () => {
		const state = {
			childDedsCreateDedMethodSelected: 'hi there',
		};
		const statement =
			'WHEN childDedsCreateDedMethodSelected IS "hi there" THEN flex ELSE none';
		const result = whenRunner(statement, state);
		expect(result).toEqual('flex');
	});
	it("supports values with string literals in '' with delimiters", () => {
		const state = {
			childDedsCreateDedMethodSelected: 'hi there',
		};
		const statement =
			"WHEN childDedsCreateDedMethodSelected IS 'hi there' THEN flex ELSE none";
		const result = whenRunner(statement, state);
		expect(result).toEqual('flex');
	});

	it('supports prop without suffix (assuming global_)', () => {
		const state = {
			global: {
				childDedsCreateDedMethodSelected: 'hi there',
				here: 0,
			},
			there: 1,
		};
		const statement =
			"WHEN childDedsCreateDedMethodSelected IS 'hi there' THEN 'hyaaaaa' ELSE 'nahhh i dont care'";
		const result = whenRunner(statement, state);
		expect(result).toEqual('hyaaaaa');
	});

	it('supports prop without suffix (assuming global_) - inversed', () => {
		const state = {
			global: {
				childDedsCreateDedMethodSelected:
					'i dont have anything to say to you',
			},
			other: {
				shouldBeIgnored: 1,
			},
			shouldBeIgnored50: 1,
		};
		const statement =
			"WHEN childDedsCreateDedMethodSelected IS 'hi there' THEN 'hyaaaaa' ELSE 'nahhh i dont care'";
		const result = whenRunner(statement, state);
		expect(result).toEqual('nahhh i dont care');
	});

	it('supports prop without suffix (assuming global_) - NESTED', () => {
		const state = {
			global: {
				colors: {
					green: true,
					blue: 'false',
				},
			},
			row: {
				colors: {
					green: null,
					blue: null,
				},
				5: 5,
			},
			other: {
				shouldBeIgnored: 1,
			},
			shouldBeIgnored50: 1,
		};
		const statement = 'WHEN colors.green IS true THEN flex ELSE none';
		const result = whenRunner(statement, state);
		expect(result).toEqual('flex');
	});

	it('supports prop without suffix (assuming global_) - NESTED (2)', () => {
		const state = {
			global: {
				colors: {
					primary: {
						green: true,
						blue: 'true',
						red: true,
						orange: false,
					},
				},
			},
			other: {
				shouldBeIgnored: 1,
			},
			shouldBeIgnored50: 1,
		};
		const statement =
			'WHEN colors.primary.blue IS "true" THEN flex ELSE none';
		const result = whenRunner(statement, state);
		expect(result).toEqual('flex');
	});

	it('supports prop without suffix (assuming global_) - NESTED (2) - inversed', () => {
		const state = {
			global: {
				colors: {
					primary: {
						green: true,
						blue: 'false',
						red: true,
						orange: false,
					},
				},
				hey: 1,
			},
			other: {
				shouldBeIgnored: 1,
			},
			shouldBeIgnored50: 1,
		};
		const statement =
			'WHEN colors.primary.blue IS true THEN flex ELSE none';
		const result = whenRunner(statement, state);
		expect(result).toEqual('none');
	});

	it('support custom suffixes and states', () => {
		const state = {
			global: {
				blue: false,
			},
			row: {
				blue: 'true',
			},
		};
		const statement = 'WHEN row_blue IS true THEN flex ELSE none';
		const result = whenRunner(statement, state);
		expect(result).toEqual('flex');
	});

	it('support nested custom suffixes and states', () => {
		const state = {
			global: {
				favoriteShow: {
					theOffice: false,
				},
			},
			row: {
				favoriteShow: {
					theOffice: {
						sometimes: true,
					},
				},
			},
		};
		const statement =
			"WHEN row_favoriteShow.theOffice.sometimes IS true THEN 'it is your birthday' ELSE 'keep quiet'";
		const result = whenRunner(statement, state);
		expect(result).toEqual('it is your birthday');
	});

	//Consider global_test2 as a solution
	it('supports values with property names', () => {
		const state = {
			global: {
				test1: '1',
				test2: '1',
			},
			row: {
				status: '1',
			},
		};
		// const statement = 'WHEN global_test1 IS row_status'; // shall return true
		const statement = 'WHEN global_test1 IS global_test2';
		const result = whenRunner(statement, state);
		expect(result).toEqual(true);
	});

	it('supports values with source_value pattern', () => {
		const state = {
			global: {
				a: '1',
				b: '2',
			},
			row: {
				a: '3',
			},
		};
		const wExpect = (statement, expected) =>
			expect(whenRunner(statement, state)).toEqual(expected);

		wExpect('WHEN global_a IS "foo" THEN "bar" ELSE "baz"', 'baz');
		wExpect('WHEN global_a IS row_a THEN "bar" ELSE "bear"', 'bear');
		wExpect('WHEN row_b IS undefined THEN global_a ELSE global_b', '1');
		wExpect('WHEN global_a IS global_a THEN global_a ELSE row_a', '1');
		wExpect('WHEN global_a IS global_b THEN global_a ELSE row_a', '3');
		wExpect('WHEN row_editing IS undefined THEN block ELSE none', 'block');
	});

	it('supports AND/OR and IS NOT', () => {
		const state = {
			global: {
				a: '1',
				b: '2',
			},
			row: {
				a: '3',
			},
		};
		const wExpect = (statement, expected) =>
			expect(whenRunner(statement, state)).toEqual(expected);

		//AND
		wExpect('WHEN global_a IS 1 AND global_b IS 2 THEN ok ELSE no', 'ok');
		wExpect('WHEN false AND true THEN ok ELSE no', 'no');
		wExpect('WHEN true AND true THEN ok ELSE no', 'ok');
		//OR
		wExpect('WHEN false OR true IS true THEN ok ELSE no', 'ok');
		wExpect('WHEN false OR true IS false THEN ok ELSE no', 'no');
		//IS NOT
		wExpect('WHEN true IS NOT false THEN ok ELSE no', 'ok');
		wExpect('WHEN true IS NOT true THEN ok ELSE no', 'no');

		//AND + IS + IS NOT
		wExpect(
			'WHEN true IS true AND true IS NOT false THEN ok ELSE no',
			'ok',
		);
		wExpect(
			'WHEN true IS NOT true AND true IS NOT false THEN ok ELSE no',
			'no',
		);

		//OR + IS + IS NOT
		wExpect('WHEN true IS true OR true IS NOT true THEN ok ELSE no', 'ok');
		wExpect(
			'WHEN true IS NOT true OR true IS NOT false THEN ok ELSE no',
			'ok',
		);
	});
});
