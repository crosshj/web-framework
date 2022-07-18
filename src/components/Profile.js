import { useUser } from '@auth0/nextjs-auth0';
import Avatar from '@mui/material/Avatar';
import { Loading } from './Loading';

import { useContext } from 'react';
import StateContext from '../State';

export default function Profile() {
	const { user, error, isLoading } = useUser();
	const {
		state: { invite, language: l },
	} = useContext(StateContext);

	if (isLoading) return <Loading />;
	if (error) return <div>{error.message}</div>;

	if (user) {
		return (
			<>
				<a href="/api/auth/logout" style={{ margin: 15 }}>
					{l.logout || 'Logout'}
				</a>
				<Avatar alt={user.name} src={user.picture} />
			</>
		);
	}

	return (
		<a
			href="/"
			onClick={(e) => {
				e.preventDefault();
				if (invite) {
					window.location.href = `/api/auth/login?returnTo=/invite/${invite}`;
					return;
				}
				window.location.href = `/api/auth/login`;
			}}
		>
			{l.login || 'Login'}
		</a>
	);
}
