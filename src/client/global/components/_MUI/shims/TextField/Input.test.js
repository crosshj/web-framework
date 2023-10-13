import { Input } from './Input';
import { Input_Props_1, Input_Props_2 } from '../fixtures';

describe('Input', () => {
	it('should return expected props', () => {
		const { propsShimmed } = Input(Input_Props_1);

		expect(Object.keys(propsShimmed).length).toBe(4);

		expect(propsShimmed.fullWidth).toBe(true);
		expect(propsShimmed.value).toBe('2019-05-24T19:30');
		expect(typeof propsShimmed.inputProps).toBe('object');
		expect(typeof propsShimmed.onChange).toBe('function');

		expect(Object.keys(propsShimmed.inputProps).length).toBe(2);
		expect(propsShimmed.inputProps.min).toBe('2019-01-24T00:00');
		expect(propsShimmed.inputProps.max).toBe('2020-05-31T00:00');
	});

	it('should return expected props (2)', () => {
		const { propsShimmed } = Input(Input_Props_2);

		expect(Object.keys(propsShimmed).length).toBe(3);

		expect(propsShimmed.fullWidth).toBe(true);
		expect(propsShimmed.value).toBe(1000);
		expect(typeof propsShimmed.onChange).toBe('function');
	});
});
