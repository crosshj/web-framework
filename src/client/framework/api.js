import { GraphQLClient } from 'graphql-request';

export const graphQLClient = {
	request: (...args) => {
		const [args0, variables, ...argsRest] = args;
		const { tag, ...variablesRest } = variables || {};
		const queryParams = typeof tag !== 'undefined' ? `?${tag}` : '';
		const client = new GraphQLClient(
			`${process.env.REACT_APP_BASE_URL}/api/graphql${queryParams}`
		);
		return client.request(args0, variablesRest, ...argsRest);
	},
};
