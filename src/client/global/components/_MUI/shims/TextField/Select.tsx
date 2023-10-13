import * as React from 'react';
import * as _ from 'lodash';

import { StateManager } from '../../../../../state/state';
import { applyInputProps } from '../../../../../global/utils';
import { getUseDataProp } from '../getUseDataProp';

const getOptions = (propsIntact: any, propsFilled: any) => {
	const { options: optionsFilled = [] } = propsFilled;
	let { options: optionsIntact = [] } = propsIntact;

	let options = optionsFilled || optionsIntact;

	// if it is an EMPTY string, set to empty array
	if (_.isString(options) && _.isEmpty(options)) {
		options = [];
	}

	// TODO: communicate about this and migrate all options prop to use "global" preffix
	if (_.isString(options) && options !== 'null') {
		debugger;
		// ! most likely your "options" props does not contain "global_" suffix, such as options="colorOptions",
		// ! which means this prop is not filled with state where it was supposed to be filled, which is "fill" function (before SHIMS).
		// ! ideally shims should not be responsible to get data from state.
		// ! me, @Laian, recommend you to put the "global_" preffix on all "options" prop.

		const globalPath = options.includes('global_')
			? options.replace('global_', '')
			: options;

		options = StateManager.get(globalPath, null, []);
	}

	// if somehow it is not an array, make it an array :)
	if (options === 'null') {
		options = [];
	}
	if (!Array.isArray(options)) {
		options = [options];
	}

	return options;
};

const buildChildren = (propsIntact: any, propsFilled: any) => {
	const options = getOptions(propsIntact, propsFilled);

	const noneSelected = {
		value: -99999,
		label: '',
	};

	return [noneSelected].concat(options).map((option) => {
		return (
			<option key={option.value} value={option.value}>
				{option.label}
			</option>
		);
	});
};

export const Select = ({ propsIntact, propsFilled }: any) => {
	const useDataProp = getUseDataProp(propsIntact);

	let { fullWidth = true, SelectProps = {} } = propsIntact;

	const childrenShimmed = buildChildren(propsIntact, propsFilled);

	const propsShimmed = {
		fullWidth,
		SelectProps: {
			native: true,
			...SelectProps,
		},
		value: propsFilled.value,
		onChange: (_e: any) => {},
	};

	applyInputProps(propsIntact, propsShimmed);

	propsShimmed.onChange = (e) => {
		let newValue = e.target.value;
		if (newValue === '-99999') {
			newValue = null;
		}
		StateManager.update(useDataProp, newValue);
	};

	return { propsShimmed, childrenShimmed };
};
