import React from 'react';

import { submitFormData } from '../services';
import { toast } from 'react-toastify';
import { Routes } from './global/routes';
import { StateManager } from '../../state/state';

export const GlobalContext = React.createContext({});

export const GlobalProvider = ({ api, children }: any) => {
	const [selectedMenu]: any = StateManager.useListener('menu');

	const dispatch = async (args: any) => {
		const { type, target, param, redirect } = args;
		switch (type) {
			case 'navigate':
				// const newTarget =
				// 	(target?.target || target || '').startsWith('/') && selectedMenu?.target
				// 		? selectedMenu.target + target.replace(/^\//, '.')
				// 		: target?.target || target;

				// const newTarget = target;
				// setPreviousMenu(selectedMenu);
				// const newMenu = { target: newTarget, param: param };
				// setMenu(newMenu);

				Routes.push(target);
				return;
			case 'step':
				StateManager.update('selectedStep', target);
				//in a step array, the step count is zero-based, but the user sees as one-based count
				return;
			case 'selectListView':
				StateManager.update('selectedListView', target);
				return;

			case 'submit':
				const input = [
					{
						name: target,
						uuid: '',
						args: JSON.stringify({ id: param }),
					},
				];
				const toastId = toast.loading('Wait...');
				const res = await submitFormData(input);
				toast.dismiss(toastId);
				const { results } = res[0];
				if (results === 'success') {
					if (redirect) {
						Routes.push(redirect);
						// setPreviousMenu(selectedMenu);
						// setMenu({ target: redirect });
					}
					return;
				}
				toast.error('Something went wrong!');
				return;
			case 'setDialogState':
				StateManager.update(target, param ? param : true);
				return;
			default:
				console.log(`action ${type} doesn't exist`);
				return;
		}
	};

	const navigate = (target: any) => {
		dispatch({ type: 'navigate', target });
	};

	const value = {
		dispatch,
		menu: selectedMenu?.target,
		param: selectedMenu?.param,
		api,
		navigate,
	};
	if (!GlobalContext) return null;
	return (
		<GlobalContext.Provider value={value}>
			{children}
		</GlobalContext.Provider>
	);
};
