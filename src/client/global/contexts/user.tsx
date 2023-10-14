import React, { useState, useMemo } from 'react';
import {
	UserProvider as Auth0UserProvider,
	useUser as useAuth0User,
} from '@auth0/nextjs-auth0';

export const UserContext = React.createContext({});

const CustomUserProvider = ({ children }: any) => {
	const { user: Auth0User, isLoading } = useAuth0User();
	const [loading] = useState(false);

	const user = useMemo(() => {
		let { name = '', picture = '' } = Auth0User || {};
		if (
			typeof picture === 'string' &&
			typeof name === 'string' &&
			name.toLowerCase().startsWith('atworkrole+')
		) {
			name = name.split('+').pop() || '';
			picture = picture.replace(/at\.png$/, name.slice(0, 2) + '.png');
		}
		return Auth0User
			? {
					...Auth0User,
					name,
					picture,
			  }
			: undefined;
	}, [Auth0User]);

	// useEffect(() => {
	// 	const cachedUser = localStorage.getItem('user');
	// 	if (cachedUser && cachedUser !== 'undefined') {
	// 		const parsedUser = JSON.parse(cachedUser);
	// 		setUserData(parsedUser);
	// 	}
	// }, []);

	// useEffect(() => {
	// 	setLoading(false);
	// 	if (!user) return;
	// 	setUserData(user);
	// 	localStorage.setItem('user', JSON.stringify(user));
	// }, [user]);

	// useEffect(() => {
	// 	if (!userData) {
	// 		setLoading(true);
	// 		return;
	// 	}
	// 	setLoading(false);
	// }, [userData]);

	const value = {
		user,
		isLoading: loading || isLoading,
	};

	return (
		<UserContext.Provider value={value}>{children}</UserContext.Provider>
	);
};

export const UserProvider = ({ children }: any) => {
	return (
		<Auth0UserProvider>
			<CustomUserProvider>{children}</CustomUserProvider>
		</Auth0UserProvider>
	);
};
