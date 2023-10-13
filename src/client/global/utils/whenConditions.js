import * as _ from 'lodash';

export const whenParser = (inputString) => {
	let input = inputString.trim().replace(/IS\s+NOT/g, 'ISNOT');
	const result = { debug: false };
	const hasDebug = input.toUpperCase().includes('DEBUG');
	// The following regex will identify a UPPERCASE name followed by a lowercase value
	const regex = /([A-Z][a-zA-Z]*)\s+((?:"[^"]*")|(?:'[^']*')|\S+)/g;

	if (hasDebug) {
		input = input.replace('DEBUG', '');
		result.debug = true;
	}

	const matches = input.matchAll(regex);

	for (const match of matches) {
		const key = match[1].toLowerCase().trim();
		const value = match[2].trim().replace(/["']/g, '');
		let joiner = ['and', 'or'].find(
			(x) => typeof result[x] !== 'undefined',
		);
		joiner = typeof joiner === 'string' ? result[joiner] : undefined;

		if (['is'].includes(key) && Array.isArray(joiner)) {
			joiner[joiner.length - 1].is = value;
			continue;
		}
		if (['isnot'].includes(key) && Array.isArray(joiner)) {
			joiner[joiner.length - 1].isnot = value;
			continue;
		}
		if (['and', 'or'].includes(key) && Array.isArray(joiner)) {
			joiner.push({
				when: value,
			});
			continue;
		}
		if (['and', 'or'].includes(key)) {
			result[key] = [
				{
					when: result.when,
					is: result.is,
					isnot: result.isnot,
				},
				{
					when: value,
				},
			];
			delete result.when;
			delete result.is;
			delete result.isnot;
			continue;
		}
		result[key] = value;
	}

	return result;
};

const withState = (conditions, state) => {
	const hasPrefix = (identifier = '') =>
		identifier?.split && identifier.split('_').length >= 2;
	const _conditions = {};

	const getStatefulValue = (v) => {
		if (!hasPrefix(v)) {
			let value = _.get(state, v);
			if (typeof value === 'undefined') {
				for (const source of Object.keys(state)) {
					value = _.get(state, `${source}.${v}`);
					if (typeof value !== 'undefined') break;
				}
			}
			if (typeof value === 'undefined') return v;
			return value;
		}
		const path = v.replace('_', '.');
		return _.get(state, path);
	};

	for (const [k, v] of Object.entries(conditions)) {
		_conditions[k] = v;
		if (Array.isArray(v)) {
			_conditions[k] = _conditions[k] || [];
			for (const [k2, v2] of Object.entries(v)) {
				_conditions[k][k2] = _conditions[k][k2] || {};
				for (const [k3, v3] of Object.entries(v2)) {
					_conditions[k][k2][k3] = getStatefulValue(v3);
				}
			}
			continue;
		}
		_conditions[k] = getStatefulValue(v);
	}
	return _conditions;
};

const oneResult = (conditions) => {
	let { when, is, isnot } = conditions;
	const isNegated = typeof isnot !== 'undefined';
	if (isNegated) {
		is = isnot;
	}
	let coercedIs = typeof is !== 'undefined' ? is : true;

	if ([1, '1'].includes(is)) coercedIs = true;
	if ([0, '0'].includes(is)) coercedIs = false;
	if (is?.toLowerCase && is.toLowerCase() === 'true') coercedIs = true;
	if (is?.toLowerCase && is.toLowerCase() === 'false') coercedIs = false;

	let coercedWhen = when;
	if (typeof is === 'undefined') {
		coercedWhen = !!when;
	}
	if ([1, '1'].includes(when)) coercedWhen = true;
	if ([0, '0'].includes(when)) coercedWhen = false;
	if (when?.toLowerCase && when.toLowerCase() === 'true') coercedWhen = true;
	if (when?.toLowerCase && when.toLowerCase() === 'false')
		coercedWhen = false;

	const truth =
		coercedWhen === coercedIs || coercedWhen + '' === coercedIs + '';
	return isNegated ? !truth : truth;
};

const getResult = (conditions) => {
	if (Array.isArray(conditions?.and)) {
		return conditions.and.reduce((a, o) => a && oneResult(o), true);
	}
	if (Array.isArray(conditions?.or)) {
		return conditions.or.reduce((a, o) => a || oneResult(o), false);
	}
	return oneResult(conditions);
};

const handleResult = (conditions) => {
	let result = getResult(conditions);

	if (result && typeof conditions.then !== 'undefined') {
		result = conditions.then;
	}
	if (!result && typeof conditions.else !== 'undefined') {
		result = conditions.else;
	}
	if (typeof result === 'string' && result.toLowerCase() === 'true') {
		result = true;
	}
	if (typeof result === 'string' && result.toLowerCase() === 'false') {
		result = false;
	}
	return result;
};

export const whenRunner = (inputString, state, logger = console.log) => {
	let conditions = whenParser(inputString);
	if (
		typeof conditions.when === 'undefined' &&
		!(conditions.and || conditions.or)
	) {
		logger({ error: `Problem parsing when statement: "${inputString}"` });
		return undefined;
	}
	conditions = withState(conditions, state);

	const theResult = handleResult(conditions);

	if (conditions.debug) {
		logger({
			message: `When runner for: "${inputString}"`,
			state,
			conditions,
			theResult,
		});
	}
	return theResult;
};
