export const globalParams = (args = {}) => {
	const paramNames = [];
	const paramsPrefixed = Object.keys(args).filter((x) =>
		x.startsWith('param_')
	);
	for (const param of paramsPrefixed) {
		const paramVal = args[param];
		//console.log({ param, paramVal });
		if (typeof paramVal === 'undefined') continue;
		if (!paramVal.includes('global_')) continue;
		paramNames.push(paramVal.replace('global_', ''));
	}
	//console.log({ paramNames });
	return { paramNames };
};
