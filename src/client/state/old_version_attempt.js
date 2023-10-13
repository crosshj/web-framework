/*
https://github.com/vikyw89/reactSyncStore/blob/main/client/src/lib/hooks/useStore.js
*/

import * as _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import {
	useState,
	useEffect,
	useMemo,
	useCallback,
	useSyncExternalStore,
} from 'react';
import { useMount } from 'global/hooks/useMount';

let state = {};
let subscriptions = [];

window.currentState = state;

const init = (initialState = {}) => {
	state = initialState;
	subscriptions = [];
	window.currentState = state;
	// console.log('State Manager Init');
	// console.log({ state, subscriptions });
};

const get = (path) => {
	if (typeof path === 'function') return state;
	if (typeof path === 'undefined' || path === '') return state;
	//console.log(path);
	return _.get(state, path);
};

const unsubscribe = (subConfig) => () => {
	// TODO: remove listener, remove data according to configuration
	//console.log({ stage: 'unsubscribe', subConfig });
	subscriptions = subscriptions.filter((x) => x._id !== subConfig._id);
};
const subscribe = (path, handler, cfg = {}, _id) => {
	//console.log({ path, handler });
	const subConfig = {
		_id,
		path,
		handler,
		...cfg,
	};
	subscriptions.push(subConfig);
	//console.log({ stage: 'subscribe', subConfig, subscriptions, state });
	return unsubscribe(subConfig);
};

const update = (path, value) => {
	let coercedValue = value;
	const prevState = JSON.parse(JSON.stringify(state));
	if (path && typeof path !== 'function') {
		//console.log({ coercedValue });
		_.set(state, path, coercedValue);
	} else {
		//value.loading && console.log({ value });
		// TODO: should never do this
		// this is especially problematic because we don't know when to update listeners below
		//state = { ...state, ...coercedValue };
	}
	state.version += 1;
	console.log({ t: 'update', v: state.version, p: path, va: value });
	//console.log('State update:', { state, path, value });

	//console.log({ state, path, value, subscriptions });
	const listening = subscriptions.filter((sub) => {
		// also, has the thing changed significantly at this level?
		// maybe more importantly, did the sub say it wanted to listen like this?
		// console.log({ path, subPath: sub.path });
		/*
        if (!sub.path) return true;
		if (!path) {
			return Object.keys(value).includes(sub.path);
		}
		return path === sub.path;
        */
		return true;
		//return path.startsWith(sub.path);
	});
	const noted = subscriptions.filter((x) => x.note);
	// const shouldLog = value?.loading || (path == 'loading' && value);
	//const shouldLog = path == 'pathData';
	const shouldLog = false;
	if (shouldLog) {
		console.log({
			all: [...subscriptions],
			path,
			value,
			noted,
			listening,
		});
	}
	const triggers = [];
	for (const listener of listening) {
		if (typeof listener.path === 'function') {
			const shouldTrigger = listener.path({
				prev: prevState,
				next: state,
				path,
				value,
			});
			if (shouldTrigger) listener.handler(state);
			continue;
		}
		if (typeof listener.path === 'undefined') {
			//triggers.push([listener.handler, state, '---']);
			listener.handler(state);
			continue;
		}
		const prevValue = _.get(prevState, listener.path);
		const newValue = _.get(state, listener.path);
		const isEqual = _.isEqual(
			// JSON.stringify(prevValue),
			// JSON.stringify(newValue)
			prevValue,
			newValue,
		);
		if (isEqual) continue;
		// listener.note &&
		// 	console.log({ path: listener.path, newValue, note: listener.note });
		triggers.push([listener.handler, newValue, listener.path]);
	}
	for (const [handler, value, path] of triggers) {
		console.log(
			`Triggered: ${path} -> ${JSON.stringify(value)} [${state.version}]`,
		);
		handler(value);
	}
	//if (typeof state.pathData !== 'undefined') debugger;
};

const useListener = (path, defaultValue, cfg) => {
	const pathDefined = typeof path !== 'undefined';
	const defaultDefined = typeof defaultValue !== 'undefined';
	let currentValue;
	if (pathDefined) {
		currentValue = get(path);
	}
	if (defaultDefined && typeof currentValue === 'undefined') {
		currentValue = defaultValue;
	}
	// console.log({
	// 	pathDefined,
	// 	defaultDefined,
	// 	currentValue,
	// 	defaultValue,
	// });

	const thisSubscribe = (callback) => {
		const _id = uuidv4();
		return subscribe(path, callback, cfg, _id);
	};
	// const getSnapshot = useCallback(() => {
	// 	return _.get(state, path);
	// }, [path]);
	// const getSnapshot = () => _.get(state, path);
	const getSnapshot = () => {
		return get(path);
		//const snap = JSON.stringify(get(path));
		//console.log({ snap });
		//return snap;
	};
	// useSyncExternalStore(subscribe, getSnapshot);
	// const value = _.get(state, path);

	// const [value, setter] = useState(currentValue);
	// const _id = useMemo(uuidv4, [path, cfg, defaultValue]);
	// useEffect(() => subscribe(path, setter, cfg, _id), [_id]);

	// useMount(() => {
	// 	if (typeof path === 'undefined') return;
	// 	if (typeof defaultValue === 'undefined') return;
	// 	if (typeof currentValue !== 'undefined') return;
	// 	console.log('WARNING: setting a default value for: ', {
	// 		path,
	// 		defaultValue,
	// 	});
	// 	update(path, defaultValue);
	// });

	//console.log({ initial, state, path, value });
	//return [value, (v) => update(path, v)];

	const value = {
		get useValue() {
			useSyncExternalStore(thisSubscribe, getSnapshot);
			//return value;
			return get(path);
		},
		update: (v) => update(path, v),
	};
	return [value.useValue, value.update];
};

export const StateManager = {
	init,
	get: (path) => (typeof path !== 'undefined' ? _.get(state, path) : state),
	update,
	subscribe,
	useListener,
};
