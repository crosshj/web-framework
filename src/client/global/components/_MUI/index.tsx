import React from 'react';
import * as _ from 'lodash';
import * as M from '@mui/material';
import { StateManager } from '../../../state/state';

import { getShim } from './shims';
import * as StandardComponents from './StandardComponents';
import { fill, getStatefulProps } from './core';
import { parseProperties, withNamespaced } from '../../utils';
import { genericAdapter } from '../../adapters/generic';

/*
 * PROPS NAMING
 *
 * "propsIntact" => original props, without any replacing or filling, the same way
 * as they come originally from .xml files/config/fragments.
 *
 * "propsFiled" => props replaced/filled with values from state or alternative data sources, such as row data.
 */

const ComponentWithTokensAndData = ({
	sx = '',
	children,
	component: Component,
	...propsIntact
}: any) => {
	// 1. get stateful props (props that rely on global state or other values)
	const statefulProps = getStatefulProps(propsIntact);

	const pathsToListen = _.flatMap(statefulProps, (x) => x.pathsToListen);

	if (propsIntact.useData && !pathsToListen.includes(propsIntact.useData)) {
		pathsToListen.push(propsIntact.useData);
	}

	// 2. listen to stateful paths (stateful props + "useData" prop, which is a special case)
	StateManager.useListener(pathsToListen, undefined, {
		note: 'with-tokens-and-data-' + pathsToListen.join(','),
	});

	// 3. fill stateful props by actual values
	// returns only STATEFUL PROPS
	const propsFilled = fill(propsIntact, statefulProps);

	// 4. get shim (improvements for Component)
	// let shim = {};
	const { propsShimmed, childrenShimmed } = getShim(
		Component._name,
		propsIntact,
		propsFilled,
	);

	if (!_.isUndefined(childrenShimmed)) {
		children = childrenShimmed;
	}

	// 5. finally mount props
	const allProps = withNamespaced({
		...propsIntact,
		...propsFilled,

		inputProps: parseProperties(propsIntact.inputProps),
		// props shimmed must come after stateful props filled
		// because it can overwrite some props
		...propsShimmed,

		// these props should not be overrided.
		// TODO: shims for Button contain "sx" props -- does it work correctly?
		sx: parseProperties(sx),
		type: propsIntact?._src?.type,
	});

	const { textContent }: any = allProps;

	// this prop messes up css FLEX order
	delete (allProps as any).order;

	if (propsIntact.debug) {
		console.log({
			_: `_MUI DEBUG - ${Component._name}`,
			sx,
			propsIntact,
			propsFilled,
			propsShimmed,
			pathsToListen,
			allProps,
		});
		console.log(_.repeat('\n', 6));
	}

	// 6. render
	return (
		<Component {...allProps}>
			{textContent ? textContent : null}
			{children ? children : null}
		</Component>
	);
};

const Generic = (name: any) => (props: any) => {
	const Component = (StandardComponents as any)[name] || (M as any)[name];

	_.set(Component, '_name', name);

	return <ComponentWithTokensAndData component={Component} {...props} />;
};

const MUIComponents = {
	Box: Generic('Box'),
	Button: Generic('Button'),
	Container: Generic('Container'),
	Checkbox: Generic('Checkbox'),
	Chip: Generic('Chip'),
	Divider: Generic('Divider'),
	IconButton: Generic('IconButton'),
	Link: Generic('Link'),
	Radio: Generic('Radio'),
	Stack: Generic('Stack'),
	Switch: Generic('Switch'),
	TextField: Generic('TextField'),
	Typography: Generic('Typography'),
	MUI_Stepper: Generic('Stepper'),
};

const adapters = Object.entries(MUIComponents).reduce(
	(a, [k, v]) => ({
		...a,
		[k]: genericAdapter(v),
	}),
	{},
);

export const components = MUIComponents;

export default adapters;
