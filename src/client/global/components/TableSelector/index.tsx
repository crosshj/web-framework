import { Stack } from '@mui/material';
import { ToggleButtonGroup } from '..';
import { StateManager } from '../../../state/state';

export const TableSelector = ({ targetQuery, options, children }) => {
	const [selectedListView] = StateManager.useListener('selectedListView');

	// const selectedOption = options.find(
	// 	(option) => option.targetQuery === selectedListView
	// );
	const filteredChildren = children.find(
		(child) => child?.props?.props?.targetQuery === selectedListView,
	);
	return (
		<Stack py={2} spacing={4}>
			<ToggleButtonGroup
				options={options}
				defaultTargetQuery={targetQuery}
			/>
			{filteredChildren}
			{/* <Table {...selectedOption} /> */}
		</Stack>
	);
};
