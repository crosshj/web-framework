import { StateManager } from '../../state/state';
import {
	replaceTokens,
	fillPropsWithTokens,
	getIncludesProps,
	withNamespaced,
	fillTokenizableIndex,
} from './parseProperties';

describe('replace tokens', () => {
	it('when state undefined', () => {
		const result = replaceTokens(undefined, 'what happens here? {{prop}}');
		expect(result).toBe('what happens here? ');
	});
	it('should replace token with empty string when value not found', () => {
		const state = {};
		const result = replaceTokens(state, 'what happens here? {{prop}}');
		expect(result).toBe('what happens here? ');
	});
	it('should replace token with value when value found', () => {
		const state = { prop: 'foo' };
		const result = replaceTokens(state, 'what happens here? {{prop}}');
		expect(result).toBe('what happens here? foo');
	});
	it('should replace token with value when value found (2)', () => {
		const state = {
			prop: 'Results submitted with: {\n  "clientId": "15"\n}',
		};
		const result = replaceTokens(state, 'results: {{prop}}');
		expect(result).toBe(`results: ${state.prop}`);
	});
});

describe('fillPropsWithTokens', () => {
	it('nested: process flowArgs then global', () => {
		const path = 'global_list[flowArgs.index].foo';
		const states = {
			global: { list: [{ foo: 'bar' }] },
			flowArgs: { index: 0 },
		};
		const result = fillPropsWithTokens({ path }, states);
		expect(result).toEqual({ path: 'bar' });
	});
	it('nested, but only replace flowArgs', () => {
		const path = 'global_list[flowArgs.index].foo';
		const states = {
			flowArgs: { index: 0 },
		};
		const result = fillPropsWithTokens({ path }, states, ['flowArgs']);
		expect(result).toEqual({ path: 'global_list[0].foo' });
	});
	it('replace by array from flowArgs', () => {
		const data = 'flowArgs.newValue';
		const dataSources = {
			flowArgs: { newValue: [1, 2, 999] },
		};
		const result = fillPropsWithTokens({ data }, dataSources, ['flowArgs']);

		expect(result.data).toEqual([1, 2, 999]);
		expect(Object.keys(result)).toEqual(['data']);
		expect(Object.keys(result).length).toEqual(1);
	});

	it('replace by object from flowArgs', () => {
		const data = 'flowArgs.newValue';
		const dataSources = {
			flowArgs: { newValue: { a: 2, 5: 'c' } },
		};
		const result = fillPropsWithTokens({ data }, dataSources, ['flowArgs']);

		expect(result.data).toEqual({ a: 2, 5: 'c' });
		expect(Object.keys(result)).toEqual(['data']);
		expect(Object.keys(result).length).toEqual(1);
	});
});

describe('getIncludesProps', () => {
	it('should return whether props INCLUDES statement is true or false', () => {
		const result = getIncludesProps(
			{
				checked: '{{ global_selectedRows INCLUDES row_myID }}',
				prop1: 'shouldBeIgnored',
				prop2: null,
				prop3: undefined,
			},
			{
				global: {
					selectedRows: [1, 2],
				},
				row: {
					myID: 1,
				},
			},
		);

		expect(result).toEqual({ checked: true });
	});

	it('should return false if required data is missing (1)', () => {
		const result = getIncludesProps(
			{
				checked: '{{ global_SubStepsID INCLUDES row_myID }}',
			},
			{
				global: {
					SubStepsID: [10, 100, 1000],
				},
				// row undefined, not able to parse correctly
				row: undefined,
			},
		);

		expect(result).toEqual({ checked: false });
	});

	it('should return false if there there are missing data (2)', () => {
		const result = getIncludesProps(
			{
				checked: '{{ global_SubStepsID INCLUDES row_myID }}',
			},
			{
				// global is empty object without SubStepsID, not able to parse correctly
				global: {},
				row: {
					myID: 100,
				},
			},
		);

		expect(result).toEqual({ checked: false });
	});

	it('should return empty when providing empty props', () => {
		const result = getIncludesProps(
			{},
			{
				global: { something: 1 },
				row: {
					myID: 100,
				},
			},
		);

		expect(result).toEqual({});
	});

	it('should return empty when providing only props that dont have INCLUDES statement', () => {
		const result = getIncludesProps(
			{
				prop1: 'hasThisValue',
				prop2: 'another',
				prop3: 100,
				prop4: 'crazyFrog',
				michaelScott: 'qpw[epqw[e',
				dwight: 'null',
				index: null,
			},
			{
				global: { something: 1 },
				row: {
					myID: 100,
				},
			},
		);

		expect(result).toEqual({});
	});
});

describe('namespaced properties', () => {
	it('with sx:display', () => {
		const result = withNamespaced({
			'sx:display': 'none',
			justifyContent: 'center',
		});
		expect(result.sx).toEqual({ display: 'none' });
	});
	it('with sx:display & display', () => {
		const result = withNamespaced({
			'sx:display': 'none',
			display: 'flex',
		});
		expect(result.sx).toEqual({ display: 'none' });
		expect(result.display).toEqual('flex');
	});
	it('with sx:display & legacy sx prop (will override, but maintain others)', () => {
		const result = withNamespaced({
			sx: { display: 'flex', justifyContent: 'center' },
			'sx:display': 'none',
		});
		expect(result.sx).toEqual({
			display: 'none',
			justifyContent: 'center',
		});
	});
	it('with sx:display & legacy sx prop (will override, but maintain others) (2)', () => {
		const result = withNamespaced({
			'sx:display': 'none',
		});
		expect(result.sx).toEqual({
			display: 'none',
		});
	});
	it('with other data types', () => {
		const result = withNamespaced({
			'sx:display': 'none',
			checked: false,
			value: '1111222',
			false: 1,
			'myCrazyObject:prop1': true,
			'myCrazyObject:prop2': false,
		});
		expect(result).toEqual({
			sx: { display: 'none' },
			checked: false,
			value: '1111222',
			false: 1,
			myCrazyObject: { prop1: true, prop2: false },
		});
	});
});

describe('fillTokenizableIndex', () => {
	describe('should replace tokenizable index by values from data source', () => {
		it('with flowArgs', () => {
			const dataSource = {
				flowArgs: {
					index: 100,
				},
			};

			const filledPath = fillTokenizableIndex(
				'something[flowArgs.index]',
				dataSource,
			);

			expect(filledPath).toBe('something[100]');
		});

		it('with NESTED flowArgs', () => {
			const dataSource = {
				flowArgs: {
					obj: {
						crazyID: 911,
					},
				},
			};

			const filledPath = fillTokenizableIndex(
				'[flowArgs_obj.crazyID]',
				dataSource,
			);

			expect(filledPath).toBe('[911]');
		});

		it('with GLOBAL', () => {
			StateManager.init({
				version: 1,
				selectedID: 555,
			});

			const dataSource = {};

			const filledPath = fillTokenizableIndex(
				'anotherThing[global_selectedID]',
				dataSource,
			);

			expect(filledPath).toBe('anotherThing[555]');
		});

		it('with NESTED GLOBAL', () => {
			StateManager.init({
				version: 1,
				selectedRow: {
					anotherObj: {
						ID: 11111111,
					},
				},
			});

			const dataSource = {};

			const filledPath = fillTokenizableIndex(
				'[global_selectedRow.anotherObj.ID]',
				dataSource,
			);

			expect(filledPath).toBe('[11111111]');
		});
	});
});
