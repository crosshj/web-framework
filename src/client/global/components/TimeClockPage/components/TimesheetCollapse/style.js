import { Button, Collapse, TableCell, styled } from '@mui/material';

export const TimesheetCollapseTableCell = styled(TableCell)(() => ({
	paddingTop: 0,
	paddingBottom: 0,
}));

export const TimesheetCollapseContainer = styled(Collapse)(({ theme }) => ({
	borderBottom: `1px solid ${theme.palette.divider}`,
	backgroundColor: theme.palette.background.default,
}));

export const TimesheetCollapseButton = styled(Button)(({ theme }) => ({
	color: 'primary',
	width: '100%',
	textTransform: 'uppercase',
	marginTop: theme.spacing(3),
}));
