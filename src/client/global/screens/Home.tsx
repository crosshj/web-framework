import React from 'react';
import { Stack } from '@mui/material';
import { Button } from '../components';
import { Link } from '../../router';

export const HomeScreen = () => {
	return (
		<Stack>
			<Link to="uikit">
				<Button variant="contained">Go to UI Kit</Button>
			</Link>
		</Stack>
	);
};
