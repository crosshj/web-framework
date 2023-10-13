import * as _ from 'lodash';
import { StateManager } from '../../../../state/state';
import { fillTokenizableIndex, StringFormatters } from '../../../utils';

export const getFirstValidValue = (data, dataSources) => {
	let value;

	// ? turns
	// ? "results.prop1:object, results.prop2:stringify, static_null"
	// ? into
	// ? [
	// ?		['results.prop1', 'object'],
	// ?    ['results.prop2', 'stringify'],
	// ?    ['static_null', ''],
	// ? ]
	const dataPaths = data.split(',').map((x) => x.trim().split(':'));

	for (const [dataPath, formatter = ''] of dataPaths) {
		if (dataPath.includes('static_')) {
			value = dataPath.replace('static_', '');
		} else {
			value = _.get(dataSources, dataPath.replace('_', '.'));
		}

		const _formatter = formatter.toLowerCase();
		if (_formatter in StringFormatters) {
			value = StringFormatters[_formatter](value);
		}

		if (!_.isUndefined(value)) break;
	}

	return value;
};

export const process = (component, dataSources) => {
	let path = _.get(component, 'props.name', '').replace('global_', '');
	let dataPath = _.get(component, 'props.data', '');

	if (!path || !dataPath) {
		console.error(
			`"name" and "data" props are required for SetData ${JSON.stringify(
				component,
			)}`,
		);
		return [];
	}

	const value = getFirstValidValue(dataPath, dataSources);

	path = fillTokenizableIndex(path, dataSources);

	return [path, value];
};

export const handleComponents = (queryChildren, dataSources) => {
	const setDataComponents = queryChildren.filter((x) => x.type === 'SetData');

	if (_.isEmpty(setDataComponents)) return;

	for (const component of setDataComponents) {
		const [path, value] = process(component, dataSources);

		if (path && value) {
			StateManager.update(path, value);
		}
	}
};

const QuerySetData = {
	handleComponents,
	getFirstValidValue,
	process,
};

export default QuerySetData;
