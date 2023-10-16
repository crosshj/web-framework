import { Link as MuiLink } from '@mui/material';
import { useGlobal } from '../../../hooks/useGlobal';

export const Link = (args: any = {}) => {
	const { onClickShimmed, ...props } = args;

	const { dispatch }: any = useGlobal() || {};

	return (
		<MuiLink
			onClick={(e) => {
				onClickShimmed(e, { dispatch });
			}}
			{...props}
		></MuiLink>
	);
};
