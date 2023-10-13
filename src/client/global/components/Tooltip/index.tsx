import { Stack, Tooltip as MuiTooltip } from '@mui/material';
import { forwardRef } from 'react';
import { Icon } from '..';
import * as S from './styles';

export const Tooltip = ({ children, ...props }) => {
	const Component = forwardRef((childrenProps, ref) => (
		<S.Div {...childrenProps} ref={ref}>
			<Icon icon="info_rounded" />
		</S.Div>
	));

	return (
		<Stack sx={{ flexGrow: 1 }}>
			<MuiTooltip
				{...props}
				placement="right"
				sx={{ ml: 2, textAlign: 'left', width: 'fit-content' }}
			>
				<Component />
			</MuiTooltip>
		</Stack>
	);
};
