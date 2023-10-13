import React from 'react';
import { IconButton } from '@mui/material';
import { Icon } from '..';

export const Action = ({ handleClick, icon, color, hasValidFlow }: any) => {
	return (
		<IconButton disabled={!hasValidFlow} onClick={handleClick}>
			<Icon icon={icon} color={color} />
		</IconButton>
	);
};
