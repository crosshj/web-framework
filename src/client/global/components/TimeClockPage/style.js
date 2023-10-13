import { Button, Stack, Typography, styled } from '@mui/material';

export const TimeClockPageStack = styled(Stack)(({ theme }) => ({
	width: '100vw',
	position: 'relative',
	marginLeft: '-50vw',
	left: '50%',
	display: 'flex',
	flexDirection: 'column',
	borderRadius: '0.5rem',
	border: `1px solid ${theme.palette.divider}`,
	borderTop: 0,
	marginTop: '-32px',
	paddingTop: theme.spacing(3),

	[theme.breakpoints.up('sm')]: {
		width: '70%',
		left: 0,
		marginLeft: 0,
	},
	[theme.breakpoints.up('md')]: {
		width: '50%',
		left: 0,
		marginLeft: 0,
	},
	[theme.breakpoints.up('lg')]: {
		width: '20%',
		left: 0,
		marginLeft: 0,
	},
}));

export const TimeClockPageTitle = styled(Typography)(({ theme }) => ({
	marginLeft: theme.spacing(2),
	marginBottom: theme.spacing(3),
}));

export const TimeClockPageContainer = styled(Stack)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	marginTop: theme.spacing(2),
	marginBottom: theme.spacing(6),

	[theme.breakpoints.up('sm')]: {
		marginBottom: 0,
	},
	[theme.breakpoints.up('md')]: {
		marginBottom: 0,
	},
	[theme.breakpoints.up('lg')]: {
		marginBottom: 0,
	},
}));

export const TimeClockButton = styled(Button)(({ theme }) => ({
	textTransform: 'uppercase',
	width: '95%',
	marginTop: theme.spacing(3),
}));

export const TimeSheetTitle = styled(Typography)(({ theme }) => ({
	marginTop: theme.spacing(3),
	marginBottom: theme.spacing(3),
	fontSize: '1rem',
	color: theme.palette.text.secondary,
	fontWeight: '600',
	letterSpacing: '0.46px',
}));

export const TimeclockDateLine = styled('hr')(({ theme }) => ({
	width: '100%',
	border: '1px solid rgba(0,0,0,0.05)',
	backgroundColor: theme.palette.background.default,
}));

export const TimeclockDate = styled(Typography)(({ theme }) => ({
	textTransform: 'uppercase',
	fontSize: '1rem',
	fontWeight: '400',
	color: theme.palette.text.secondary,
}));
