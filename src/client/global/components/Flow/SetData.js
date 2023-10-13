import * as _ from 'lodash';
import { StateManager } from '../../../state/state';
import { clone, fillPropsWithTokens } from '../../utils';

const mutateCurrentValue = (path, mutateProp, debug) => {
	let currentValue = StateManager.get(path);

	if (debug) {
		console.log('SetData:mutateCurrentValue', { currentValue, path });
	}

	const { add, subtract, max, min } = mutateProp
		.split(',')
		.map((x) => x.split(':').map((y) => y.trim()))
		.reduce((a, [k, v]) => ({ ...a, [k]: Number(v) }), {});

	currentValue = Number(currentValue) || 0;
	currentValue += Number(add || 0);
	currentValue -= Number(subtract || 0);

	if (currentValue > max) {
		currentValue = max;
	}
	if (currentValue < min) {
		currentValue = min;
	}

	return currentValue;
};

const getParentPath = (path) => {
	return path.split(/[\.\[]/).shift();
};
const withEditing = (props) => {
	let { data, editing, name, ...rest } = props;

	const markEditing = editing + '' === 'true';
	const unmarkEditing = editing + '' === 'false';
	if (markEditing) {
		data = true;
		name += '.editing';
	}
	if (unmarkEditing) {
		data = undefined;
		name += '.editing';
	}
	return {
		forceUpdate: unmarkEditing,
		data,
		name,
		...rest,
	};
};

export const SetData = (props) => {
	const { onStep, mutate, stepArgs, debug } = props;
	let { data, forceUpdate, name: path } = withEditing(props);
	const flowArgs = clone(stepArgs);
	if (data === 'undefined') data = undefined;
	if (data === 'null' || data === 'static_null') data = null;

	setTimeout(() => {
		const global = clone(StateManager.get());
		const pathFilled = fillPropsWithTokens({ path }, { flowArgs }, [
			'flowArgs',
		]);
		const dataFilled = fillPropsWithTokens({ data }, { flowArgs, global }, [
			'flowArgs',
			'global',
		]);
		path = pathFilled.path;
		data = dataFilled.data;
		const globalPath = path.replace('global_', '');
		let currentValue = StateManager.get(globalPath);
		if (!_.isUndefined(mutate)) {
			data = mutateCurrentValue(globalPath, mutate, debug);
		}
		if (debug) {
			console.log({ data, currentValue, path: globalPath });
		}
		if (data !== currentValue) {
			StateManager.update(globalPath, clone(data));
		}
		if (forceUpdate) {
			const parentPath = getParentPath(globalPath);
			StateManager.refresh(parentPath);
		}
		onStep && onStep();
	}, 1);

	return null;
};
