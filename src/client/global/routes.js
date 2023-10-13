import {
	HomeScreen,
	UiKit,
	WelcomeScreen,
	NotFound,
	LogoutScreen,
} from 'global/screens';

export const globalRoutes = [
	{
		path: '/',
		title: 'Home',
		component: <HomeScreen />,
		name: 'home',
	},

	{
		path: '/logout',
		title: 'Logout',
		component: <LogoutScreen />,
		name: 'logout',
	},
	{
		path: '/uikit',
		title: 'Ui Kit Demo',
		component: <UiKit />,
		name: 'uikit',
	},
	{
		name: 'notFound',
		component: <NotFound />,
	},
];

export const publicRoutes = [
	{
		path: '/',
		title: 'Welcome',
		component: <WelcomeScreen />,
		name: 'welcome',
	},
];
