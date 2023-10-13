import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IconButton, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import TimesheetCollapse from '../TimesheetCollapse';

const TimesheetRow = ({ row, rows }) => {
	const [open, setOpen] = useState(false);

	const testListIn = [
		{
			id: 1,
			value: '5:00 am',
		},
		{
			id: 2,
			value: '5:05 am',
		},
		{
			id: 3,
			value: '5:10 am',
		},
	];

	const testListOut = [
		{
			id: 1,
			value: '6:00 pm',
		},
		{
			id: 2,
			value: '6:05 pm',
		},
		{
			id: 3,
			value: '6:10 pm',
		},
	];

	return (
		<>
			<TableRow>
				<TableCell component="th" scope="row">
					{row.name}
				</TableCell>
				<TableCell align="right">{row.regularTime}</TableCell>
				<TableCell align="right">{row.breakTime}</TableCell>
				<TableCell align="right">{row.secondRegularTime}</TableCell>
				<TableCell align="right">
					{row.overTime}{' '}
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? (
							<KeyboardArrowUpIcon />
						) : (
							<KeyboardArrowDownIcon />
						)}
					</IconButton>
				</TableCell>
			</TableRow>
			<TableRow>
				<TimesheetCollapse
					open={open}
					rows={rows}
					menuInItems={testListIn}
					menuOutItems={testListOut}
				/>
			</TableRow>
		</>
	);
};

export default TimesheetRow;
