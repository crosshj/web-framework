import * as React from 'react';
import { useApi, useUser } from './hooks';
//import { useModuleBuilder } from './hooks';
import { MainLayout } from './layouts/MainLayout';
import { LoadingScreen, WelcomeScreen } from './screens';
import { FlowProvider, GlobalProvider, LayoutProvider } from './contexts';
import { useEffect, useMemo } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { Framework } from '../framework';
//import { ToastContainer } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';

import { getMenus } from './services/getMenus';
import { parseProperties } from './utils';
import { SnakeCase } from './utils';
import { StateManager } from '../state/state';
import { getContext } from './services';

import getContextQuery from './graphql/getContext.gql';
import getListViewQuery from './graphql/getListView.gql';

const graphqlActions = {
	//getLayout: loader('./graphql/getMenus.gql'),
	getContext: getContextQuery,
	getListView: getListViewQuery,
};

const getIconFromProps = (props = '') => {
	let { icon = 'ArrowForwardIos' } = parseProperties(props) || {};
	return SnakeCase(icon);
};

const updateContext = ({ target = '', param = '' } = {}) => {
	getContext({
		setUIContext: (v: any) => StateManager.update('UIContext', v),
		key: target,
		param,
	});
};

const menuMap = (x: any, i: any) => ({
	menu_id: i,
	menu_name:
		{
			Page: 'left-nav',
			LinkMenu: 'top-hamburger',
		}[x.type as string] || 'left-nav',
	menu_item_id: i,
	menu_item_name: x.label,
	item_order: x.order,
	TargetContentName: x.key,
	icon: getIconFromProps(x?.properties),
});

export const Global = () => {
	const { user, isLoading } = useUser();
	const [state, setState] = StateManager.useListener(undefined, undefined, {
		note: 'global/index.jsx',
	});
	const [menus] = StateManager.useListener('menus', undefined, {
		note: 'global/index.jsx',
	});

	StateManager.subscribe('menu', updateContext, {
		note: 'global/index.jsx',
		unique: true,
	});

	useEffect(() => {
		if (!user) return;
		if (!state.menu) return;
		updateContext(state.menu);
	}, [user, state.menu]);

	const api = useApi({
		queryList: graphqlActions,
		setState,
	});

	const globalModule = useMemo(
		() => ({ state, setState, api }),
		[state, setState, api],
	);

	useEffect(() => {
		if (!user) return;
		if (menus?.length) return;
		getMenus({ menuMap } as any);
	}, [user, menus]);

	return (
		<>
			<LoadingScreen show={isLoading} />
			<LayoutProvider>
				{user ? (
					<GlobalProvider {...globalModule}>
						<FlowProvider>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<LoadingScreen show={!menus || !menus.length} />
								<MainLayout menus={menus}>
									<Framework />
									{/* <ToastContainer /> */}
								</MainLayout>
							</LocalizationProvider>
						</FlowProvider>
					</GlobalProvider>
				) : (
					<WelcomeScreen />
				)}
			</LayoutProvider>
		</>
	);
};

export * from './components';
export * from './contexts';
export * from './hooks';
export * from './layouts';
