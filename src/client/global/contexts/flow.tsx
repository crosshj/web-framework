import React from 'react';

import { createContext, useCallback, useEffect, useState } from 'react';
import { submitFormData } from '../services';
import { StateManager } from '../../state/state';
import * as _ from 'lodash';

export const FlowContext = createContext();

export const FlowProvider = ({ children }: any) => {
	const [globalFlowQueue, setQueue]: any =
		StateManager.useListener('flowQueue');
	const [step, setStep] = useState();
	const [flows, setFlows] = useState([]);

	const addFlow = (flow: any) => {
		if (flow.key === undefined) return;
		const found = flows.find((f: any) => f.key === flow.key);
		if (found) return;
		const newFlows = [...flows, flow];
		setFlows(newFlows as any);
	};

	const removeFlow = (flowId: any) => {
		const i = flows.findIndex((f: any) => f.key === flowId);
		setFlows(flows.splice(i, 1));
	};

	const runFlow = useCallback(
		(flowSrc: any) => {
			const flow = typeof flowSrc === 'object' ? flowSrc.key : flowSrc;

			const isCurrentFlow = flow === step?.flow;
			let currentStep = 0;
			if (isCurrentFlow && typeof step.step !== 'undefined') {
				currentStep = step.step + 1;
			}
			setStep({ flow, step: currentStep, args: flowSrc?.args });
		},
		[setStep, step],
	);

	const submit = async ({
		name,
		call,
		params,
		flatten, // onSuccess,
	} // onError,
	: any) => {
		const input = [
			{
				name,
				call,
				flatten,
				args: JSON.stringify({
					...params,
				}),
			},
		];
		return await submitFormData(input);
	};

	useEffect(() => {
		if (!globalFlowQueue || !Array.isArray(globalFlowQueue)) return;
		const [queuedFlow, ...flowQueue] = globalFlowQueue;
		if (typeof queuedFlow === 'undefined') return;
		if (
			typeof queuedFlow === 'object' &&
			typeof queuedFlow.key === 'undefined'
		)
			return;
		runFlow(queuedFlow);
		setQueue(flowQueue);
	}, [globalFlowQueue, runFlow, setQueue]);

	const value = {
		submit,
		step,
		setStep,
		flows,
		setFlows,
		addFlow,
		removeFlow,
		runFlow,
	};
	return (
		<FlowContext.Provider value={value}>{children}</FlowContext.Provider>
	);
};
