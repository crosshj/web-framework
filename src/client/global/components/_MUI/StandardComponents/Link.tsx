import React from 'react';
import { Link as MuiLink } from '@mui/material';
import { useGlobal } from '../../../hooks';

export const Link = (args: any = {}) => {
	const { onClickShimmed, ...props } = args;

	const { dispatch } = useGlobal() || {};

	return (
		<MuiLink
			onClick={(e) => {
				onClickShimmed(e, { dispatch });
			}}
			{...props}
		></MuiLink>
	);
};
