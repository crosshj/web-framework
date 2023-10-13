import { PageContent } from '../components/PageContent';

export const pageContentAdapter = ({ children }) => {
	return {
		Component: PageContent,
		children,
	};
};
