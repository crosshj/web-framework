import { Box, IconButton } from '@mui/material';
import { ChevronLeft, Menu } from '@mui/icons-material';
import * as S from './styles';

import { Logo, Profile } from '..';
import { Link } from '../../../router';
import { useLayout } from '../../hooks';

export const Header = ({ menus }: any) => {
	const { open = false, handleToggleDrawer = null }: any = useLayout() || {};

	return (
		<Box sx={{ height: '70px' }}>
			<S.Toolbar>
				<S.HamburgerContainer>
					<IconButton
						size="large"
						edge="start"
						aria-label="open drawer"
						onClick={handleToggleDrawer}
						sx={{ color: 'white' }}
					>
						{open ? <ChevronLeft /> : <Menu />}
					</IconButton>
				</S.HamburgerContainer>
				<S.LogoContainer>
					<Link to="/home">
						<Box sx={{ width: '100%', height: '100%' }}>
							<Logo variant="single" color1="white" hasTag />
						</Box>
					</Link>
				</S.LogoContainer>
				<S.ProfileContainer>
					<Profile menus={menus} />
				</S.ProfileContainer>
			</S.Toolbar>
		</Box>
	);
};
