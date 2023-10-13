import { Box, Stack } from '@mui/material';
import { styled } from '@mui/system';

export const MainLayout = styled(Box)(({ theme }) => ({
	// '& ::-webkit-scrollbar': {
	// 	width: '10px',
	// },
	// '& ::-webkit-scrollbar-track': {
	// 	boxShadow: 'inset 0 0 5px ' + theme.palette.secondary.main,
	// },
	// '& ::-webkit-scrollbar-thumb': {
	// 	background: theme.palette.primary.main,
	// },
}));

export const Body = styled(Stack)(({ theme }) => ({
	height: '100vh',
	overflowY: 'hidden',
	width: '100vw',
	backgroundColor: theme.palette.background.paper,
}));

export const Content = styled(Stack)(({ theme }) => ({
	overflowY: 'scroll',
	paddingBlock: theme.spacing(4),
	overflowX: 'hidden',
	height: '95%',

	[theme.breakpoints.up('md')]: {
		paddingInline: theme.spacing(8),
	},
	[theme.breakpoints.down('md')]: {
		paddingInline: theme.spacing(4),
	},
	[theme.breakpoints.down('xs')]: {
		paddingInline: theme.spacing(2),
	},
}));
