import * as _ from 'lodash';
import parseValue from './parseValue';
import format from 'date-fns/format';
import { whenParser, whenRunner } from './whenConditions';
import { StateManager } from '../../state/state';

const getTokenMatches = (x) => x.match(/{{\s*(\w+)_([\w\s.[\]:/\\]+)\s*}}/g);
const getTokenMatchesNoDelim = (x) => x.match(/(\w+)_([\w\s.[\]:/\\]+)/g);
const removeTokenBrackets = (x) => {
	return x.replace('{{', '').replace('}}', '').trim();
};

export const parseProperties = (properties) => {
	if (!properties) return;
	return (properties || '')
		.replace(/\\,/g, 'ESCAPED_COMMA')
		.replace(/\\:/g, 'ESCAPED_COLON')
		.replace(/\\n/g, 'ESCAPED_LINEFEED')
		.replace(/\\blank/g, 'ESCAPED_BLANK')
		.split(',')
		.reduce((acc, propIn = '') => {
			const prop = propIn.trim();
			const [name, mainValue, ...rest] = prop.split(':');
			const value = [mainValue, ...rest].join(':');
			if (!name || !value) return acc;
			const newValue = parseValue(
				value
					.trim()
					.replace(/ESCAPED_COMMA/g, ',')
					.replace(/ESCAPED_COLON/g, ':')
					.replace(/ESCAPED_LINEFEED/g, '\n')
					.replace(/ESCAPED_BLANK/g, ''),
			);
			const descapedName = name?.trim().replace(/ESCAPED_COLON/g, ':');
			return {
				...acc,
				[descapedName]: newValue,
			};
		}, {});
};

// NOTE: see also getTokenizableProps (below) which does a similar thing
export const replaceTokens = (state = {}, text) => {
	if (!text.includes('{{')) return text;
	const replacer = (match, pathSrc) => {
		try {
			let path = pathSrc.trim();
			// TODO: support AS syntax, allows extra formatting for TextField tokens
			// if (path.includes(' AS ')) {
			// 	path = pathSrc.split(' AS ')[0].trim();
			// }

			// let formatter;
			// if (path.includes(':')) {
			// 	[path, formatter] = path.split(':');
			// }

			// try with lodash
			// console.log({ state, path });
			const _value = _.get(state, path);
			if (typeof _value !== 'undefined') return _value;

			// fall back to javascript
			const replaced = path
				.trim()
				.split('.')
				.reduce((a, o) => a[o] || {}, state);

			// do not show object
			if (typeof replaced === 'object') {
				if (!Object.keys(state).length || state.loading) return '';
				console.log('Attempting to show JSON in a text replacer:', {
					replaced,
					state,
					path: path.trim(),
				});
				//return JSON.stringify(replaced, null, 2);
				return '';
			}
			return replaced || '';
		} catch (e) {
			console.log(e);
			return '';
		}
	};
	//if (text.includes('global_')) debugger;
	const replaced = text.replace(/{{(.*?)}}/gm, replacer);
	//console.log({ state, text, replaced });
	//if (!Object.keys(state).length) debugger;
	if (replaced.includes('[object Object]')) {
		// console.log('WARNING: failed to replace value for text: ');
		console.log({ text, replaced, state });
		return '';
	}
	return replaced;
};

export const parseUseData = (prop = '') => {
	const split = prop.split(',');
	return split.map((x) => ({
		key: x.split(':').shift(),
		intent: x.split(':').pop() || 'R',
	}));
};

export const enhanceResults = (results) => {
	if (!_.isString(results) && !Array.isArray(results)) return results;

	if (_.isString(results)) {
		try {
			results = JSON.parse(results);
		} catch (e) {
			return results;
		}
	}

	const EnhancedResultMap = (result) => {
		for (const [key, value] of Object.entries(result)) {
			//properties with _JSON in name
			if (key.toLowerCase().includes('_json')) {
				result[key.replace('_json', '').replace('_JSON', '')] =
					parseValue(value);
			}
		}
		return result;
	};

	if (!Array.isArray(results)) return results;

	return [].concat(results).map(EnhancedResultMap);
};

