import { Stack, Typography } from '@mui/material';

export const NotFound = () => {
	return (
		<Stack variant="fullScreen">
			<Typography variant="h4">
				Oops! It looks like you're trying to access an unexpected route.
			</Typography>
		</Stack>
	);
};
