import CloseIcon from '@mui/icons-material/Close';
import { Dialog as Modal, DialogContent, IconButton } from '@mui/material';
import { StateManager } from '../../../state/state';

export const Dialog = (props) => {
	const {
		useData: key,
		children,
		height = '90%',
		width = '80%',
		hideCloseButton = false,
	} = props;
	const [data, setData] = StateManager.useListener(key, false);

	const handleClose = () => setData(false);
	const fixDim = (dim) => {
		return (dim + '').includes('%' || 'px') ? dim : dim + 'px';
	};

	return (
		<Modal
			fullWidth={true}
			open={!!data}
			PaperProps={{
				style: {
					minHeight: fixDim(height),
					maxHeight: fixDim(height),
					minWidth: fixDim(width),
					maxWidth: fixDim(width),
				},
			}}
		>
			<DialogContent>
				<IconButton
					aria-label="close"
					onClick={handleClose}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
						display: hideCloseButton ? 'none' : '',
					}}
				>
					<CloseIcon />
				</IconButton>
				{children}
			</DialogContent>
		</Modal>
	);
};
