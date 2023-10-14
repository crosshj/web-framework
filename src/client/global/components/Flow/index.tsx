import { useFlow, useMount } from '../../hooks';

import { Confirm } from './Confirm';
import { Query } from './Query/index.jsx';
import { SetData } from './SetData';
import { Navigate } from './Navigate';
import { Refresh } from './Refresh';
import { Insert } from './Insert';

//TODO: possible candidate for refactor
const getFlowArgsIndex = (flowArgs: any = {}) => {
	const getIndexRegExp = /\[(\d+?)\]/;
	const possibleIndexes = getIndexRegExp.exec(flowArgs?.path || '');

	return Array.isArray(possibleIndexes)
		? Number(possibleIndexes[1])
		: undefined;
};

export const Flow = (args: any) => {
	const { id: key, children } = args;
	const { step = {}, setStep, addFlow, removeFlow }: any = useFlow() || {};
	const {
		flow: currentFlow,
		step: currentStep,
		args: currentStepArgs = {},
	} = step;

	useMount(() => {
		if (!addFlow || !removeFlow || !key) return;
		addFlow({ key });
		return () => removeFlow(key);
	});

	const isCurrent = key !== undefined && currentFlow === key;

	if (!isCurrent) return null;

	const currentChild = children?.[currentStep];
	if (!currentChild) {
		setTimeout(() => {
			setStep(undefined);
		}, 1);
		return null;
	}

	const currentProps = currentChild?.props;

	const FlowStepComponent = (
		{
			Confirm,
			Submit: Query,
			Query,
			FlowStep: Query,
			SetData,
			Navigate,
			Refresh,
			Insert,
		} as any
	)[currentProps.type];

	const onStep = () => {
		const arrIndex = getFlowArgsIndex(currentStepArgs?.path);

		setStep((prev: any) => ({
			flow: key,
			step: (prev?.step || 0) + 1,
			args: {
				...(prev?.args || {}),
				//TODO: possible candidate for refactor
				index:
					typeof arrIndex === 'undefined'
						? prev?.args?.index
						: arrIndex,
			},
		}));
	};
	const onExit = () => setStep(undefined);

	if (FlowStepComponent) {
		const childProps = currentChild?.props?.props || {};

		return (
			<FlowStepComponent
				{...childProps}
				step={currentStep}
				stepArgs={currentStepArgs}
				onStep={onStep}
				onExit={onExit}
			>
				{currentChild?.props?.children || []}
			</FlowStepComponent>
		);
	}

	// this is not the intended use case for flows
	// but works for testing and may be useful later?
	const currentType = currentChild.type;
	const Component = currentType({
		...currentProps,
		step: currentStep,
		onExit,
		onStep,
	});

	return Component;
};
