import { Success } from '../components';

export const successAdapter = ({ children, label, props }) => {
	return { Component: Success, children, label, ...props };
};
