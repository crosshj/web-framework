import { amber } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

//const mode = prefersDarkMode ? 'dark' : 'light';
// const mode = 'dark';
//const mode = 'light';

const theme = (mode) =>
	createTheme({
		palette: {
			mode,
			...(mode === 'light'
				? {
						//palette values for light mode
						primary: amber,
						divider: amber[200],
						text: {
							primary: '#605000',
							secondary: amber[900],
						},
						background: {
							default: '#fff',
							//paper: '#fffffa',
							paper: amber[200],
						},
				  }
				: // palette values for dark mode
				  {}),
		},
	});

export default theme;
