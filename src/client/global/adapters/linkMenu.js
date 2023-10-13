import { Menu } from '../components';

export const linkMenuAdapter = ({ type, label, props }) => {
	return { Component: Menu, label, ...props };
};
