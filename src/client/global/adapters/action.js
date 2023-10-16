import { Action } from '../components/Action';
import { useFlow } from '../hooks/useFlow.js';

const ActionAdapter = (args) => {
	const { props } = args;

	const { useFlow: flowId } = props || {};
	const { runFlow, flows } = useFlow();

	const hasValidFlow = !!flows.find((f) => f.key === flowId);

	const handleClick = () => runFlow(flowId);

	return {
		Component: Action,
		...props,
		handleClick,
		hasValidFlow,
	};
};

export const actionAdapter = ActionAdapter;
