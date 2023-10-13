import * as React from 'react';
import { Button as MuiButton } from '@mui/material';
import { useFlow, useGlobal } from '../../../hooks';
import { Icon } from '../..';
import { StateManager } from '../../../../state/state';

const buttonVariantMap = {
	text: 'text',
	primary: 'contained',
	secondary: 'outlined',
	navigate: 'navigate',

	default: 'outlined',
};

export const Button = (args: any = {}) => {
	const {
		children,
		label,
		variant = 'secondary',
		target,
		onClickShimmed,
		sx,
		...props
	} = args;

	const loading = false;

	const [{ param: globalParam } = {}]: any = StateManager.useListener('menu');
	const { dispatch } = useGlobal() || {};
	const { runFlow } = useFlow();

	if (!label && !children) return null;

	const _variant =
		(buttonVariantMap as any)[variant.toLowerCase()] ||
		buttonVariantMap['default'];

	const startIcon = args.leftIcon && (
		<Icon icon={args.leftIcon} color={args.leftIconColor || ''} />
	);
	const endIcon = args.rightIcon && (
		<Icon icon={args.rightIcon} color={args.rightIconColor || ''} />
	);

	return (
		<MuiButton
			disabled={loading}
			startIcon={startIcon}
			endIcon={endIcon}
			variant={_variant}
			color="primary"
			label={label}
			onClick={(e) => {
				onClickShimmed(e, { runFlow, dispatch, globalParam });
			}}
			{...props}
			sx={{
				width: 'max-content',
				minWidth: 'fit-content',
				maxWidth: { xs: 'unset', md: 'max-content' },
				textDecoration: _variant === 'text' && target && 'underline',
				...sx,
			}}
		>
			{label ? label : children}
		</MuiButton>
	);
};
