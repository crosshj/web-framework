import * as React from 'react';
import { Button as MuiButton } from '@mui/material';
import { useFlow, useGlobal } from '../../hooks';
import { Icon } from '..';
import { StateManager } from '../../../state/state';

export const Button = ({
	children,
	label,
	variant = 'secondary',
	type,
	target,
	param: localParam,
	redirect,
	gridVariant = 'half',
	actionType,
	leftIcon,
	leftIconColor,
	rightIcon,
	rightIconColor,
	...props
}: any) => {
	// const [loading] = StateManager.useListener('loading', undefined, {
	// 	note: 'for button',
	// });
	const loading = false;

	const [{ param: globalParam } = {}] = StateManager.useListener('menu');
	const { dispatch } = useGlobal() || {};
	// const { loading } = state || {};
	const { runFlow } = useFlow();

	//console.log(`Button loading: ${loading}`);

	const handleClick = async (e) => {
		let { row: rowSrc, useData } = props;
		const { __rowIndex, __rowStateKey } = props;
		if (
			typeof rowSrc === 'undefined' &&
			![__rowIndex, __rowStateKey].some((x) => typeof x === 'undefined')
		) {
			rowSrc = StateManager.get(`${__rowStateKey}.${__rowIndex}`);
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		if ((props?.href || '').startsWith('flow:')) {
			e.preventDefault && e.preventDefault();
			const flowName = props.href.replace(/^flow:/, '');
			const newSteps = [
				{
					key: flowName,
					args: { ...rowSrc, index: __rowIndex },
				},
			];
			StateManager.update('flowQueue', newSteps);
			return;
		}
		if (props?.href || '') {
			e.preventDefault && e.preventDefault();
			dispatch({ type: 'navigate', target: props.href });
			return;
		}
		let param = localParam || globalParam;

		// DEPRECATE: in favor of flowArgs
		if (useData && Object.keys(rowSrc || {}).length) {
			StateManager.update(useData, rowSrc);
		}

		if (props?.flow) {
			runFlow(props.flow);
			return;
		}
		dispatch({ type: actionType || type, target, param, redirect });
	};
	const getButtonVariant = () => {
		switch (variant) {
			case 'primary':
				return 'contained';
			case 'secondary':
				return 'outlined';
			case 'text':
				return 'text';
			case 'navigate':
				return 'navigate';
			default:
				return 'outlined';
		}
	};

	const buttonVariant = getButtonVariant();
	if (!label && !children) return null;
	return (
		<MuiButton
			variant={buttonVariant}
			type={type}
			onClick={handleClick}
			disabled={loading}
			sx={{
				width: 'max-content',
				minWidth: 'fit-content',
				maxWidth: { xs: 'unset', md: 'max-content' },
				textDecoration:
					buttonVariant === 'text' && target && 'underline',
			}}
			startIcon={
				leftIcon && <Icon icon={leftIcon} color={leftIconColor} />
			}
			endIcon={
				rightIcon && <Icon icon={rightIcon} color={rightIconColor} />
			}
			{...props}
		>
			{label || children}
		</MuiButton>
	);
};
