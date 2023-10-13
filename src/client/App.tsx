import React from 'react';
import 'urlpattern-polyfill';
//import './App.css';
//import { UserProvider, ThemeProvider } from './global/contexts';
import { Global } from './global';
import { StateManager } from './state/state';
import { Routes } from './global/contexts/global/routes';

const theme = new URLSearchParams(document.location.search).get('theme');

let isInit: any;
const AppInit = (args: any) => {
	if (isInit) return;
	StateManager.bindStore(args.react);
	const initialState = {
		version: 0,
		menus: [],
		menu: Routes(),
		previousMenu: { target: 'root.dashboard', param: '' },
	};
	StateManager.init(initialState);
	isInit = true;
};

export default function App(args: any) {
	AppInit(args);
	console.log({ _: 'module:App', args });
	return <Global />;
	//return <div>TESTING APP</div>;
	// return (
	// 	<UserProvider>
	// 		<ThemeProvider theme={theme}>
	// 			{/* <CssBaseline /> */}
	// 			<Global />
	// 		</ThemeProvider>
	// 	</UserProvider>
	// );
}
