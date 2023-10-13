export const lightMode = {
	//palette values for light mode
	primary: {
		main: '#4D7721',
		dark: '#1E3605',
		light: '#4D7721',
		contrast: '#FFF',
		navbar: '#4D7721',
	},
	secondary: {
		main: '#2E3D78',
		dark: '#2C6C85',
		light: '#2F5B8F',
		contrast: '#FFF',
	},
	background: { default: '#FAFAFA', paper: '#FFF', contrast: '#FFF' },
	text: {
		primary: 'rgba(0, 0, 0, 0.87)',
		secondary: 'rgba(0,0,0,0.6)',
	},
	divider: 'rgba(0, 0, 0, 0.12)',

	warning: {
		main: '#F19812',
		dark: '#D26D10',
		light: '#F19812',
		contrast: '#FFF',
	},
	info: {
		main: '#0288D1',
		dark: '#01579B',
		light: '#03A9F4',
		contrast: '#FFF',
	},
	error: {
		main: '#C44F2D',
		dark: '#9F2F0E',
		light: '#EF5350',
		contrast: '#FFF',
	},
	success: {
		main: '#3F8D55',
		dark: '#1E3605',
		light: '#4D772',
		contrast: '#FFF',
	},
};

export const darkMode = {
	primary: {
		main: '#84BB38',
		dark: '#7DA547',
		light: '#FFFFFF',
		contrast: 'rgba(0,0,0,0.87)',
		navbar: '#656565',
	},
	secondary: {
		main: '#2E3D78',
		dark: '#2C6C85',
		light: '#2F5B8F',
		contrast: 'rgba(0,0,0,0.87)',
	},
	divider: 'rgba(255, 255, 255, 0.12)',
	text: {
		primary: '#fff',
		secondary: 'rgba(255, 255, 255, 0.7)',
		disabled: 'rgba(255, 255, 255, 0.5)',
	},
	background: {
		default: '#121212',
		paper: '#121212',
		contrast: '#222222',
	},
	error: {
		main: '#C44F2D',
		dark: '#9F2F0E',
		light: '#EF5350',
		contrast: '#FFF',
	},
	warning: {
		main: '#F19812',
		dark: '#D26D10',
		light: '#F19812',
		contrast: 'rgba(0,0,0,0.87)',
	},
	info: {
		main: '#29B6F6',
		dark: '#0288D1',
		light: '#4FC3F7',
		contrast: 'rgba(0,0,0,0.87)',
	},
	success: {
		main: '#66BB6A',
		dark: '#388E3C',
		light: '#81C784',
		contrast: 'rgba(0,0,0,0.87)',
	},
};

export const theme = (mode) => ({
	palette: {
		mode,
		...(mode === 'light' ? lightMode : darkMode),
	},
	typography: {
		fontFamily: ['Open Sans', 'sans-serif'].join(),
		h1: {
			fontWeight: '300',
			fontSize: '2rem',
			lineHeight: '116.7%',
		},
		h2: {
			fontWeight: '300',
			fontSize: '1.5rem',
			lineHeight: '120%',
		},
		h3: {
			fontWeight: '400',
			fontSize: '1.17rem',
			lineHeight: '116.7%',
		},
		h4: {
			fontWeight: '400',
			fontSize: '1rem',
			lineHeight: '123.5%',
		},
		h5: {
			fontWeight: '400',
			fontSize: '0.83rem',
			lineHeight: '133.4%',
		},
		h6: {
			fontWeight: '500',
			fontSize: '0.67rem',
			lineHeight: '160%',
		},
		body1: {
			fontWeight: '400',
			fontSize: '1rem',
			lineHeight: '150%',
		},
		body2: {
			fontWeight: '400',
			fontSize: '0.875rem',
			lineHeight: '143%',
		},
		subtitle1: {
			fontWeight: '400',
			fontSize: '1rem',
			lineHeight: '175%',
		},
		subtitle2: {
			fontWeight: '500',
			fontSize: '0.875rem',
			lineHeight: '157%',
		},
		overline: {
			fontWeight: '400',
			fontSize: '0.75rem',
			lineHeight: '266%',
		},
		caption: {
			fontWeight: '400',
			fontSize: '0.75rem',
			lineHeight: '166%',
		},
	},
	components: {
		MuiStack: {
			variants: [
				{
					props: { variant: 'fullScreen' },
					style: {
						justifyContent: 'center',
						alignItems: 'center',
						width: '99%',
						height: '99%',
					},
				},
			],
		},
		MuiIcon: {
			variants: [
				{
					props: { fontSize: 'x-large' },
					style: {
						fontSize: '3rem',
					},
				},
			],
		},
	},
});
