import { Divider, List } from '@mui/material';
import { SidebarItem } from '../../../SidebarItem';
import { ToggleColorTheme } from '../../../ToggleColorTheme';

export const SidebarContent = ({
	menus,
	open,
	loading,
	handleToggleDrawer,
	activeMenu,
}: any) => {
	return (
		<List>
			{menus?.map((menu: any, _index: any) => {
				const isActive =
					menu?.TargetContentName &&
					(activeMenu?.startsWith(menu?.TargetContentName) ||
						('root.' + activeMenu).startsWith(
							menu?.TargetContentName,
						));
				return (
					<SidebarItem
						item={menu}
						open={open}
						disabled={loading}
						handleToggleDrawer={handleToggleDrawer}
						key={`${menu?.TargetContentName}-${menu?.menu_item_id}`}
						isActive={isActive}
					/>
				);
			})}
			<Divider />
			<ToggleColorTheme open={open} />
		</List>
	);
};
