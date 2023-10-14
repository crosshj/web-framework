import React, { useEffect, useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

export const LayoutContext = React.createContext({});

export const LayoutProvider = ({ children }: any) => {
	const theme = useTheme();
	const [open, setOpen] = useState(true);
	const matches = useMediaQuery(theme.breakpoints.down('sm'));

	const handleToggleDrawer = () => {
		setOpen((oldState) => {
			if (!matches) {
				localStorage.setItem('drawerOpen', !oldState + '');
			}
			return !oldState;
		});
	};
	useEffect(() => {
		if (matches) return;
		const cachedDrawerState = localStorage.getItem('drawerOpen');
		if (!cachedDrawerState) return;
		const parsedState = JSON.parse(cachedDrawerState);
		setOpen(parsedState);
	}, [matches]);

	useEffect(() => {
		if (!matches) return;
		setOpen(false);
	}, [matches]);

	const value = { open, handleToggleDrawer };
	return (
		<LayoutContext.Provider value={value}>
			{children}
		</LayoutContext.Provider>
	);
};
