import React from 'react';
import { Stack, Typography } from '@mui/material';

export const PageHeader = ({ title, children }: any) => {
	return (
		<Stack
			direction={{ xs: 'column', md: 'row' }}
			alignItems="center"
			justifyContent="space-between"
			my={2}
			sx={{ width: '100%' }}
		>
			<Typography variant="h1">{title}</Typography>

			{children}
		</Stack>
	);
};
