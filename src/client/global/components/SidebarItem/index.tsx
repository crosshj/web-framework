import * as React from 'react';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import * as M from '@mui/material';
import * as S from './styles';
import { Link } from '../../../router';

export const SidebarItem = ({
	item,
	open,
	handleToggleDrawer,
	isActive,
	disabled,
}: any) => {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Link to={item?.TargetContentName}>
			<S.ListItemButton
				isActive={isActive}
				disabled={disabled}
				onClick={matches ? handleToggleDrawer : null}
			>
				<S.ListItemIcon isActive={isActive}>
					<M.Icon>{item.icon}</M.Icon>
				</S.ListItemIcon>

				{open && (
					<S.ListItemText>
						<Typography variant="body2">
							{item?.menu_item_name}
						</Typography>
					</S.ListItemText>
				)}
			</S.ListItemButton>
		</Link>
	);
};
