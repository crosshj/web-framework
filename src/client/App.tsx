import React from 'react';
import 'urlpattern-polyfill';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import { UserProvider, ThemeProvider } from './global/contexts';
import { Global } from './global';
import { StateManager } from './state/state';
import { Routes } from './global/contexts/global/routes';
import './global/utils/warningsAreNotErrors';

const theme = new URLSearchParams(document.location.search).get('theme');

const initialState = {
	version: 0,
	menus: [],
	menu: Routes(),
	previousMenu: { target: 'root.dashboard', param: '' },
};
StateManager.init(initialState);

export default function App(args: any) {
	console.log({ _: 'module:App', args });
	return (
		<UserProvider>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Global />
			</ThemeProvider>
		</UserProvider>
	);
}
