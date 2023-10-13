import { PageHeader } from '../components/PageHeader';

export const pageHeaderAdapter = ({ parent, children, label, props }) => {
	const title = label;

	return {
		title,

		Component: PageHeader,
	};
};
