import * as M from '@mui/material';

export const GridContainer = (args: any) => {
	const { children = [], spacing = 2 } = args;

	return (
		<M.Grid container spacing={spacing}>
			{children.map((child: any, i: any) => {
				const { xs = '4' } = child?.props?.props || {};

				return (
					<M.Grid item key={'gridContainerChild-' + i} xs={xs}>
						{child}
					</M.Grid>
				);
			})}
		</M.Grid>
	);
};
