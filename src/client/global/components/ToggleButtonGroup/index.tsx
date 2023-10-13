import {
	ToggleButton,
	ToggleButtonGroup as MuiToggleButtonGroup,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import { useGlobal, useMount } from '../../hooks';
import { StateManager } from '../../../state/state';

export const ToggleButtonGroup = ({ options, defaultTargetQuery }) => {
	const [selectedListView] = StateManager.useListener('selectedListView');
	const [loading] = StateManager.useListener('loading');
	const { dispatch } = useGlobal();

	const handleChange = (e, target) => {
		if (!target) return;
		dispatch({ type: 'selectListView', target });
	};
	useMount(() => {
		dispatch({ type: 'selectListView', target: defaultTargetQuery });
	});

	const theme = useTheme();
	const matchesBigScreen = useMediaQuery(theme.breakpoints.up('md'));

	return (
		<MuiToggleButtonGroup
			value={selectedListView}
			exclusive
			onChange={handleChange}
			orientation={`${matchesBigScreen ? 'horizontal' : 'vertical'}`}
			sx={{ width: '100%' }}
		>
			{options?.map((option) => {
				return (
					<ToggleButton
						key={option?.targetQuery}
						value={option?.targetQuery}
						color="primary"
						disabled={loading}
						sx={{ width: '100%' }}
					>
						{option.label}
					</ToggleButton>
				);
			})}
		</MuiToggleButtonGroup>
	);
};
