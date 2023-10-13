import * as React from 'react';
// //import './App.css';
// import { UserProvider, ThemeProvider } from './global/contexts';
// import { Global } from './global';
// import { StateManager } from './state/state';
// import { Routes } from './global/contexts/global/routes';

// if (!(window as any).URLPattern) {
// 	import('urlpattern-polyfill');
// }

// const theme = new URLSearchParams(document.location.search).get('theme');

// const initialState = {
// 	version: 0,
// 	menus: [],
// 	menu: Routes(),
// 	previousMenu: { target: 'root.dashboard', param: '' },
// };
// StateManager.init(initialState);

export default function App(args: any) {
	console.log({ args });
	return <div>TESTING APP</div>;
	// return (
	// 	<UserProvider>
	// 		<ThemeProvider theme={theme}>
	// 			{/* <CssBaseline /> */}
	// 			<Global />
	// 		</ThemeProvider>
	// 	</UserProvider>
	// );
}
