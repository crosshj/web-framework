import { cloneElement } from 'react';
import { StateManager } from '../../../state/state';

/* DEPRECATE */
export const Switch = ({
	source,
	param,
	children,
	type,
	id,
	key,
	label,
	...rest
}) => {
	const [sourceValue] = StateManager.useListener(source);
	const value = sourceValue ? sourceValue[param] : 'client';

	return (
		<>
			{children
				?.filter((child) => child?.props?.props?.value === value)
				?.map((child) => cloneElement(child, { ...rest }))}
		</>
	);
};
