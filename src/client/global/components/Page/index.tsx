import { Stack } from '@mui/material';

export const Page = ({ children }) => {
	return <Stack sx={{ width: '100%', height: '100%' }}>{children}</Stack>;
};
