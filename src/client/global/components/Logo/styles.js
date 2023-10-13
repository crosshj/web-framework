import { styled } from '@mui/system';

export const Logo = styled('div')(({ variant, color1, color2, theme }) => ({
	'& .cls-1': {
		fill:
			variant === 'single'
				? color1 || theme.palette.primary.main
				: color1 || theme.palette.secondary.main,
	},

	'& .cls-2': {
		fill:
			variant === 'single'
				? color1 || theme.palette.primary.main
				: color2 || theme.palette.primary.default,
	},
}));

export const Tag = styled('div')(({ variant }) => ({
	display: 'block',
	position: 'absolute',
	background: variant === 'BETA' ? '#ff000094' : '#0099ff',
	transform:
		variant === 'BETA'
			? 'translate(142px,-21px)'
			: 'translate(146px,-21px)',
	color: 'white',
	padding: '0px 6px',
	fontSize: '10px',
	borderRadius: '3px',
	lineHeight: '15px',
}));
