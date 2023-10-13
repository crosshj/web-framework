import React from 'react';
/* eslint-disable react-hooks/exhaustive-deps */
import { Selector } from './components/Selector';
import { contextParser } from '../global/utils';
import { getChildren } from './tree';
import { ScreenLoader } from '../global/components/ScreenLoader';
import { WIP } from '../global/components/WIP';
import { StateManager } from '../state/state';
import { handleStatefulComponents, isStatefulComponent } from './core';

export const Framework = () => {
	// are useListeners what is needed here?

	const [UIContext] = StateManager.useListener('UIContext', false);

	const menu = StateManager.get('menu', false, {});
	const previousMenu = StateManager.get('previousMenu', false, {});
	const loading = StateManager.get('loading', false, false);

	if (!Array.isArray(UIContext) || UIContext.length === 0) {
		return loading ? (
			<ScreenLoader />
		) : (
			<WIP menu={menu?.target} link={previousMenu?.target} />
		);
	}

	/*
		TODO: some context items (Data,Flow) should not be treated as react components
		instead, they are stateful javacript items: data/listeners/handlers
		Also, this "Framework" component is really just a "Page" component
	*/

	const statefulComponents = UIContext.filter(isStatefulComponent);
	if (statefulComponents.length) {
		handleStatefulComponents(statefulComponents);
	}

	const __UIContext = UIContext.filter((x) => !isStatefulComponent(x));
	const parsedContext = contextParser(__UIContext);

	const tree = UIContext.find((item) => item.type === 'Page');

	if (!tree) return null;
	tree.children = getChildren(tree, parsedContext);

	// go into react
	return <Selector {...tree} />;
};
