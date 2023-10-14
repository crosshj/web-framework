import React from 'react';
import {
	FormControl,
	Grid,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import TimesheetRow from '../TimesheetRow';
import { TimesheetButton, TimesheetTable } from './style';

const createData = (
	name: any,
	regularTime: any,
	breakTime?: any,
	secondRegularTime?: any,
	overTime?: any,
) => {
	return {
		name,
		regularTime,
		breakTime,
		secondRegularTime,
		overTime,
		history: [
			{
				date: '2020-01-05',
				customerId: '11091700',
				amount: 3,
			},
			{
				date: '2020-01-02',
				customerId: 'Anonymous',
				amount: 1,
			},
		],
	};
};

const rows = [
	createData('Regular Time', 1),
	createData('Break', 1),
	createData('Regular Time', 1),
	createData('Over Time', 1),
	createData('Gingerbread', 1),
];

const Timesheet = (_props: any) => {
	const [add, setAdd] = useState(false);
	const timeTypes = [
		{ id: 1, label: 'Time 1', value: 'time1' },
		{ id: 2, label: 'Time 2', value: 'time2' },
		{ id: 3, label: 'Time 3', value: 'time3' },
	];
	const ampm = [
		{ id: 1, label: 'am', value: 'am' },
		{ id: 2, label: 'pm', value: 'pm' },
	];
	return (
		<TableContainer component={Paper}>
			<TimesheetTable aria-label="collapsible table">
				<TableHead>
					<TableRow>
						<TableCell>Time</TableCell>
						<TableCell align="right">Hours</TableCell>
						<TableCell align="right" />
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TimesheetRow key={row.name} row={row} rows={rows} />
					))}
				</TableBody>
			</TimesheetTable>

			<Grid container padding={2}>
				{!add && (
					<Grid item xs={12} md={12} lg={12}>
						<TimesheetButton
							size="large"
							variant="outlined"
							onClick={() => setAdd(true)}
						>
							{'add entry'}
						</TimesheetButton>
					</Grid>
				)}
				{add && (
					<Grid container spacing={2}>
						<Grid item xs={12} md={12} lg={12}>
							<FormControl fullWidth>
								<Select fullWidth>
									{timeTypes.map((item: any) => (
										<MenuItem
											key={item.key}
											value={item.value}
										>
											{item.label}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} md={12} lg={12}>
							<Grid container spacing={2}>
								<Grid item xs={12} md={12} lg={12}>
									<Select fullWidth>
										{timeTypes.map((item: any) => (
											<MenuItem
												key={item.key}
												value={item.value}
											>
												{item.label}
											</MenuItem>
										))}
									</Select>
								</Grid>

								<Grid item xs={12} md={12} lg={12}>
									<Grid
										container
										justifyContent={'space-between'}
									>
										<Grid item xs={3} md={3} lg={3}>
											<TextField fullWidth value={''} />
										</Grid>
										<Grid item xs={2} md={2} lg={2}>
											<Select fullWidth>
												{ampm.map((item: any) => (
													<MenuItem
														key={item.key}
														value={item.value}
													>
														{item.label}
													</MenuItem>
												))}
											</Select>
										</Grid>
										<Grid
											item
											xs={1}
											md={1}
											lg={1}
											alignSelf={'center'}
											justifyContent={'center'}
											display={'flex'}
										>
											<Typography variant="h2">
												-
											</Typography>
										</Grid>
										<Grid item xs={3} md={3} lg={3}>
											<TextField fullWidth value={''} />
										</Grid>
										<Grid item xs={2} md={2} lg={2}>
											<Select fullWidth>
												{ampm.map((item: any) => (
													<MenuItem
														key={item.key}
														value={item.value}
													>
														{item.label}
													</MenuItem>
												))}
											</Select>
										</Grid>
									</Grid>
								</Grid>
								<Grid item xs={12} md={12} lg={12}>
									<TextField
										fullWidth
										value={'Details are entered here.'}
									/>
								</Grid>
								<Grid item xs={6} md={6} lg={6}>
									<TimesheetButton
										size="large"
										variant="outlined"
										onClick={() => setAdd(false)}
									>
										{'cancel'}
									</TimesheetButton>
								</Grid>

								<Grid item xs={6} md={6} lg={6}>
									<TimesheetButton
										size="large"
										variant="contained"
										onClick={() => setAdd(false)}
									>
										{'save'}
									</TimesheetButton>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				)}
			</Grid>
		</TableContainer>
	);
};

export default Timesheet;
