import { useMediaQuery, useTheme } from '@mui/material';
import { createContext, useEffect, useState } from 'react';

export const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
	const theme = useTheme();
	const [open, setOpen] = useState(true);
	const matches = useMediaQuery(theme.breakpoints.down('sm'));

	const handleToggleDrawer = () => {
		setOpen((oldState) => {
			if (!matches) {
				localStorage.setItem('drawerOpen', !oldState);
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
