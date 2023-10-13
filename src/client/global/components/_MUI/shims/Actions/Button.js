import * as _ from 'lodash';
import { StateManager } from '../../../../../state/state';

export const Button = ({ propsFilled, propsIntact }) => {
	const {
		useData,

		__rowIndex,
		__rowStateKey,

		flow,
		useFlow,
		type,
		actionType = 'navigate',
		target,
		redirect,
		param: localParam,
	} = propsIntact;

	const _href = propsFilled.href || propsIntact.href || '';

	const propsShimmed = {};

	propsShimmed.onClickShimmed = (e, { runFlow, dispatch, globalParam }) => {
		const maybeRowPath = `${__rowStateKey}[${__rowIndex}]`;

		const maybeRowValue = StateManager.get(maybeRowPath, false, {});

		if (e.stopPropagation) {
			e.stopPropagation();
		}

		if (_href.startsWith('flow:')) {
			e.preventDefault && e.preventDefault();

			const flowName = _href.replace(/^flow:/, '');

			const newSteps = [
				{
					key: flowName,
					args: { ...maybeRowValue, index: __rowIndex },
				},
			];
			StateManager.update('flowQueue', newSteps);

			// DEPRECATE: in favor of flowArgs
			if (useData && !_.isEmpty(maybeRowValue)) {
				window.alert('Please stop using "useData"');
				StateManager.update(useData, maybeRowValue);
			}

			return;
		}

		if (_href) {
			e.preventDefault && e.preventDefault();

			dispatch({ type: 'navigate', target: _href });
			return;
		}

		let param = localParam || globalParam;

		// DEPRECATE: in favor of flowArgs
		if (useData && !_.isEmpty(maybeRowValue)) {
			window.alert('Please use "flowArgs" instead of "useData"');
			StateManager.update(useData, maybeRowValue);
		}

		if (flow) {
			runFlow(flow);
			return;
		}
		if (useFlow) {
			runFlow(useFlow);
			return;
		}

		dispatch({ type: actionType || type, target, param, redirect });
	};

	return { propsShimmed };
};
