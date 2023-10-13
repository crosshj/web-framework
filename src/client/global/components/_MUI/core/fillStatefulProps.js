import * as _ from 'lodash';
import {
	clone,
	getWhenProps,
	getIncludesProps,
	StringFormatters,
} from '../../../utils';
import { StateManager } from '../../../../state/state';

const format = (value, formatter = '') => {
	const formatterLower = formatter.toLowerCase();
	if (formatterLower in StringFormatters) {
		return StringFormatters[formatterLower](value);
	}

	return value;
};

const toString = (v = {}) => {
	return Array.isArray(v) ? v.join(',') : JSON.stringify(v);
};

export const fillToken = (token, currentValue, originalValue, dataSources) => {
	if (_.isUndefined(originalValue)) debugger;

	const { key, match, source, path: pathIntact, formatter } = token;

	if (!(source in dataSources)) {
		console.warn(
			`Unknown data source for "${source}". Stateful prop not replaced.`,
		);
		return;
	}

	const path = pathIntact
		.split(/[.\[](?!hidden)/)
		.map((x) => x.replace(/\]$/, ''));
	let valueToFill = _.get(dataSources, [source, ...path]);

	if (_.isUndefined(valueToFill)) return undefined;

	valueToFill = format(valueToFill, formatter);

	if (_.isUndefined(currentValue)) {
		// ? why return undefined?
		return undefined;
	}

	if (_.isObject(valueToFill)) {
		// ? It is possible to display array/object data as string on Typography, using "textContent" prop.
		// ? Therefore if it is textContent, we must parse into string,
		// ? Otherwise, we must return the object.
		if (key === 'textContent') {
			valueToFill = toString(valueToFill);
		} else {
			return valueToFill;
		}
	}

	let valueFilled = String(currentValue).replace(match, String(valueToFill));

	if (_.isNumber(valueToFill) && !Number.isNaN(Number(valueFilled))) {
		valueFilled = Number(valueFilled);
	}

	return valueFilled;
};

const getDataSources = ({ __rowTotals, __rowStateKey, __rowIndex }) => {
	const global = clone(StateManager.get());
	const row = clone(
		StateManager.get(`${__rowStateKey}[${__rowIndex}]`, false, {}),
	);

	Object.assign(row, { totals: __rowTotals });

	return {
		row,
		global,
	};
};
export const fill = (propsIntact, statefulProps) => {
	const dataSources = getDataSources(propsIntact);
	let propsFilled = {};

	for (const [key, statefulProp] of Object.entries(statefulProps)) {
		const { tokens, originalValue } = statefulProp;

		let potentiallyFilledValue;
		let shouldStore = true;

		for (const token of tokens) {
			if (token.matchType === 'when') {
				shouldStore = false;
			}

			const currentValue =
				potentiallyFilledValue || propsFilled[key] || originalValue;

			potentiallyFilledValue = fillToken(
				token,
				currentValue,
				originalValue,
				dataSources,
			);
		}

		if (shouldStore) {
			_.set(propsFilled, key, potentiallyFilledValue);
		}
	}

	const whenPropsFilled = getWhenProps(propsIntact, dataSources);
	const includesPropsFilled = getIncludesProps(propsIntact, dataSources);

	return {
		...whenPropsFilled,
		...includesPropsFilled,
		...propsFilled,
	};
};
