import { Icon } from '../../..';
import { useEffect, useState } from 'react';
import { TimeClockStatus, TimeDisplayer, TimeLabel, Timer } from './style';

const SIXTIETH = 1 / 60;

const TimeClock = ({ workedTime, status }: any) => {
	const [hours, setHours] = useState('00');
	const [minutes, setMinutes] = useState('00');
	const [currentStatus, setCurrentStatus] = useState('clocked-out');

	const updateTime = (time: any) => {
		setHours(Math.floor(time).toString().padStart(2, '0'));
		setMinutes(
			Math.round((time - Math.floor(time)) * 60)
				.toString()
				.padStart(2, '0'),
		);
	};

	useEffect(() => {
		let timer: any;
		setCurrentStatus(
			status === 'ClockedIn'
				? 'clocked-in'
				: status === 'onBreak'
				? 'on-break'
				: 'clocked-out',
		);

		if (isNaN(workedTime)) return;
		updateTime(undefined);

		if (status === 'ClockedIn') {
			timer = setInterval(() => {
				updateTime(workedTime + SIXTIETH);
			}, 60000);
		}
		return () => timer && clearInterval(timer);
	}, [workedTime, status]);

	return (
		<>
			<TimeClockStatus
				size="small"
				color={
					currentStatus === 'clocked-in'
						? 'success'
						: currentStatus === 'on-break'
						? 'warning'
						: 'error'
				}
				deleteIcon={
					<Icon
						icon={
							currentStatus === 'clocked-in'
								? 'PlayCircle'
								: currentStatus === 'on-break'
								? 'PauseCircle'
								: 'StopCircle'
						}
					/>
				}
				onDelete={() => {}}
				icon={
					<Icon
						icon={
							currentStatus === 'clocked-in'
								? 'PlayCircle'
								: currentStatus === 'on-break'
								? 'PauseCircle'
								: 'StopCircle'
						}
					/>
				}
				label={currentStatus}
			></TimeClockStatus>
			<Timer>
				<TimeDisplayer>{hours}</TimeDisplayer>
				<TimeLabel>hr</TimeLabel>
				<TimeDisplayer>{minutes}</TimeDisplayer>
				<TimeLabel>min</TimeLabel>
			</Timer>
		</>
	);
};

export default TimeClock;
