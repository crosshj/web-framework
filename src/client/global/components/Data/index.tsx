import React from 'react';
import { useEffect } from 'react';
//import { useValidation } from '../Validator';

import { getData } from '../../services/getData';
import { StateManager } from '../../../state/state';

import { getStaticParams, paramsFromPath } from '../../utils/params';
import parseValue from '../../utils/parseValue';
import { useParams } from './useParams';

import { enhanceArgs } from './enhanceArgs';
import { useSource } from './useSource';

const argsCache = {};
const getDataFromDB = (...args: any) => {
	const [_0, , , name] = args;
	const isRefresh = typeof _0.message === 'string';
	if (isRefresh) {
		const name = _0.message.replace('refresh:', '');
		const cachedArgs = argsCache[name];
		const hasCache = Array.isArray(cachedArgs);
		//console.log('Data component refreshed data for ' + name);
		return hasCache ? getData(...cachedArgs) : undefined;
	}

	// keep track of most recent args, make available to call later
	//console.log('Data component got data from DB!', { args });
	argsCache[name] = args;
	return getData(...args);
};

export const Data = (argsSrc: any) => {
	// console.log({ argsSrc });
	const args = enhanceArgs(argsSrc);
	const {
		proc,
		procArg,
		params = [],
		name,
		paramName,
		defaultValue,
		defaultValueType,
		debug,
		//validate,
	} = args;
	const [, thisSetter] = StateManager.useListener(name, undefined, {
		debug,
		note: 'components/Data',
	});
	const [{ param } = {}] = StateManager.useListener('menu', undefined, {
		note: 'components/Data',
	});
	const [globalState, setState] = StateManager.useListener(
		undefined,
		undefined,
		{
			note: 'components/Data',
		},
	);

	// const { depends, dependsDefault } = getDepends(args);
	// const dependsGlobalValue = depends && globalState[depends];

	//const validator = globalState?.schemas?.[validate];
	//const myValidator = useValidation(validate);

	// const initialPathParams = useMemo(
	// 	() => paramsFromPath(args.route),
	// 	[args.route, menu]
	// );
	// const [pathParams, setPathParams] = useState(initialPathParams);

	// const setGlobalState = useCallback(
	// 	(x) => {
	// 		const value = x[name];
	// 		StateManager.update(name, value);
	// 		//setState(...x);
	// 	},
	// 	[name]
	// );

	useEffect(() => {
		const subCfg = {};
		if (debug) subCfg.debug = true;
		return StateManager.subscribe('refresh:' + name, getDataFromDB, subCfg);
	}, [debug, name]);

	//Added initialPathParams and globalState to the things useEffect listens to here.
	//Fixed problem with path data passed by button not triggering Data component to update.
	//Monitor in case this causes other problems.
	useEffect(() => {
		if (!args.route) return;
		const pathParams = paramsFromPath(args.route);
		//if (!params) return;
		const useDefault =
			typeof pathParams !== 'object' ||
			(typeof args.defaultValue !== 'undefined' &&
				Object.keys(pathParams).find(
					(key) => typeof pathParams[key] === 'undefined',
				));
		if (useDefault) {
			thisSetter(args.defaultValue);
			return;
		}
		thisSetter(pathParams);
	}, [args.route, param, thisSetter]);

	//this data depends on another global data
	useSource(args, [name]);
	// useEffect(() => {
	// 	if (!name) return;
	// 	if (!dependsDefault) return;
	// 	if (!Array.isArray(dependsGlobalValue)) return;
	// 	if (!setState) return;
	// 	if (typeof globalState[name] !== 'undefined') return;

	// 	const autoDefault = (
	// 		(dependsDefault === 'last'
	// 			? dependsGlobalValue[dependsGlobalValue.length - 1]
	// 			: dependsGlobalValue[0]) || {}
	// 	).value;
	// 	if (typeof autoDefault === 'undefined') return;
	// 	//console.log(`Data component: set ${name} default (${autoDefault})`);
	// 	StateManager.update(name, autoDefault);
	// }, [dependsGlobalValue, dependsDefault, globalState, name, setState]);

	//this data has a default value, but does not depend on another data
	useEffect(() => {
		if (!name) return;
		if (['first', 'last'].includes(defaultValue)) return;
		if (typeof defaultValue === 'undefined') return;
		if (defaultValue === 'no_default') return;
		// if (!setState) return;
		if (typeof globalState?.[name] !== 'undefined') return;

		//console.log(`Data component: set ${name} default (${defaultValue})`);
		let parsedValue = parseValue(defaultValue);
		if (defaultValueType === 'string') {
			parsedValue = JSON.stringify(parsedValue, null, 4);
		}
		if (parsedValue === 'static_null') parsedValue = null;
		StateManager.update(
			name,
			typeof parsedValue !== 'undefined' ? parsedValue : defaultValue,
		);
	}, [defaultValue, defaultValueType, globalState, name]);

	//this data comes from DB and depends on other data (params)
	useParams(args, undefined, getDataFromDB);

	//this data comes from DB and does not depend on params (or uses only static params)
	useEffect(() => {
		if (!name) return;
		if (!proc) return;
		// this will be handled by useParams
		if ((params || []).length) return;

		const queryArgs = {};
		if (paramName && param) {
			queryArgs[paramName] = param;
		}

		// console.log(`Data component: get ${name} from ${proc} - ${procArg}`);
		const paramsToSubmit = {
			...(procArg ? { key: procArg } : {}),
			...getStaticParams(argsSrc),
			...queryArgs,
		};
		getDataFromDB(
			proc || 'ui.sp_GetResourceListViews',
			paramsToSubmit,
			undefined, //setGlobalState,
			name,
		);
	}, [name]);

	return <></>;
};
