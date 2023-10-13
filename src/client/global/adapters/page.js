import { Page } from '../components';

export const pageAdapter = ({ type, label, children, props }) => {
	return {
		Component: Page,
	};
};