export const getWhenProps = (props, dataSources, debug) => {
	const whenReduce = (a, key) => {
		let value = _.get(props, key);

		if (!_.isString(value) || !value.includes('WHEN ')) {
			return a;
		}

		value = value.replace('global_', '');

		try {
			const moddedValue = whenRunner(value, dataSources);

			return { ...a, [key]: moddedValue };
		} catch (e) {
			console.error('Error on getWhenProps', e, { props });
			return a;
		}
	};

	const whenPropsParsed = Object.keys(props).reduce(whenReduce, {});

	(debug || props.debug) &&
		console.log({
			_: 'DEBUG WHEN',
			props,
			dataSources,
			whenPropsParsed,
		});

	return whenPropsParsed;
};

export const getIncludesProps = (propsIntact, dataSources, debug) => {
	const hasIncludes = _.values(propsIntact).some(
		(x) => _.isString(x) && x.includes('INCLUDES'),
	);

	(debug || propsIntact.debug) &&
		console.log({
			_: 'DEBUG INCLUDES INPUT',
			props: propsIntact,
			dataSources,
			hasIncludes,
		});

	if (!hasIncludes) return {};

	const propsParsed = {};

	const getValue = (prop) => {
		// |       prop          |   source   |     path     |
		// |_____________________|____________|______________|
		// |  global_thisAndThat |  global    | thisAndThat  |
		// |  static_1           |  static    |      1       |
		// |  row_myID           |  row       |     myID     |

		const [source, path] = prop.split('_').map((x) => x.trim());

		const pathSplit = path.split(/\.(?!hidden)/);

		debug && console.log({ source, pathSplit });

		if (source === 'static') {
			return path;
		}

		if (source in dataSources) {
			return _.get(dataSources, [source, ...pathSplit]);
		}

		if (source in propsIntact) {
			return _.get(propsIntact, [source, ...pathSplit]);
		}

		debug && console.log('undefined value', { source, pathSplit });

		return undefined;
	};

	const getLeftAndRightValues = (value) => {
		const [leftIntact, rightIntact] = value.split('INCLUDES');

		const leftValue = getValue(leftIntact);
		const rightValue = getValue(rightIntact);

		return [leftValue, rightValue];
	};

	for (const [k, v] of Object.entries(propsIntact)) {
		if (!v?.includes || !v.includes('INCLUDES')) continue;

		const valueWithoutBrackets = removeTokenBrackets(v);

		const [left, right] = getLeftAndRightValues(valueWithoutBrackets);

		if (!Array.isArray(left)) {
			_.set(propsParsed, [k], false);
			continue;
		}

		const actuallyIncludes = left.some((x) => String(x) === String(right));

		_.set(propsParsed, [k], actuallyIncludes);
	}

	(debug || propsIntact.debug) &&
		console.log({
			_: 'DEBUG INCLUDES OUTPUT',
			propsParsed,
		});

	return propsParsed;
};

/**
 *	Looks for tokenizable values/variables and returns related data, such as "{{global_prop}}" or "row_prop"
 * @param {{}} theseProps - props to look after
 * @param {boolean} withGlobal - whether should look for props that start with "global_" or not
	@example
	const componentProps = {
				textContent: "row_firstName"
				...otherProps,
	}

	getTokenizableProps(componentProps)

	// In this case, the return will be
	[{
				"key": "textContent",
				"match": "row_firstName",
				"source": "row",
				"path": "firstName"
	}]
	* @note function replaceTokens(), inside this same file, does a similar thing. Might fit your need.

	* @returns {Array<{
			key: string,
			path: string,
			source: string,
			match: string,
			formatter?: string,
			matchType?: string,
		}>} tokens Array
	*
 */
