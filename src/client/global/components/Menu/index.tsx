import { KeyboardArrowDown } from '@mui/icons-material';
import { Menu as MuiMenu, Stack } from '@mui/material';

import { useState } from 'react';
import { Button } from '..';

export const Menu = ({ text, label, variant, children }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Button
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
				endIcon={<KeyboardArrowDown />}
				variant={variant}
			>
				{label}
			</Button>
			{children && (
				<MuiMenu
					id="basic-menu"
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					onClick={handleClose}
					MenuListProps={{
						'aria-labelledby': 'basic-button',
					}}
				>
					<Stack>{children}</Stack>
				</MuiMenu>
			)}
		</>
	);
};
