import { Checkbox } from '../components';
import { getLastIdElement } from '../utils';

export const checkboxAdapter = ({ label, gridVariant, id, props, ...rest }) => {
	return {
		Component: Checkbox,
		label,
		gridVariant,
		name: getLastIdElement(id),
		...props,
		...rest,
	};
};