const getTokenizableProps = (theseProps, withGlobal) => {
	const matchToSourcePath = (match) => {
		let formatter;
		let [source, path] = removeTokenBrackets(match)
			.split('_')
			.map((x) => x.trim());
		if (path.includes(':')) {
			[path, formatter] = path.split(':');
		}
		if (path.includes(' ')) {
			path = path.split(' ').shift();
		}
		return [source, path, formatter?.trim()];
	};
	const propsReduce = (all, [key, value]) => {
		if (typeof value?.match === 'undefined') return all;
		if (typeof value?.includes === 'undefined') return all;
		if (!withGlobal && value.includes('global_')) return all;
		if (value.includes('INCLUDES')) return all;

		if (value.includes('WHEN')) {
			const whenConfig = whenParser(value);
			for (const watchVal of Object.values(whenConfig)) {
				if (typeof watchVal !== 'string') continue;
				const matches = getTokenMatchesNoDelim(watchVal.trim());
				if (!Array.isArray(matches)) continue;
				for (const match of matches) {
					if (typeof match !== 'string') continue;
					const [source, path, formatter] = matchToSourcePath(match);
					all.push({
						key,
						matchType: 'when',
						match,
						source,
						path,
						formatter,
					});
				}
			}
			return all;
		}

		//TODO: should also assume that INCLUDES-type props can be tokenized

		//THIS REGEX PATTERN HANDLES STRINGS LIKE {{ source_path }}
		let tokenMatches = value.includes('{{')
			? getTokenMatches(value)
			: getTokenMatchesNoDelim(value.trim());
		if (!tokenMatches) return all;

		for (const match of tokenMatches) {
			const [source, path, formatter] = matchToSourcePath(match);
			all.push({ key, match, source, path, formatter });
		}
		return all;
	};
	return Object.entries(theseProps).reduce(propsReduce, []);
};
export { getTokenizableProps };

export const fillPropsWithTokens = (theseProps, sources, sourceOrder) => {
	const filledProps = {};
	const allSources = ['row', 'flowArgs', 'global'];
	sourceOrder = sourceOrder || [...allSources];

	for (const [k, v] of Object.entries(theseProps)) {
		if (typeof v !== 'string') {
			filledProps[k] = v;
			continue;
		}
		if (!sourceOrder.some((x) => v.includes(x))) {
			// I'm not sure if we should return the unfilled prop
			filledProps[k] = v;
			continue;
		}

		let finalValue = v + '';

		for (const source of sourceOrder) {
			if (!sourceOrder.includes(source)) continue;

			if (
				!finalValue.includes(source + '.') &&
				!finalValue.includes(source + '_')
			)
				continue;

			let workingCopy = finalValue.replaceAll(source + '.', source + '_');
			finalValue = finalValue.replaceAll(source + '.', source + '_');

			//ignore sources not under test
			for (const _source of allSources.filter((x) => x !== source)) {
				workingCopy = workingCopy
					.replaceAll(_source + '.', '')
					.replaceAll(_source + '_', '');
			}

			const tokens = getTokenizableProps({ workingCopy }, 'withGlobal');

			for (const token of tokens.filter((x) => x.key === 'workingCopy')) {
				if (token?.path?.includes(']') && !token?.path?.includes('[')) {
					token.path = token.path.split(']').shift();
					token.match = token.match.split(']').shift();
				}

				token.value = _.get(sources[token.source], token.path);

				finalValue = finalValue.replace(token.match, token.value);

				// if "value" is an array and "finalValue" is a array string joined by commas,
				// then "finalvalue" should be original array
				if (
					Array.isArray(token.value) &&
					finalValue === token.value.join(',')
				) {
					finalValue = token.value;
				}

				// if "value" is an object and "finalValue" is "[object Object]",
				// then "finalValue" should be original object
				if (
					_.isObject(token.value) &&
					finalValue === '[object Object]'
				) {
					finalValue = token.value;
				}
			}
		}

		filledProps[k] = finalValue;
	}
	return filledProps;
};

/**
 * Given a tokenizable path/prop value, check if there is a tokenizable index, i.e
 * any path with the format `aaa[xx.yy]`, it replaces `xx.yy` by a `xx` object provided on dataSources.
 *
 * @param {string} path
 * @param {{ flowArgs?: {}, results?: {}, global?: {} }} dataSources
 * @returns
 */
export const fillTokenizableIndex = (path, dataSources) => {
	// ? Matches only alphabetical chars (not numbers) between brackets
	// ? returns array like
	// ? [
	// ?	 "[flowArgs.anyPropThatIsAnIndexOrNumber]",
	// ?   "flowArgs.anyPropThatIsAnIndexOrNumber"
	// ? ]
	const matches = /\[(\D+?)\]/.exec(path);

	if (!matches || !matches.length) {
		return path;
	}

	let indexPath = matches[1];

	let value;
	if (indexPath.includes('global_')) {
		value = StateManager.get(indexPath.replace('global_', ''));
	} else {
		value = _.get(dataSources, indexPath.replaceAll('_', '.'));
	}

	if (!_.isUndefined(value)) {
		path = path.replace(indexPath, value);
	}

	return path;
};

