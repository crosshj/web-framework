import * as React from 'react';
import { useUser } from '../../hooks';
import Avatar from '@mui/material/Avatar';

import { useState } from 'react';

import { CircularProgress, Menu, MenuItem, Typography } from '@mui/material';
import { Link } from '../../../router';

export const Profile = ({ menus }: any) => {
	const { user, isLoading }: any = useUser();
	const [anchor, setAnchor] = useState(null);

	const handleClick = (e: any) => {
		setAnchor(e.target);
	};
	const handleClose = () => {
		setAnchor(null);
	};
	if (isLoading) return <CircularProgress />;

	return (
		<>
			<Avatar
				alt={user.name}
				src={user.picture}
				onClick={handleClick}
				sx={{ cursor: 'pointer' }}
			/>
			{menus?.length > 0 && (
				<Menu
					open={Boolean(anchor)}
					anchorEl={anchor}
					onClose={handleClose}
				>
					{menus?.map((menu: any) => (
						<Link
							key={menu?.menu_item_id}
							// to={menu?.TargetContentName}
							href="/api/auth/logout"
						>
							<MenuItem>
								<Typography variant="button" color="primary">
									{menu?.menu_item_name}
								</Typography>
							</MenuItem>
						</Link>
					))}
				</Menu>
			)}
		</>
	);
};
