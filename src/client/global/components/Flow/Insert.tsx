//import * as _ from 'lodash';
import { StateManager } from '../../../state/state';
import { fillPropsWithTokens } from '../../utils';

const tryParse = (v: any) => {
	try {
		return JSON.parse(v);
	} catch (e) {
		return v;
	}
};

export const Insert = (props: any) => {
	const {
		step, //ignore
		children, //ignore
		onExit, //ignore
		onStep,
		stepArgs: flowArgs,
		debug,
		...other
	} = props;
	let { name: path, ...insertProps } = other;

	setTimeout(() => {
		const global = StateManager.get();
		const _filled: any = fillPropsWithTokens({ path }, { flowArgs }, [
			'flowArgs',
		]);
		path = _filled.path;
		const globalPath = path.replace('global_', '');
		const currentValue = StateManager.get(globalPath);

		const toInsert: any = {};
		for (const [k, v] of Object.entries(insertProps)) {
			const filled: any = fillPropsWithTokens(
				{ [k]: v },
				{ flowArgs, global },
				['flowArgs', 'global'],
			);
			toInsert[k] = tryParse(filled[k]);
		}
		flowArgs.index = currentValue.length;
		StateManager.update(globalPath, [...currentValue, toInsert]);

		if (debug) {
			console.log({ insertProps, toInsert, currentValue });
		}
		onStep && onStep();
	}, 1);

	return null;
};
