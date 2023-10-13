import { Box, Chip, styled, Typography } from '@mui/material';

export const Timer = styled(Box)(({ theme }) => ({
	marginTop: theme.spacing(2),
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'center',
	gap: '0.75rem',
}));

export const TimeDisplayer = styled(Typography)(({ theme }) => ({
	fontSize: '2rem',
	fontWeight: '300',
}));

export const TimeLabel = styled(Typography)(({ theme }) => ({
	fontSize: '1.125rem',
	fontWeight: '400',
}));

export const TimeClockStatus = styled(Chip)(({ theme }) => ({
	marginTop: theme.spacing(5),
	textTransform: 'uppercase',
}));
