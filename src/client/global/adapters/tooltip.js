import { Tooltip } from '../components';

export const tooltipAdapter = ({ label, props }) => {
	return { Component: Tooltip, title: label, ...props };
};
