import * as React from 'react';
import { adapterMap } from '../../../global/adapters/adapterMap';
import { genericAdapter } from '../../../global/adapters/generic';
import { cleanProps } from '../../../global/components/utils';

export const Selector = (component: any) => {
	const {
		id,
		type,
		props: compProps,
		children = [],
		...compRest
	} = component;

	if (!type) return null;

	const adapter = (adapterMap as any)[type] || genericAdapter;

	const doesNotNeedAdapter = ['hidden'];

	if (doesNotNeedAdapter.includes(type)) return null;

	if (!adapter) {
		console.log('WARN: No adapter found for type ' + type);
		return null;
	}
	const { Component, ...props } = adapter({ ...component });

	if (!Component) {
		if (type === 'Selector') {
			return <Selector {...component.props} />;
		}
		console.log(`WARN: component ${type} not registered`);
		return null;
	}

	const _src = {
		id,
		children,
		type,
		...compProps,
		...compRest,
	};

	return (
		<Component {...cleanProps(props)} _src={_src}>
			{!Array.isArray(children) ? (
				<Selector {...children} />
			) : (
				children.length > 0 &&
				children?.map((child, index) => {
					return <Selector key={`${type}-${index}`} {...child} />;
				})
			)}
		</Component>
	);
};
