import * as M from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useFlow } from '../../../hooks/useFlow';
import { StateManager } from '../../../../state/state';
import { clone, enhanceResults, getFilledQueryParams } from '../../../utils';

import Outputs from './Outputs';
import SetData from './SetData';
import ParseWorkflowData from './ParseWorkflowData';

export const Query = (args: any) => {
	const [state, setState]: any = useState('loading');
	const { submit, step }: any = useFlow();

	const {
		proc: name,
		procArgs,
		onStep,
		onExit,
		call,
		children,
		flatParams: flatten,
		debug,
		...propsRest
	} = args;

	const params = useMemo(() => {
		const dataSources = {
			state: clone(StateManager.get()),
			flowArgs: step?.args,
		};

		const paramsFilled = getFilledQueryParams(propsRest, dataSources);
		if (debug) {
			console.log({
				_: 'Query:Params',
				paramsFilled,
				propsRest,
				dataSources,
			});
		}

		if (args.procArgs) {
			Object.assign(paramsFilled, {
				key: args.procArgs,
			});
		}

		return paramsFilled;
	}, [args, step]);

	const onSuccess = useCallback(
		(results: any) => {
			const dataSources = {
				results,
				flowArgs: step?.args,
			};
			if (debug) {
				console.log({
					_: 'Query:Success',
					propsRest,
					children,
					dataSources,
				});
			}
			Outputs.handleProps(propsRest, dataSources);
			SetData.handleComponents(children, dataSources);
			ParseWorkflowData.handleResults(children, results);

			onStep && onStep();
		},
		[step?.args, onStep, propsRest],
	);

	const onError = useCallback((error: any) => {
		console.log(error);
		setState(error);
	}, []);

	const onRetry = useCallback(() => {
		setState('loading');
	}, []);

	const submitStep = useCallback(
		(args: any) => {
			setState('submitting');
			if (debug) {
				console.log({
					_: 'Query:Submit',
					args,
				});
			}
			submit(args)
				.then((res: any) => {
					const [data] = res;
					const resultsEnhanced = enhanceResults(data.results);

					onSuccess(resultsEnhanced);
				})
				.catch(onError);
		},
		[submit, onSuccess, onError],
	);

	// if it's not the same step # as before, reset state to 'loading'
	useEffect(() => {
		setState('loading');
	}, [args.step]);

	useEffect(() => {
		if (state !== 'loading') return;
		const oneOfRequired = [call, name, submit].find(
			(x) => typeof x !== 'undefined',
		);
		if (!oneOfRequired) return;
		submitStep({ call, name, flatten, params });
	}, [args.step, submitStep, call, name, submit, flatten, params, state]);

	if (state === 'loading')
		return (
			<M.Backdrop open>
				<M.CircularProgress sx={{ color: 'white' }} />
			</M.Backdrop>
		);

	if (state instanceof Error) {
		return (
			<M.Dialog open fullWidth>
				{/* <M.DialogTitle>Error</M.DialogTitle> */}
				<M.DialogContent>
					<M.Alert
						severity="error"
						icon={false}
						style={{ marginTop: '1em' }}
					>
						<M.AlertTitle>Error</M.AlertTitle>
						<pre style={{ whiteSpace: 'pre-line' }}>
							{state.message}
						</pre>
					</M.Alert>
				</M.DialogContent>
				<M.DialogActions>
					<M.Button
						variant="outlined"
						onClick={onExit}
						color="secondary"
					>
						Cancel
					</M.Button>
					<M.Button
						variant="contained"
						onClick={onRetry}
						color="primary"
					>
						Retry
					</M.Button>
				</M.DialogActions>
			</M.Dialog>
		);
	}

	return null;
};
