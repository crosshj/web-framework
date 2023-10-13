import { v4 as uuidv4 } from 'uuid';
import { graphQLClient } from '../../../framework/api';
import query from './query.gql';
import { StateManager } from '../../../state/state';

let menusLoading = false;

export const getMenus = async ({ state, setState, menuMap }) => {
	if (menusLoading) return [];

	menusLoading = true;
	//StateManager.update('loading', true);
	const { ContextProc = [] } = await graphQLClient.request(query, {
		tag: `menu:root`,
		input: [
			{
				name: 'ui.sp_UIContextGetComponentsByUserID',
				uuid: uuidv4(),
				args: JSON.stringify({
					key: 'root',
				}),
			},
		],
	});

	const { results } = ContextProc[0] || {};
	StateManager.update(
		'menus',
		results?.filter((x) => x.key !== 'root').map(menuMap),
	);
	menusLoading = false;
	//StateManager.update('loading', false);
	// setState({
	// 	menus: results?.filter((x) => x.key !== 'root').map(menuMap),
	// });
};
