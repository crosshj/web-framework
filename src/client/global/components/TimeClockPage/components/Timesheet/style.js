import { Button, styled, Table, tableCellClasses } from '@mui/material';

export const TimesheetTable = styled(Table)(() => ({
	[`& .${tableCellClasses.root}`]: {
		borderBottom: 'none',
	},
}));

export const TimesheetButton = styled(Button)(() => ({
	color: 'primary',
	width: '100%',
	textTransform: 'uppercase',
}));
