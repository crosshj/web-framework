import { MenuItem as MuiMenuItem } from '@mui/material';
import { useGlobal } from '../../hooks';

export const MenuItem = ({ type, target, label }) => {
	const { dispatch } = useGlobal();
	if (!label) return null;

	const handleAction = () => {
		dispatch({ type, target });
	};

	return (
		<MuiMenuItem
			onClick={() =>
				handleAction({
					type,
					target,
				})
			}
		>
			{label}
		</MuiMenuItem>
	);
};
