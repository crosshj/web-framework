import { Chip } from './Chip';
import { Chip_Props_1 } from '../fixtures';

xdescribe('Chip', () => {
	it('should return expected props', () => {
		const { propsShimmed } = Chip(Chip_Props_1);

		expect(propsShimmed.color).toBe('primary');
		expect(propsShimmed.style).toEqual({ backgroundColor: '#283593' });

		expect(Object.keys(propsShimmed).length).toBe(3);

		expect(typeof propsShimmed.icon).toBe('object');
		expect(propsShimmed.icon.props).toEqual({ icon: 'Refresh' });
	});
});
