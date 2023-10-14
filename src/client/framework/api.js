import { parse } from 'graphql/language/parser.js';
import { print } from 'graphql/language/printer.js';

const extractOperationName = (document) => {
	let operationName = undefined;
	const operationDefinitions = document.definitions.filter(
		(definition) => definition.kind === `OperationDefinition`,
	);
	if (operationDefinitions.length === 1) {
		operationName = operationDefinitions[0]?.name?.value;
	}
	return operationName;
};
export const resolveRequestDocument = (document) => {
	if (typeof document === `string`) {
		let operationName = undefined;
		try {
			const parsedDocument = parse(document);
			operationName = extractOperationName(parsedDocument);
		} catch (err) {}
		return { query: document, operationName };
	}
	const operationName = extractOperationName(document);
	return { query: print(document), operationName };
};

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
		const { query, operationName } = resolveRequestDocument(args0);
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				operationName,
				query,
				variables: variablesRest,
				...argsRest,
			}),
		};
		return fetchAPI(url, options);
	},
};
