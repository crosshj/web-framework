const { getFilledQueryParams } = require('./getFilledQueryParams');

describe('getFilledQueryParams', () => {
	it('get from global', () => {
		const props = {
			param_color: 'global_Color',
		};
		const state = { Color: 'blue' };
		const flowArgs = {};
		const result = getFilledQueryParams(props, { state, flowArgs });
		expect(result).toEqual({ color: state.Color, shape: state.Shape });
	});

	it('get from flowArgs', () => {
		const props = {
			param_shape: 'flowArgs.shape',
		};
		const state = {};
		const flowArgs = {
			shape: 'square',
		};
		const result = getFilledQueryParams(props, { state, flowArgs });
		expect(result).toEqual({ shape: flowArgs.shape });
	});

	it('get from flowArgs w/ path to state', () => {
		const props = {
			param_texture: 'global_allTextures[flowArgs.index]',
		};
		const state = {
			allTextures: ['rough'],
		};
		const flowArgs = {
			path: 'allTextures[0]',
		};
		const result = getFilledQueryParams(props, { state, flowArgs });
		expect(result).toEqual({ texture: state.allTextures[0] });
	});

	it('get with formatter', () => {
		const props = {
			param_someJSON: 'global_Object:stringify',
		};
		const state = {
			Object: { foo: 'bar' },
		};
		const flowArgs = {};
		const result = getFilledQueryParams(props, { state, flowArgs });
		const expectedJSONString = JSON.stringify(state.Object, null, 2);
		expect(result).toEqual({
			someJSON: expectedJSONString,
		});
	});

	it('with static params', () => {
		const props = {
			param_something: 'static_1',
		};

		const state = {};
		const flowArgs = {
			myID: 1,
		};

		const result = getFilledQueryParams(props, { state, flowArgs });

		expect(result).toEqual({
			something: '1',
		});
	});

	it('with xml namespaces (nested props) - values from global', () => {
		const props = {
			param_processName: 'static_GeneralizedWorkflow',
			param_controlId: 'static_212121',
			'param_processData:step1': 'global_step1',
			'param_processData:step2': 'global_step2',
			'param_processData:step3': 'global_step3',
		};

		const state = {
			step11: 'b',
			step2_: 'c',

			step1: 'aaaaaa',
			step2: 'lllllllll',
			step3: 'pkqepok1op3k1p3k12k33',
		};
		const flowArgs = {};

		const result = getFilledQueryParams(props, { state, flowArgs });

		expect(result).toEqual({
			processName: 'GeneralizedWorkflow',
			controlId: '212121',
			processData:
				'{"step1":"aaaaaa","step2":"lllllllll","step3":"pkqepok1op3k1p3k12k33"}',
		});
		expect(JSON.parse(result.processData)).toEqual({
			step1: 'aaaaaa',
			step2: 'lllllllll',
			step3: 'pkqepok1op3k1p3k12k33',
		});
	});

	it('testing', () => {
		const props = {
			'param_nestedProp:areYouJokingMe': 'global_anything',
		};

		const state = {
			anything: 50505050,
		};
		const flowArgs = {};

		const result = getFilledQueryParams(props, { state, flowArgs });

		expect(result).toEqual({
			nestedProp: '{"areYouJokingMe":50505050,"sheeesh":"999"}',
		});
		expect(JSON.parse(result.nestedProp)).toEqual({
			sheeesh: '999',
			areYouJokingMe: 50505050,
		});
	});

	it('with xml namespaces (nested props) - static values', () => {
		const props = {
			'param_nestedProp:areYouJokingMe': 'global_anything',
			'param_nestedProp:sheeesh': 'static_999',
		};

		const state = {
			anything: 50505050,
		};
		const flowArgs = {};

		const result = getFilledQueryParams(props, { state, flowArgs });

		expect(result).toEqual({
			nestedProp: '{"areYouJokingMe":50505050,"sheeesh":"999"}',
		});
		expect(JSON.parse(result.nestedProp)).toEqual({
			sheeesh: '999',
			areYouJokingMe: 50505050,
		});
	});

	it('with xml namespaces (EVEN MORE nested props) - with both colons and dots', () => {
		const props = {
			'param_evenMoreNested:object1.object2.ID': 'global_IDeeeeed',
			// here we can see that it works with colons and dots
			'param_evenMoreNested:another:other:evenOther': 'global_IDeeeeed',
		};

		const state = {
			IDeeeeed: 111111,
		};
		const flowArgs = {};

		const result = getFilledQueryParams(props, { state, flowArgs });

		expect(result).toEqual({
			evenMoreNested:
				'{"object1":{"object2":{"ID":111111}},"another":{"other":{"evenOther":111111}}}',
		});
		expect(JSON.parse(result.evenMoreNested)).toEqual({
			object1: {
				object2: {
					ID: 111111,
				},
			},
			another: {
				other: {
					evenOther: 111111,
				},
			},
		});
	});

	it('will FAIL (return undefined) when path is not defined in flowArgs object', () => {
		const props = {
			param_texture: 'global_allTextures[flowArgs.index]',
		};
		const state = {
			allTextures: ['rough'],
		};
		const flowArgs = {
			path: undefined,
		};
		const result = getFilledQueryParams(props, { state, flowArgs });
		expect(result).toEqual({ texture: undefined });
	});

	it('fills multiple props from row data', () => {
		const props = {
			param_color: 'global_rows[flowArgs.index].color',
			param_shape: 'global_rows[flowArgs.index].shape',
			stepArgs: {
				path: 'rows[0].color',
				oldValue: 'green',
				newValue: 'blue',
				index: '0',
			},
		};
		const dataSources = {
			state: {
				rows: [
					{
						color: 'blue',
					},
				],
			},
			flowArgs: {
				path: 'rows[0].color',
				oldValue: 'green',
				newValue: 'blue',
				index: '0',
			},
		};
		const result = getFilledQueryParams(props, dataSources);
		expect(result.color).toBe('blue');
		expect(result.shape).toBe(undefined);
	});
});
