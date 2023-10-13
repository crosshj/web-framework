import React from 'react';
import { Icon } from '../../../Icon';
import { getColor } from '../../../../utils';
import { StateManager } from '../../../../../state/state';

export const Chip = ({ propsIntact, propsFilled }: any) => {
	const {
		__rowIndex,
		__rowStateKey,
		backgroundColor,
		icon: iconProp,
		iconClass = '',
	} = propsIntact;

	const propsShimmed = {
		style: { backgroundColor: getColor(backgroundColor) },
		icon: <Icon icon={iconProp} className={iconClass} />,
		color: 'primary',
		onClick: (_e: any) => {},
	};

	const _href = propsFilled.href || propsIntact.href || '';

	if (!_href.includes('flow:')) {
		// nothing to do here
		return { propsShimmed };
	}

	propsShimmed.onClick = (e: any) => {
		e.preventDefault && e.preventDefault();
		e.stopPropagation && e.stopPropagation();

		const maybeRowPath = `${__rowStateKey}[${__rowIndex}]`;
		const maybeRowValue = StateManager.get(maybeRowPath, false, {});

		const flowName = _href.replace(/^flow:/, '');

		const newSteps = [
			{
				key: flowName,
				args: { ...maybeRowValue, index: __rowIndex },
			},
		];
		StateManager.update('flowQueue', newSteps);
		return;
	};

	return { propsShimmed };
};
