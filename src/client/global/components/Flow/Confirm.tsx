import React from 'react';
import * as M from '@mui/material';
import { clone, replaceTokens } from '../../utils';
import { StateManager } from '../../../state/state';

export const Confirm = (props: any) => {
	const {
		title: titleSrc,
		textContent: textSrc,
		alertText,
		onExit,
		stepArgs: flowArgs,
		onStep,
		debug,
	} = props;

	const state = clone(StateManager.get());

	Object.assign(state, {
		flowArgs: clone(flowArgs),
	});

	const title = replaceTokens(state, titleSrc);
	const textContent = replaceTokens(state, textSrc);

	const decline = () => {
		onExit && onExit();
	};
	const confirm = () => {
		onStep && onStep();
	};

	if (debug) {
		console.log({ flowArgs, title, textContent });
	}
	return (
		<M.Dialog open onClose={decline} fullWidth>
			<M.DialogTitle>{title}</M.DialogTitle>
			<M.DialogContent sx={{ whiteSpace: 'pre' }}>
				{textContent}
			</M.DialogContent>
			<M.DialogActions>
				{!alertText && (
					<M.Button
						variant="outlined"
						onClick={decline}
						color="secondary"
					>
						No
					</M.Button>
				)}
				<M.Button variant="contained" onClick={confirm} color="primary">
					{alertText || 'Yes'}
				</M.Button>
			</M.DialogActions>
		</M.Dialog>
	);
};