/**
 *
 * @param {*} propsSrc
 * @param {*} props
 * @returns
 */
export const applyInputProps = (propsSrc, props) => {
	const { inputProps, InputProps } = propsSrc?._src || {};

	let inputPropsDef;
	let inputPropsTarget;
	if (typeof inputProps === 'string') {
		inputPropsDef = inputProps;
		inputPropsTarget = 'inputProps';
	}
	if (typeof InputProps === 'string') {
		inputPropsDef = InputProps;
		inputPropsTarget = 'InputProps';
	}
	if (!inputPropsDef) return;

	const propString = inputPropsDef
		.replace(/\\:/g, 'ESCAPED_COLON')
		.split(/[;,]+/)
		.map((keyvalue) => keyvalue.trim().split(':'));
	props[inputPropsTarget] = {};
	for (const [k, v] of propString) {
		props[inputPropsTarget][k] = v.replace(/ESCAPED_COLON/g, ':');
	}
};

/**
 * XML namespaced properties are abused/used here to indicate a hard-coded transformation
 * @example
 * ```
 * withNamespaced({ sx:display:"none" });
 * // returns { sx: { display: "none" } }
 * ```
 * @param {*} propertiesObj
 * @returns an object where all properties like `namespace:prop` are replaced with `namespace.prop`
 */
export const withNamespaced = (propertiesObj) => {
	const _namespaced = {};
	for (const [k, v] of Object.entries(propertiesObj)) {
		if (!k.includes(':')) {
			_namespaced[k] = !_.isUndefined(v) ? v : _namespaced[k];
			continue;
		}
		const [ns, propName] = k.split(':').map((x) => x.trim());
		_namespaced[ns] = _namespaced[ns] || {};
		_namespaced[ns][propName] = v;
	}
	return _namespaced;
};

export const StringFormatters = {
	capitalize: (string) => {
		try {
			return string[0].toUpperCase() + string.slice(1);
		} catch (e) {
			console.log(
				e,
				'Error happened on StringFormatter.capitalize, got value:',
				string,
			);
			return string;
		}
	},
	date: (value) => {
		try {
			return format(new Date(value), 'MM/dd/yy');
		} catch (e) {
			console.log(
				e,
				'Error happened on StringFormatter.date, got value:',
				value,
			);
			return value;
		}
	},
	time: (value) => {
		try {
			return format(new Date(value), `hh:mm a`);
		} catch (e) {
			console.log(
				e,
				'Error happened on StringFormatter.time, got value:',
				value,
			);
			return value;
		}
	},
	datetime: (value) => {
		try {
			return format(new Date(value), `MM/dd/yy hh:mm a`);
		} catch (e) {
			console.log(
				e,
				'Error happened on StringFormatter.datetime, got value:',
				value,
			);
			return value;
		}
	},
	number: (value) => {
		try {
			if (value + '' === 'null') return '';
			return Number(value);
		} catch (e) {
			console.log(
				e,
				'Error happened on StringFormatter.number, got value:',
				value,
			);
			return value;
		}
	},
	fixed2: (value) => {
		try {
			if (value + '' === 'null') return '';
			return parseFloat(Number(value).toFixed(2)).toLocaleString(
				'en-US',
				{
					useGrouping: true,
					minimumFractionDigits: 2,
				},
			);
		} catch (e) {
			console.log(
				e,
				'Error happened on StringFormatter.fixed2, got value:',
				value,
			);
			return value;
		}
	},
	percent: (value) => {
		try {
			if (Number(value) < 1) {
				return value * 100 + '%';
			}
			return Number(value) + '%';
		} catch (e) {
			console.log(
				e,
				'Error happened on StringFormatter.percent, got value:',
				value,
			);
			return value;
		}
	},
	stringify: (value) => {
		try {
			if (value + '' === 'null') return '';
			if (typeof value === 'object')
				return JSON.stringify(value, null, 2);
			return value;
		} catch (e) {
			console.log(
				e,
				'Error happened on StringFormatter.stringify, got value:',
				value,
			);
			return value;
		}
	},
	object: (value) => {
		try {
			if (_.isNil(value)) return value;
			if (value + '' === 'undefined') return value;

			return JSON.parse(value);
		} catch (e) {
			console.log(
				e,
				'Error happened on StringFormatter.object, got value:',
				value,
			);
			return value;
		}
	},
};
