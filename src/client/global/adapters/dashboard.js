import { Dashboard } from '../components';

export const dashboardAdapter = ({ children, props }) => {
	return { Component: Dashboard, children, ...props };
};
