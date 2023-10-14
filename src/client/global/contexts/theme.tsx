import React from 'react';
import {
	ThemeProvider as MuiThemeProvider,
	useMediaQuery,
} from '@mui/material';

import { createTheme } from '@mui/material/styles';
import { useEffect, useMemo, useState } from 'react';

//TODO: should be coming from module use here..
import { theme as atworkTheme } from '../../theme/atwork';
import { theme as greenfieldTheme } from '../../theme/greenfield';

const themes = {
	atwork: atworkTheme,
	greenfield: greenfieldTheme,
};

export const ThemeContext = React.createContext({});

export const ThemeProvider = (args: any) => {
	const { children, theme: whichTheme } = args || {};
	const [mode, setMode] = useState('light');

	const theme = useMemo(() => {
		const selectedTheme = (themes as any)[whichTheme] || themes.atwork;
		return createTheme(selectedTheme(mode));
	}, [whichTheme, mode]);

	const handleToggleColorTheme = () => {
		setMode((oldState) => {
			const newMode = oldState === 'light' ? 'dark' : 'light';
			localStorage.setItem('colorMode', newMode);
			return newMode;
		});
	};
	const prefersDarkMode = useMediaQuery('prefers-color-scheme: dark');

	useEffect(() => {
		const savedColorMode = localStorage.getItem('colorMode');
		if (savedColorMode && savedColorMode !== 'undefined') {
			setMode(savedColorMode);
			return;
		}
		setMode(prefersDarkMode ? 'dark' : 'light');
	}, [prefersDarkMode]);

	return (
		<ThemeContext.Provider
			value={{ handleToggleColorTheme, mode, ...theme }}
		>
			<MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
		</ThemeContext.Provider>
	);
};
