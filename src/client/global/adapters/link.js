import { Button, MenuItem } from '../components';

export const linkAdapter = (args) => {
	const { type, label, props, target } = args;

	const { actionType = 'navigate' } = props || {};

	return {
		...props,
		Component: type === 'MenuItem' ? MenuItem : Button,
		label,
		type: actionType,
		target,
	};
};
