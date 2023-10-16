import { Page } from '../components/Page';

export const pageAdapter = ({ type, label, children, props }) => {
	return {
		Component: Page,
	};
};
