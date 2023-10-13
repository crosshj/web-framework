import * as React from 'react';
import { Stack, Typography } from '@mui/material';
import { Button } from '../components';
import { Link } from '../../router';

export const LogoutScreen = () => {
	return (
		<Stack spacing={2}>
			<Typography variant="h6">
				Are you sure you want to log out?
			</Typography>
			<Link href="/api/auth/logout">
				<Button variant="contained">Yes, log me out!</Button>
			</Link>
		</Stack>
	);
};
