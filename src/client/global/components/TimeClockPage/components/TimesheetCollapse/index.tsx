import {
	Box,
	FormControl,
	Grid,
	MenuItem,
	Select,
	Table,
	TableBody,
	TableCell,
	TableRow,
	TextField,
} from '@mui/material';
import { useState } from 'react';
import {
	TimesheetCollapseButton,
	TimesheetCollapseContainer,
	TimesheetCollapseTableCell,
} from './style';

const TimesheetCollapse = ({ open, rows, menuInItems, menuOutItems }: any) => {
	const [edit, setEdit] = useState(false);
	const [inLabel, setInLabel] = useState('');
	const [outLabel, setOutLabel] = useState('');
	const [details, setDetails] = useState('Details are entered here.');

	return (
		<TimesheetCollapseTableCell colSpan={rows.length}>
			<TimesheetCollapseContainer in={open} timeout="auto" unmountOnExit>
				<Box>
					<Table size="small" aria-label="purchases">
						<TableBody>
							{!edit && (
								<>
									<TableRow>
										<TableCell>
											{'5:30 am - 6:30 pm'}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											{'Details are entered here.'}
										</TableCell>
									</TableRow>
								</>
							)}

							{edit && (
								<FormControl fullWidth>
									<Grid container spacing={2} padding={1}>
										<Grid item xs={6} md={6} lg={6}>
											<Select
												fullWidth
												id="in-select"
												value={inLabel}
												onChange={(e) =>
													setInLabel(e.target.value)
												}
											>
												{menuInItems.map(
													(item: any) => (
														<MenuItem
															key={item.id}
															value={item.value}
														>
															{item.value}
														</MenuItem>
													),
												)}
											</Select>
										</Grid>

										<Grid item xs={6} md={6} lg={6}>
											<Select
												fullWidth
												id="out-select"
												value={outLabel}
												onChange={(e) =>
													setOutLabel(e.target.value)
												}
											>
												{menuOutItems.map(
													(item: any) => (
														<MenuItem
															key={item.id}
															value={item.value}
														>
															{item.value}
														</MenuItem>
													),
												)}
											</Select>
										</Grid>

										<Grid item xs={12} md={12} lg={12}>
											<TextField
												fullWidth
												value={details}
												onChange={(e) =>
													setDetails(e.target.value)
												}
											/>
										</Grid>
									</Grid>
								</FormControl>
							)}
						</TableBody>

						{!edit && (
							<Grid container padding={1}>
								<Grid item xs={12} md={12} lg={12}>
									<TimesheetCollapseButton
										size="large"
										variant="outlined"
										onClick={() => setEdit(true)}
									>
										{'edit entry'}
									</TimesheetCollapseButton>
								</Grid>
							</Grid>
						)}

						{edit && (
							<Grid container spacing={2} padding={1}>
								<Grid item xs={6} md={6} lg={6}>
									<TimesheetCollapseButton
										size="large"
										variant="outlined"
										onClick={() => setEdit(false)}
									>
										{'cancel'}
									</TimesheetCollapseButton>
								</Grid>

								<Grid item xs={6} md={6} lg={6}>
									<TimesheetCollapseButton
										size="large"
										variant="contained"
										onClick={() => setEdit(false)}
									>
										{'save'}
									</TimesheetCollapseButton>
								</Grid>
							</Grid>
						)}
					</Table>
				</Box>
			</TimesheetCollapseContainer>
		</TimesheetCollapseTableCell>
	);
};

export default TimesheetCollapse;
