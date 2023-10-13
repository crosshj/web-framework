import * as M from '@mui/material';

export const Alert = (args) => {
	const {
		children,
		severity = 'info',
		title,
		label,
		textContent,
		key,
		...props
	} = args;
	return (
		<M.Alert
			{...props}
			severity={severity}
			icon={false}
			style={{ marginTop: '1em' }}
		>
			{(title || label) && <M.AlertTitle>{title || label}</M.AlertTitle>}
			{textContent ? (
				<div style={{ whiteSpace: 'pre-line' }}>{textContent}</div>
			) : (
				children
			)}
		</M.Alert>
	);
};
