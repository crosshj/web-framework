import * as _ from 'lodash';

export const getUseDataProp = ({ value, useData = '', ...rest }) => {
	if (_.isString(value) && value.includes('global_')) {
		return value.replace(/global_/gm, '');
	}

	if (_.isString(value) && value.startsWith('row_')) {
		const { __rowStateKey, __rowIndex } = rest;

		const path = value.replace('row_', '');

		return `${__rowStateKey}[${__rowIndex}].${path}`;
	}

	if (useData) {
		return useData;
	}

	return undefined;
};
