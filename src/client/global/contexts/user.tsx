import React, { useState, useEffect } from 'react';

export const UserContext = React.createContext({});

const getUser = async (): Promise<any> => {
	const x = await fetch('/api/auth/me');
	return await x.json();
};

const tweakUser = (_user: any) => {
	let { picture, name, ...rest } = _user;
	if (
		typeof picture === 'string' &&
		typeof name === 'string' &&
		name.toLowerCase().startsWith('atworkrole+')
	) {
		name = name.split('+').pop() || '';
		picture = picture.replace(/at\.png$/, name.slice(0, 2) + '.png');
	}
	const user = { name, picture, ...rest };
	return user;
};

export const UserProvider = ({ children }: any) => {
	let [state, setState] = useState({ isLoading: true, user: undefined });

	useEffect(() => {
		getUser().then((user) => {
			setState({
				isLoading: false,
				user: tweakUser(user),
			});
		});
	}, []);

	return (
		<UserContext.Provider value={state}>{children}</UserContext.Provider>
	);
};
