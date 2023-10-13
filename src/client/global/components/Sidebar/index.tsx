import React from 'react';
import { Fragment } from 'react';
import { useTheme, useMediaQuery, SwipeableDrawer } from '@mui/material';
import { useLayout } from '../../hooks';

import * as S from './styles';
import { SidebarContent } from './components/Content/index.jsx';
import { StateManager } from '../../../state/state';

export const Sidebar = ({ menus }) => {
	//const [loading] = StateManager.useListener('loading');
	const [activeMenu] = StateManager.useListener('menu');

	const { open = false, handleToggleDrawer = null } = useLayout();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('sm'));

	const loading = !(
		typeof menus !== 'undefined' &&
		Array.isArray(menus) &&
		menus.length > 0
	);

	const contentProps = {
		menus,
		open,
		loading,
		handleToggleDrawer,
		activeMenu: activeMenu?.target,
	};

	return (
		<>
			{matches ? (
				<S.SidebarContainer open={open}>
					<SidebarContent {...contentProps} />
				</S.SidebarContainer>
			) : (
				<Fragment>
					<SwipeableDrawer
						open={open}
						onClose={handleToggleDrawer}
						onOpen={handleToggleDrawer}
					>
						<SidebarContent {...contentProps} />
					</SwipeableDrawer>
				</Fragment>
			)}
		</>
	);
};
