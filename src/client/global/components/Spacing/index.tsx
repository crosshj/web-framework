import { Box, useTheme } from '@mui/material';

export const Spacing = ({ space }) => {
	const theme = useTheme();
	return <Box sx={{ my: `${theme.spacing(space)} !important` }} />;
};
