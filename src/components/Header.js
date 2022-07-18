import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Profile from './Profile';

export default function Header({
	className,
	open,
	handleDrawerOpen,
	handleDrawerClose,
	hamburger,
}) {
	return (
		<div className={className}>
			<Toolbar
				sx={{
					// bgcolor: 'primary.main',
					bgcolor: 'background.paper',
					display: 'flex',
					borderBottom: (theme) => {
						//console.log(theme);
						return '1px solid ' + theme.palette.divider;
					},
				}}
			>
				<div style={{ flex: 1 }}>
					{hamburger && (
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="open drawer"
							sx={{ mr: 2 }}
							onClick={
								open ? handleDrawerClose : handleDrawerOpen
							}
						>
							{open ? <ChevronLeftIcon /> : <MenuIcon />}
						</IconButton>
					)}
				</div>
				<div
					style={{
						flex: 1,
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<Typography
						variant="h5"
						noWrap
						component="div"
						sx={{ display: { sm: 'block' } }}
					>
						Greenfield
					</Typography>
				</div>
				<div
					style={{
						flex: 1,
						display: 'flex',
						justifyContent: 'end',
						alignItems: 'center',
					}}
				>
					<Profile />
				</div>
			</Toolbar>
		</div>
	);
}
