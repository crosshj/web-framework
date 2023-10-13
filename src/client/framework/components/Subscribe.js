import * as _ from 'lodash';
import { StateManager } from '../../state/state';

const buildIndexMatcherRegex = (match = '') => {
	const regexString = match
		.replace(/\[INDEX\]/g, `\\[(\\d+)\\]`)
		.replace(/\./g, `\\.`);
	return new RegExp(regexString);
};

const getSubscribeIndex = (path, { matchProp }) => {
	if (!_.isString(matchProp) || !matchProp.includes('INDEX')) {
		return undefined;
	}

	const regex = buildIndexMatcherRegex(matchProp);
	const matches = path.match(regex);

	if (Array.isArray(matches) && _.isString(matches[1])) {
		return matches[1];
	}
};

export const handleSubscriber = ({
	path: pathProp,
	match: matchProp,
	handler: handlerProp,
} = {}) => {
	// Should trigger if Subscriber.path or Subscriber.match
	// actually match the state path that is being updated
	const shouldTrigger = ({ path: modifiedStatePath } = {}) => {
		const pathMatches =
			_.isString(pathProp) &&
			_.isString(modifiedStatePath) &&
			modifiedStatePath.startsWith(pathProp);

		if (pathMatches) {
			return true;
		}

		if (_.isString(matchProp)) {
			const regex = buildIndexMatcherRegex(matchProp);
			const doesMatch = regex.test(modifiedStatePath);
			return doesMatch;
		}
	};

	const subHandler = (newValue, oldValue, path, index) => {
		let _index = index;

		if (_.isUndefined(_index)) {
			_index = getSubscribeIndex(path, { pathProp, matchProp });
		}

		StateManager.update('flowQueue', [
			{
				key: handlerProp,
				args: { path, oldValue, newValue, index: _index },
			},
		]);
	};

	StateManager.subscribe(shouldTrigger, subHandler, {
		note: 'Subscribe.js',
		_props: {
			matchProp,
			pathProp,
			handlerProp,
		},
	});
};
