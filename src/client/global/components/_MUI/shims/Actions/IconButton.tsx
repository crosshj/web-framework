import * as React from 'react';
import * as _ from 'lodash';

import { Icon } from '../../..';
import { StateManager } from '../../../../../state/state';

import { getUseDataProp } from '../getUseDataProp';

export const IconButton = ({ propsIntact, propsFilled }: any) => {
	const useDataProp = getUseDataProp(propsIntact);

	const { color, icon, label, target, value, __rowIndex, __rowStateKey } =
		propsIntact;

	let useFlow = propsIntact.useFlow;
	let _href = propsIntact.href || propsFilled.href || '';

	if (useFlow) {
		_href = useFlow;
	}

	const childrenShimmed = [<Icon color={color} icon={icon} />];
	const propsShimmed = {
		label,
		target,
		value,
		color: 'default',
		onClick: (_e: any): void => {},
	};

	if (_.isUndefined(_href) || _.isEmpty(_href)) {
		return { propsShimmed, childrenShimmed };
	}

	propsShimmed.onClick = (e: any) => {
		e.preventDefault && e.preventDefault();
		e.stopPropagation && e.stopPropagation();

		const maybeRowPath = `${__rowStateKey}[${__rowIndex}]`;
		const maybeRowValue = StateManager.get(maybeRowPath, false, {});

		if (useDataProp && !_.isEmpty(maybeRowValue)) {
			StateManager.update(useDataProp, maybeRowValue);
		}

		const flowName = _href.replace(/^flow:/, '');
		const newSteps = [
			{
				key: flowName,
				args: { ...maybeRowValue, index: __rowIndex },
			},
		];

		StateManager.update('flowQueue', newSteps);
	};

	return { propsShimmed, childrenShimmed };
};
