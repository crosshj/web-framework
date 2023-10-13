import { Alert, Button, Snackbar as MuiSnackbar } from '@mui/material';
import { useState } from 'react';

export const Snackbar = ({ severity, message }) => {
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	return (
		<>
			<Button variant="text" onClick={handleClick}>
				{message}
			</Button>
			<MuiSnackbar
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
			>
				<Alert
					onClose={handleClose}
					severity={severity}
					elevation={6}
					variant="filled"
				>
					{message}
				</Alert>
			</MuiSnackbar>
		</>
	);
};
