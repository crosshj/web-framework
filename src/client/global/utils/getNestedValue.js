import * as _ from 'lodash';
export const getNestedValue = (obj, path) => {
	return _.get(obj, path);
};
