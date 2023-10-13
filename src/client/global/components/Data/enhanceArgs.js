import { getParams } from '../../utils/params';

export const enhanceArgs = (args) => {
	const cloned = JSON.parse(JSON.stringify(args));

	// params-prefixed params
	const paramsPrefixed = Object.keys(cloned).filter((x) =>
		x.startsWith('param_'),
	);
	if (paramsPrefixed.length) {
		const allParams = getParams(cloned);
		cloned.params = allParams.join('&');
		cloned.paramsMap = {};
		paramsPrefixed.forEach((x) => {
			const prefixedParam = x.replace('param_', '');
			const paramVal = args[x];
			if (typeof paramVal === 'undefined') return;
			if (!paramVal.includes('global_')) return;
			const paramTarget = paramVal
				.replace('global_', '')
				.split('.')
				.pop();
			cloned.paramsMap[paramTarget] = prefixedParam;
		});
	}

	// get-prefixed Data params
	const getParam = Object.keys(cloned).filter((x) => x.startsWith('get'));
	if (!getParam.length) return cloned;
	const procMap = {
		getForm: 'ui.sp_formElementsGetbyFormKey',
		getOpts: 'ui.sp_GetOptionLists',
		getList: 'ui.sp_GetResourceListViews',
		getData: 'ui.sp_GetData',
	};
	const firstGetParam = getParam[0];
	cloned.name = cloned.name || cloned[firstGetParam];
	const procOrProcArg = [cloned.proc, cloned.procArg].every(
		(x) => typeof x !== 'undefined',
	);
	if (procOrProcArg) {
		console.error(
			'DO NOT use "proc" or "procArg" with "getForm, getOpts, getList, or getData" ',
		);
	}
	cloned.proc = procMap[firstGetParam];
	cloned.procArg = cloned[firstGetParam];

	return cloned;
};
