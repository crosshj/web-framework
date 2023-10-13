const { StateManager } = require('../../../../state/state');
const { getFirstValidValue, process } = require('./SetData');

describe('Query.SetData', () => {
	beforeEach(() => {
		StateManager.init({
			version: 1,
		});
	});

	describe('getFirstValidValue', () => {
		describe('should return first valid value based on order of provided dataPaths', () => {
			it('simple case providing one single data path', () => {
				const sources = {
					flowArgs: {
						myID: 59,
					},
				};

				const dataPaths = 'flowArgs.myID';

				const value = getFirstValidValue(dataPaths, sources);

				expect(value).toBe(59);
			});

			it('simple case with TWO data paths', () => {
				const sources = {
					flowArgs: {
						index: 1000,
					},
					global: {
						basic: '9999',
					},
				};

				const dataPaths = 'global_basic, flowArgs.index';

				const value = getFirstValidValue(dataPaths, sources);

				// first it gets "global_basic"
				expect(value).toBe('9999');

				delete sources.global.basic;
				expect(sources.global).toEqual({});

				const newValue = getFirstValidValue(dataPaths, sources);

				expect(newValue).toBe(1000);
			});

			it('simple case with TWO data paths - INVERSED', () => {
				const sources = {
					flowArgs: {
						index: 1000,
					},
					global: {
						basic: '9999',
					},
				};

				const dataPaths = 'flowArgs.index, global_basic';

				const value = getFirstValidValue(dataPaths, sources);

				// first it gets "global_basic"
				expect(value).toBe(1000);

				delete sources.flowArgs.index;
				expect(sources.flowArgs).toEqual({});

				const newValue = getFirstValidValue(dataPaths, sources);

				expect(newValue).toBe('9999');
			});
		});
	});

	describe('process', () => {
		describe('validations', () => {
			const error = jest
				.spyOn(console, 'error')
				.mockImplementation(() => {});

			it('should return undefined path and value when providing empty name', () => {
				const setDataComponent = {
					props: {
						name: '',
						data: 'static_100',
					},
				};

				const [path, value] = process(setDataComponent, {});

				expect(path).toBe(undefined);
				expect(value).toBe(undefined);

				expect(error).toBeCalledWith(
					'"name" and "data" props are required for SetData {"props":{"name":"","data":"static_100"}}',
				);
			});

			it('should return undefined path and value when providing empty DATA', () => {
				const setDataComponent = {
					props: {
						name: 'crazyProp',
						data: '',
					},
				};

				const [path, value] = process(setDataComponent, {});

				expect(path).toBe(undefined);
				expect(value).toBe(undefined);

				expect(error).toBeCalledWith(
					'"name" and "data" props are required for SetData {"props":{"name":"crazyProp","data":""}}',
				);
			});
		});

		describe('should process provided Query.SetData component, returning path and value to update on state based on provided data sources', () => {
			it('simple static data, without data source', () => {
				const setDataComponent = {
					props: {
						name: 'simpleProp',
						data: 'static_100',
					},
				};

				const dataSource = {};
				const [path, value] = process(setDataComponent, dataSource);

				expect(path).toBe('simpleProp');
				expect(value).toBe('100');
			});

			it('simple data', () => {
				const setDataComponent = {
					props: {
						name: 'first10AlphabetLetters',
						data: 'global_alphabet10',
					},
				};

				const dataSource = {
					global: {
						alphabet10: 'abcdefghijkl',
					},
				};

				const [path, value] = process(setDataComponent, dataSource);

				expect(path).toBe('first10AlphabetLetters');
				expect(value).toBe('abcdefghijkl');
			});

			it('simple data with multiple possible data sources', () => {
				const setDataComponent = {
					props: {
						name: 'selectedID',
						data: 'global_ID, flowArgs.anotherID',
					},
				};

				const dataSource = {
					global: {
						ID: 353535,
					},
					flowArgs: {
						anotherID: 919191,
					},
				};

				const [path, value] = process(setDataComponent, dataSource);

				expect(path).toBe('selectedID');
				expect(value).toBe(353535);

				// now, if we delete the data source from the first possible path
				delete dataSource.global.ID;
				expect(dataSource.global).toEqual({});

				const [newPath, newValue] = process(
					setDataComponent,
					dataSource,
				);
				expect(newPath).toBe('selectedID');

				// it matches the second possible value!
				expect(newValue).toBe(919191);
			});
		});
	});
});
