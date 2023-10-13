import { StateManager } from '../../../../../state/state';

export const Link = ({ propsIntact, propsFilled }) => {
	const { __rowIndex, __rowStateKey } = propsIntact;

	const propsShimmed = {};

	const _href = propsFilled.href || propsIntact.href || '';

	propsShimmed.onClickShimmed = (e, { dispatch }) => {
		e.preventDefault && e.preventDefault();
		e.stopPropagation && e.stopPropagation();

		if (_href.startsWith('flow:')) {
			const flowName = _href.replace(/^flow:/, '');

			const maybeRowPath = `${__rowStateKey}[${__rowIndex}]`;
			const maybeRowValue = StateManager.get(maybeRowPath, false, {});

			const newSteps = [
				{
					key: flowName,
					args: { ...maybeRowValue, index: __rowIndex },
				},
			];

			StateManager.update('flowQueue', newSteps);
			return;
		}

		if (_href) {
			dispatch({ type: 'navigate', target: _href });
			return;
		}
	};

	return { propsShimmed };
};
