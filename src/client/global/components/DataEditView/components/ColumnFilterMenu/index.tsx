import { FormControlLabel, Menu, Stack, Switch } from '@mui/material';

export const ColumnFilterMenu = ({
	anchorEl,
	open,
	columns,
	handleClose,
	handleToggleShowColumn,
}) => {
	return (
		<Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
			{columns?.map((col, index) => {
				return (
					<Stack
						key={'column-filter-' + index}
						direction="row"
						alignItems="center"
						spacing={2}
						sx={{ px: 2 }}
					>
						<FormControlLabel
							disabled={col?.disabled}
							control={<Switch checked={col?.visible} />}
							onChange={(e) => {
								handleToggleShowColumn(
									col.label,
									e.target.checked
								);
								handleClose();
							}}
							label={col.label}
						/>
					</Stack>
				);
			})}
		</Menu>
	);
};
