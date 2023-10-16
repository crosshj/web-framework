import { Fragment } from 'react';
import { useTheme, useMediaQuery, SwipeableDrawer } from '@mui/material';
import { useLayout } from '../../hooks/useLayout';

import * as S from './styles';
import { SidebarContent } from './components/Content/index.jsx';
import { StateManager } from '../../../state/state';

export const Sidebar = ({ menus }: any) => {
	//const [loading] = StateManager.useListener('loading');
	const [activeMenu]: any = StateManager.useListener('menu');

	const { open = false, handleToggleDrawer = null }: any = useLayout();
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

	const SidebarContainer = S.SidebarContainer as any;

	return (
		<>
			{matches ? (
				<SidebarContainer open={open}>
					<SidebarContent {...contentProps} />
				</SidebarContainer>
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
