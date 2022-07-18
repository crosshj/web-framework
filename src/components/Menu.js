import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Box from '@mui/material/Box';

const drawerWidth = 240;

export default function Menu({ routes, className, open }) {
	return (
		<div
			className={className}
			style={{ width: open ? drawerWidth : '70px' }}
			data-testid="menu"
		>
			<Box
				sx={{
					width: '100%',
					height: '100%',
					borderRight: (theme) => {
						//console.log(theme);
						return '1px solid ' + theme.palette.divider;
					},
				}}
			>
				<List>
					{routes?.primary.map((text, index) => (
						<ListItemButton
							key={text}
							sx={{
								minHeight: 48,
								justifyContent: open ? 'initial' : 'center',
								px: 2.5,
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : 'auto',
									justifyContent: 'center',
								}}
							>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText
								primary={text}
								sx={{ opacity: open ? 1 : 0 }}
							/>
						</ListItemButton>
					))}
				</List>
				<Divider />
				<List>
					{routes?.secondary.map((text, index) => (
						<ListItemButton
							key={text}
							sx={{
								minHeight: 48,
								justifyContent: open ? 'initial' : 'center',
								px: 2.5,
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : 'auto',
									justifyContent: 'center',
								}}
							>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText
								primary={text}
								sx={{ opacity: open ? 1 : 0 }}
							/>
						</ListItemButton>
					))}
				</List>
			</Box>
		</div>
	);
}
