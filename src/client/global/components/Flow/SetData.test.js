const { StateManager } = require('../../../state/state');
const { SetData } = require('./SetData');

const onStepBuilder = () => {
	let stepPromiseResolver;
	const stepPromise = new Promise((res) => {
		stepPromiseResolver = res;
	});

	return [stepPromise, jest.fn(stepPromiseResolver)];
};

describe('SetData', () => {
	describe('simple scenarios', () => {
		it('should update state with number value from data', async () => {
			const [stepPromise, onStepMock] = onStepBuilder();

			const args = {
				name: 'data1',
				data: 100,
				step: 0,
				stepArgs: {},
				children: [],
				onStep: onStepMock,
			};

			SetData(args);

			await stepPromise;

			expect(StateManager.get('data1')).toBe(args.data);
		});

		it('should update state with object value from data', async () => {
			const [stepPromise, onStepMock] = onStepBuilder();

			const args = {
				name: 'data1',
				data: { prop1: 'aaa', prop5: 15 },
				step: 0,
				stepArgs: {},
				children: [],
				onStep: onStepMock,
			};

			SetData(args);

			await stepPromise;

			expect(StateManager.get('data1')).toEqual(args.data);
		});
	});

	describe('flowArgs', () => {
		it('should update state that depends on flowArgs', async () => {
			const [stepPromise, onStepMock] = onStepBuilder();

			const args = {
				name: 'myTest',
				data: 'flowArgs.newValue',
				step: 0,
				children: [],
				stepArgs: {
					path: 'colorSelectedValue',
					newValue: 'green',
					oldValue: undefined,
					index: undefined,
				},
				onStep: onStepMock,
			};

			SetData(args);

			await stepPromise;

			expect(StateManager.get(args.name)).toBe(args.stepArgs.newValue);
		});
	});

	describe('mutate', () => {
		beforeEach(() => {
			StateManager.init({
				mutateMockedData: 1,
				version: 0,
			});
		});

		it('should add 5', async () => {
			expect(StateManager.get('mutateMockedData')).toBe(1);

			const [stepPromise, onStepMock] = onStepBuilder();

			const args = {
				name: 'mutateMockedData',
				mutate: 'add:5',
				step: 0,
				stepArgs: {},
				children: [],
				onStep: onStepMock,
			};

			SetData(args);

			await stepPromise;

			expect(StateManager.get('mutateMockedData')).toBe(6);
		});

		it('should try to add 100, but "max" stops it', async () => {
			expect(StateManager.get('mutateMockedData')).toBe(1);

			const [stepPromise, onStepMock] = onStepBuilder();

			const args = {
				name: 'mutateMockedData',
				mutate: 'add:100,max:50',
				step: 0,
				stepArgs: {},
				children: [],
				onStep: onStepMock,
			};

			SetData(args);

			await stepPromise;

			expect(StateManager.get('mutateMockedData')).toBe(50);
		});

		it('should try to subtract 100, but "min" prop stops it', async () => {
			expect(StateManager.get('mutateMockedData')).toBe(1);

			const [stepPromise, onStepMock] = onStepBuilder();

			const args = {
				name: 'mutateMockedData',
				mutate: 'subtract:100,min:-20',
				step: 0,
				stepArgs: {},
				children: [],
				onStep: onStepMock,
			};

			SetData(args);

			await stepPromise;

			expect(StateManager.get('mutateMockedData')).toBe(-20);
		});

		it('should add 5, then subtract 5', async () => {
			expect(StateManager.get('mutateMockedData')).toBe(1);

			const [stepPromise, onStepMock] = onStepBuilder();

			const args = {
				name: 'mutateMockedData',
				mutate: 'add:5,subtract:5',
				step: 0,
				stepArgs: {},
				children: [],
				onStep: onStepMock,
			};

			SetData(args);

			await stepPromise;

			expect(StateManager.get('mutateMockedData')).toBe(1);
		});
	});
});
