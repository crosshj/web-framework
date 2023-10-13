import { Spacing } from '../components';

export const spacingAdapter = ({ props }) => {
	const { space } = props || {};

	return { space, Component: Spacing };
};
