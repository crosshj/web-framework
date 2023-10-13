import * as React from 'react';
import * as S from './styles';
import { Stack } from '@mui/material';
import { Logo } from '../../components';

export const SplashScreen = ({ children, ...props }: any) => {
	return (
		<S.SplashScreen alignItems="center" justifyContent="center" {...props}>
			<Stack>
				<Logo variant="single" color1="white" />
				{children}
			</Stack>
		</S.SplashScreen>
	);
};
