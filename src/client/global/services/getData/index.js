import { v4 as uuidv4 } from 'uuid';
import query from './query.gql';
import { StateManager } from '../../../state/state';
import { enhanceResults } from '../../utils';
import { graphQLClient } from '../../../framework/api';

export const getData = async (source, params, setState, name) => {
	StateManager.update('loading', true);
	const { Data } = await graphQLClient.request(query, {
		tag: `data:${params?.key || name}`,
		input: [
			{
				name: source,
				uuid: uuidv4(),
				args: JSON.stringify({
					...params,
					...(source === 'listView' ? { key: name } : {}),
				}),
			},
		],
	});
	const { results } = Data[0];

	const parsedResults = enhanceResults(JSON.parse(results));

	//setState && setState({ [name]: parsedResults, loading: false });
	StateManager.update(name, parsedResults);
	StateManager.update('loading', false);
	return parsedResults;
};
