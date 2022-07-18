import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { useContext, useState } from 'react';
import StateContext from './State';

import layout from './layout.json';

import AppTheme from './theme';
import Menu from './components/Menu';
import Body from './pages/Body';
import Header from './components/Header';
import Invite from './pages/Invite';

import './App.css';

const drawerOpen = !(localStorage.getItem('drawerOpen') === 'false');

const DEBUG = true;

export default function App() {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	//const wide = useMediaQuery('(min-width:600px)');
	const [open, setOpen] = useState(drawerOpen);

	const handleDrawerOpen = () => {
		localStorage.removeItem('drawerOpen');
		setOpen(true);
	};

	const handleDrawerClose = () => {
		localStorage.setItem('drawerOpen', false);
		setOpen(false);
	};

	const {
		state: { invite },
	} = useContext(StateContext);
	return (
		<ThemeProvider theme={AppTheme(prefersDarkMode ? 'dark' : 'light')}>
			<CssBaseline />
			<div className="container">
				<Header
					className="header"
					hamburger={!invite && DEBUG}
					open={open}
					handleDrawerClose={handleDrawerClose}
					handleDrawerOpen={handleDrawerOpen}
				/>
				{!invite && DEBUG && (
					<div className="flex-row">
						<Menu
							open={open}
							routes={layout.routes}
							className="sidebar"
						/>
						<Body className="body" />
					</div>
				)}
				{invite && <Invite />}
			</div>
		</ThemeProvider>
	);
}
