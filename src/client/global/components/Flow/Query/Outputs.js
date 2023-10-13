import * as _ from 'lodash';
import { StateManager } from '../../../../state/state';

const process = ([key, pathToData], dataSources) => {
	const path = key.split('_').slice(1).join('.');
	const value = _.get(dataSources, pathToData);

	return [path, value];
};

export const handleProps = (queryProps, dataSources) => {
	const outputsProps = Object.entries(queryProps).filter(([key]) =>
		key.startsWith('out_'),
	);

	for (const [key, pathToData] of outputsProps) {
		const [path, value] = process([key, pathToData], dataSources);

		StateManager.update(path, value);
	}
};

const Outputs = {
	process,
	handleProps,
};

export default Outputs;
