import React from 'react';
import { Icon as MuiIcon, SvgIcon } from '@mui/material';
import { SnakeCase, getColor } from '../../utils';
import { customMap } from './custom';
export const Icon = ({ icon, color, children, ...props }: any) => {
	const CustomIcon = customMap[icon];

	if (CustomIcon) {
		return (
			<SvgIcon>
				<CustomIcon />
			</SvgIcon>
		);
	}
	return (
		<MuiIcon sx={{ color: getColor(color) }} {...props}>
			{SnakeCase(icon) || children}
		</MuiIcon>
	);
};
