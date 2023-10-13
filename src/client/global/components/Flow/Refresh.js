import { StateManager } from '../../../state/state';

export const Refresh = (props) => {
	const { onStep, data, debug } = props;

	setTimeout(() => {
		if (typeof data === 'undefined') return;
		StateManager.notify({ message: `refresh:${data}` });
		onStep && onStep();
	}, 1);

	return null;
};
