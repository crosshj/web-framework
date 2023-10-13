import * as _ from 'lodash';
import { getUseDataProp } from '../getUseDataProp';
import { StateManager } from '../../../../../state/state';

const getNewArrayValues = (currentValue, index) => {
	let newValues = currentValue;

	const alreadyIncludes = currentValue.some((x) => String(x) === index);

	if (alreadyIncludes) {
		newValues = currentValue.filter((x) => String(x) !== index);
	} else {
		newValues = [...currentValue, index];
	}

	newValues.sort((a, b) => a - b);

	return newValues;
};

const getIndex = (propsFilled, propsIntact) => {
	let index = propsFilled.index;

	const checkedIntact = _.get(propsIntact, 'checked', '');
	if (_.isUndefined(index) && checkedIntact.includes('static_')) {
		index = propsIntact.index;
	}

	return String(index);
};

const mountFlowArgs = (newValue, index, propsIntact) => {
	const { __rowIndex, __rowStateKey } = propsIntact;

	const args = {
		index,
		newValue,
	};

	const thereIsRowInfo =
		!_.isUndefined(__rowIndex) && !_.isUndefined(__rowStateKey);

	if (thereIsRowInfo) {
		const rowPath = `${__rowStateKey}[${__rowIndex}]`;

		Object.assign(args, {
			rowIndex: __rowIndex,
			...StateManager.get(rowPath, false, {}),
		});
	}

	return args;
};

const tryToParseToBool = (v) => {
	if (_.isBoolean(v)) return v;
	if (v === 'true') return true;
	if (v === 'false') return false;

	return v;
};

export const Checkbox = ({ propsFilled, propsIntact }) => {
	const propsShimmed = {};

	const useDataProp = getUseDataProp(propsIntact);

	const _href = propsIntact.href || propsFilled.href || '';

	if (_.isUndefined(propsFilled.checked)) {
		propsShimmed.checked = tryToParseToBool(
			StateManager.get(useDataProp, null, false),
		);
	}
	if (propsFilled.checked === 'true' || propsFilled.checked === 'false') {
		propsShimmed.checked = tryToParseToBool(propsFilled.checked);
	}

	propsShimmed.onClick = (e) => {
		let currentValue;

		if (useDataProp) {
			currentValue = StateManager.get(useDataProp, false, false);
		}
		if (
			_.isString(propsIntact.checked) &&
			propsIntact.checked.startsWith('global_')
		) {
			const _path = propsIntact.checked.replace('global_', '');

			currentValue = StateManager.get(_path, false, false);
		}

		let newValue = !(currentValue || false);

		let index;
		if (Array.isArray(currentValue)) {
			index = getIndex(propsFilled, propsIntact);

			if (_.isUndefined(index)) {
				console.error(
					'an index must be provided when Checkbox is used with array Data',
				);
				return;
			}

			newValue = getNewArrayValues(currentValue, index);
		}

		if (_href.includes('flow:')) {
			const flowName = _href.replace(/^flow:/, '');
			const args = mountFlowArgs(newValue, index, propsIntact);

			const newSteps = [{ key: flowName, args }];
			StateManager.update('flowQueue', newSteps);
		}

		if (useDataProp) {
			StateManager.update(useDataProp, newValue);
		}
	};

	return { propsShimmed };
};
