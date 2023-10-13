import * as _ from 'lodash';
import { StringFormatters } from './parseProperties';

/**
 * Accepts a string with Query param-like format, i.e
 * starts with `param_` and can potentially have "xml namespaces" to define nested objects, but
 * also "." (dots).
 *
 * The output can be used alongside with lodash's `set` function in order to set
 * nested objects/properties automatically.
 *
 * @example
 * const param = parseParamName('param_processData:myObject.ID');
 *
 * // param = ['processData','myObject','ID']
 * const filledParams = {}
 * _.set(filledParams, param, 1000);
 *
 * //filledParams = { processData: { myObject: { ID: 1000 } } }
 *
 * @param {string} name
 * @returns
 */
const parseParamName = (name) =>
	name.replace('param_', '').replaceAll(':', '.').split('.');

const getFormatter = (formatterName = '') => {
	const formatterNameLower = formatterName.toLowerCase();

	if (formatterNameLower in StringFormatters) {
		return StringFormatters[formatterNameLower];
	}

	return (x) => x;
};

const processParam = (key, value, { state, flowArgs }) => {
	const name = parseParamName(key);

	let [finalValue, formatterName = ''] = value.split(':');

	let formatter = getFormatter(formatterName);

	const hasFlowArgsPath = typeof flowArgs?.path === 'string';

	if (finalValue.startsWith('static_')) {
		return {
			name,
			finalValue: finalValue.replace('static_', ''),
		};
	}
	if (
		finalValue.includes('flowArgs.index') &&
		typeof flowArgs?.index !== 'undefined'
	) {
		return {
			name,
			formatter,
			source: state,
			path: finalValue
				.replace(/flowArgs\.index/g, flowArgs.index)
				.replace('global_', ''),
		};
	}
	if (finalValue.includes('flowArgs') && hasFlowArgsPath) {
		return {
			name,
			formatter,
			source: state,
			path: flowArgs?.path,
		};
	}
	if (finalValue.includes('flowArgs') && !hasFlowArgsPath) {
		return {
			name,
			formatter,
			source: flowArgs,
			path: finalValue.replace('flowArgs.', ''),
		};
	}
	if (finalValue.includes('global_')) {
		return {
			name,
			formatter,
			source: state,
			path: finalValue.replace('global_', ''),
		};
	}

	return {};
};

export const getFilledQueryParams = (allProps, { state, flowArgs = {} }) => {
	const paramProps = Object.entries(allProps).filter(([key]) =>
		key.startsWith('param_'),
	);

	const filledProps = {};

	const sources = {
		state,
		flowArgs,
	};

	for (const [k, v] of paramProps) {
		const paramInfo = processParam(k, v, sources);

		const { name, source, path, formatter } = paramInfo;

		// no need to get finalValue from sources of data, i.e it is a static value
		if (paramInfo.finalValue) {
			_.set(filledProps, name, paramInfo.finalValue);
			continue;
		}

		let finalValue = _.get(source, path);

		if (_.isNil(finalValue)) {
			finalValue = undefined;
		}
		_.set(filledProps, name, formatter(finalValue));
	}

	// we must parse nested objects since we are using JSON.stringify on the app
	// and this function only stringifies high level objects,
	// which leads to unexpected formats on nested ones
	const filledPropsParsed = _.transform(
		filledProps,
		(acc, value, key) => {
			const _value = _.isObject(value) ? JSON.stringify(value) : value;
			_.set(acc, key, _value);
			return acc;
		},
		{},
	);

	return filledPropsParsed;
};
