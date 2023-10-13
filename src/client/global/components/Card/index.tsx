import * as React from 'react';
import { useState } from 'react';
import { KeyboardArrowUp, Menu } from '@mui/icons-material';
import * as S from './styles';
import { IconButton, Stack, Typography } from '@mui/material';
export const Card = ({
	label,
	children,
	showMenu = true,
	collapsed = false,
	collapsible = false,
	...props
}: any) => {
	const [isCollapsed, setIsCollapsed] = useState(collapsed);

	const handleToggleCollapse = () => {
		setIsCollapsed(!isCollapsed);
	};

	const height = isCollapsed ? '5rem' : 'auto';
	return (
		<S.Card sx={{ height, overflowY: 'hidden' }} {...props}>
			<Stack
				sx={{ width: '100%' }}
				direction="row"
				justifyContent="flex-end"
			>
				<Typography variant="h2" sx={{ flexGrow: 1 }}>
					{label}
				</Typography>
				{showMenu && (
					<IconButton>
						<Menu />
					</IconButton>
				)}
				{collapsible && (
					<IconButton onClick={handleToggleCollapse}>
						<KeyboardArrowUp
							sx={{
								transition: '0.2s',
								rotate: isCollapsed ? '180deg' : '0deg',
							}}
						/>
					</IconButton>
				)}
			</Stack>

			{!isCollapsed && children}
		</S.Card>
	);
};
