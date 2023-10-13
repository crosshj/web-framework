import React from 'react';

import { GlobalProvider } from './global';
import { FlowProvider } from './flow';
import { ToastContainer } from 'react-toastify';
import { useModuleBuilder } from '../hooks/useModuleBuilder';

export const TestProvider = ({ children }) => {
	const globalModule = useModuleBuilder({ name: 'test' });
	return (
		<GlobalProvider {...globalModule}>
			<FlowProvider>
				{children}
				<ToastContainer />
			</FlowProvider>
		</GlobalProvider>
	);
};
