import { Card as MuiCard, styled } from '@mui/material';

export const Card = styled(MuiCard)(({ theme }) => ({
	padding: theme.spacing(3),
	margin: `${theme.spacing(3)} 0`,
	width: '100%',
	overflow: 'visible',
	border: '1px solid #ccc',
	borderRadius: '20px',
	boxShadow: 'none',
	backgroundColor: theme.palette.background.default,
}));
