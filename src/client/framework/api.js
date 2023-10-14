const fetchAPI = async (url, options) => {
	try {
		const result = await fetch(url, options);
		return await result.json();
	} catch (err) {
		console.info(err);
	}
};

export const graphQLClient = {
	request: (...args) => {
		const [args0, variables, ...argsRest] = args;
		const { tag, ...variablesRest } = variables || {};
		const queryParams = typeof tag !== 'undefined' ? `?${tag}` : '';
		const url = `/api/graphql${queryParams}`;
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: args0,
				variables: variablesRest,
				...argsRest,
			}),
		};
		return fetchAPI(url, options);
	},
};
