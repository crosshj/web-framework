import React from 'react';
import * as M from '@mui/material';
import { useData } from '../../../global/hooks/useData';
import { StateManager } from '../../../state/state';

const Tabs = (args: any = {}) => {
	const {
		children: tabChildren = [],
		useData: useDataProp,
		value: componentValue,
		toggle = true,
		...props
	} = args;
	const { setData, data: value } = useData({
		key: useDataProp,
	});

	const handleChange = (_e: any, tabIndex: any) => {
		if (tabIndex === null || typeof tabIndex === 'undefined') return;
		setData(Number(tabIndex));
	};

	// customized tab appearance
	if (toggle)
		return (
			<M.ToggleButtonGroup
				color="primary"
				value={Number(value)}
				onChange={handleChange}
				fullWidth
				exclusive
				{...props}
			>
				{tabChildren.map((x: any, i: any) => (
					<M.ToggleButton key={'tabs-' + i} value={i}>
						{x.props.label}
					</M.ToggleButton>
				))}
			</M.ToggleButtonGroup>
		);

	// default tab appearance (toggle === false)
	return (
		<M.Tabs value={Number(value)} onChange={handleChange} {...props}>
			{tabChildren.map((x: any, i: any) => (
				<M.Tab label={x.props.label} key={'tabs-' + i} />
			))}
		</M.Tabs>
	);
};
const TabContainer = (args: any) => {
	const { children: tabChildren = [], useData: useDataProp } = args;
	const [value = 0]: any = StateManager.useListener(useDataProp);

	const ActiveTabPanel = tabChildren[Number(value)];
	if (!ActiveTabPanel) return '';
	return ActiveTabPanel;
};

export { Tabs, TabContainer };
