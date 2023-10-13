import { useGlobal } from '../../../hooks';
import { clone, replaceTokens } from '../../../utils';
import { StateManager } from '../../../../state/state';

export const Navigate = (args: any) => {
	const { onStep, path, stepArgs: flowArgs } = args;
	let { route } = args;
	const { navigate } = useGlobal();

	if (route) {
		const _state = clone(StateManager.get());

		Object.assign(_state, {
			flowArgs,
		});

		const tokenFilledRoute = replaceTokens(
			_state,
			route.replace('global_', ''),
		);
		navigate(tokenFilledRoute);
		onStep && onStep();
	}

	if (path) {
		const state = StateManager.get();
		const { history, Event, dispatchEvent } = window;
		const tokenFilledPath = replaceTokens(state, path);
		history.pushState({}, '', tokenFilledPath);
		const pushStateEvent = new Event('pushstate');
		dispatchEvent(pushStateEvent);
		onStep && onStep();
	}

	return null;
};
