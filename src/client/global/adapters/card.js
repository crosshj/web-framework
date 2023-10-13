import { Card } from '../components';

export const cardAdapter = ({ children, props, ...rest }) => {
	return { Component: Card, children, ...rest, ...props };
};
