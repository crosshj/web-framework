import { useEffect, useState } from 'react';
import * as S from './styles';
import { Stack } from '@mui/material';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import ErrorBoundary from '../../components/ErrorBoundary';
import { filterMenusByName } from '../../utils';

export const MainLayout = ({ menus, children }: any) => {
	const [headerMenus, setHeaderMenus] = useState([]);
	const [sidebarMenus, setSidebarMenus] = useState([]);

	useEffect(() => {
		setHeaderMenus(filterMenusByName(menus, 'top-hamburger'));
		setSidebarMenus(filterMenusByName(menus, 'left-nav'));
	}, [menus]);

	return (
		<S.MainLayout id="main-layout">
			<Header menus={headerMenus} />
			<S.Body direction="row">
				<Stack>
					<Sidebar menus={sidebarMenus} />
				</Stack>
				<S.Content
					alignItems="center"
					justifyContent="flexStart"
					flexGrow={1}
				>
					<ErrorBoundary>{children}</ErrorBoundary>
				</S.Content>
			</S.Body>
		</S.MainLayout>
	);
};
