import {
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	useTheme,
} from '@mui/material';
import { Icon } from '../Icon';
import { getTodayLongDate } from '../../utils/getTodayLongDate';
import { useState } from 'react';
import TimeClock from './components/TimeClock';
import Timesheet from './components/Timesheet';
import {
	TimeClockButton,
	TimeClockPageContainer,
	TimeClockPageStack,
	TimeClockPageTitle,
	TimeSheetTitle,
	TimeclockDate,
	TimeclockDateLine,
} from './style';
import { useData } from '../../hooks/useData';
import { useFlow } from '../../hooks/useFlow';

const TimeClockPage = () => {
	const [label, setLabel] = useState('');
	const [timeWorked, setTimeWorked] = useState(0);
	const { getData } = useData();
	const { runFlow }: any = useFlow();
	const theme = useTheme();

	const { setData: setSelectedAssignment } = useData({
		key: 'talentTalentMobileSelectedAssignment',
	});

	const { setData: setEventDate } = useData({
		key: 'talentTalentMobileEventDate',
	});
	const { setData: setEventTime } = useData({
		key: 'talentTalentMobileEventTime',
	});

	const options = getData('talentTalentMobileAssignments');
	const timesheetData = getData('talentTalentMobileTimesheet');
	const timeclockStatus = getData('talentTalentMobileClockStatus');

	const handleChange = (event: any) => {
		setLabel(event.target.value);
		setSelectedAssignment(event.target.value);
		const timeWorkedByAssignment = getData(
			'TimeWorkedGetByTalentIDAssignmentIDDates',
		);
		setTimeWorked(timeWorkedByAssignment);
	};

	const clockChange = async () => {
		const eventDate = new Date().toISOString().slice(0, 10);
		setEventDate(eventDate);
		const eventTime = new Date()
			.toISOString()
			.slice(0, 19)
			.replace('T', ' ');
		setEventTime(eventTime);

		if (timeclockStatus === 'ClockedIn') {
			await runFlow('ClockOut');
		} else {
			await runFlow('ClockIn');
		}
	};

	const changeBackgroundColorByStatus = () => {
		if (timeclockStatus === 'ClockedIn') {
			return theme.palette.success.main;
		} else if (timeclockStatus?.isBreak) {
			return theme.palette.warning.main;
		} else {
			return 'white';
		}
	};

	return (
		<>
			<TimeClockPageStack
				direction="column"
				sx={{
					backgroundColor: changeBackgroundColorByStatus(),
				}}
			>
				<TimeClockPageTitle variant="h1">
					Talent Mobile Timeclock
				</TimeClockPageTitle>

				<Grid
					container
					spacing={2}
					padding={1}
					direction="row"
					justifyContent="center"
					alignItems="center"
				>
					<Grid item xs={2} md={2} lg={2}>
						<TimeclockDateLine />
					</Grid>

					<Grid
						item
						xs={6}
						md={6}
						lg={6}
						justifyContent="center"
						display={'flex'}
					>
						<TimeclockDate variant="h4">
							{getTodayLongDate()}
						</TimeclockDate>
					</Grid>

					<Grid item xs={2} md={2} lg={2}>
						<TimeclockDateLine />
					</Grid>
				</Grid>

				<TimeClockPageContainer>
					<FormControl sx={{ width: '95%' }}>
						<InputLabel id="demo-simple-select-label">
							{'Assignment'}
						</InputLabel>

						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={label}
							label="Assignment"
							onChange={handleChange}
						>
							{options?.map((item: any) => (
								<MenuItem key={item.value} value={item.value}>
									{item.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<TimeClock time={timeWorked} status={timeclockStatus} />

					<TimeClockButton
						size="large"
						variant="contained"
						onClick={clockChange}
						color={
							timeclockStatus === 'ClockedIn'
								? 'warning'
								: 'success'
						}
					>
						<Icon
							sx={{ mr: 1 }}
							color={'white'}
							icon={
								timeclockStatus === 'ClockedIn'
									? 'Pause'
									: 'PlayArrow'
							}
						/>
						{timeclockStatus === 'ClockedIn'
							? 'go on break'
							: 'clock-in'}
					</TimeClockButton>

					{timeclockStatus === 'ClockedIn' && (
						<TimeClockButton
							size="large"
							variant="contained"
							color="error"
							onClick={clockChange}
						>
							<Icon
								sx={{ mr: 1 }}
								color={'white'}
								icon={'Stop'}
							/>
							{'clock out'}
						</TimeClockButton>
					)}

					<TimeSheetTitle variant="h3">TIMESHEET</TimeSheetTitle>
					<Timesheet timesheetData={timesheetData} />
				</TimeClockPageContainer>
			</TimeClockPageStack>
		</>
	);
};

export default TimeClockPage;
