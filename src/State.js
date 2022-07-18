import React, { useEffect } from 'react';
import { UserProvider } from '@auth0/nextjs-auth0';
import { loader } from 'graphql.macro';
import { GraphQLClient } from 'graphql-request';
import detectBrowserLanguage from 'detect-browser-language';
import languageStrings from './language';
const graphQLClient = new GraphQLClient('/api/graphql');

export const queries = {
	MobileMe: loader('./queries/MobileMe.gql'),
	AcceptInvite: loader('./queries/AcceptInvite.gql'),
	CreateBeekeeper: loader('./queries/CreateBeekeeper.gql'),
};

const initialState = {
	invite: document?.location?.pathname
		.split('/invite/')
		.pop()
		.replace(/\//g, ''),
	loading: false,
	language:
		languageStrings[detectBrowserLanguage() || 'en-US'] ||
		languageStrings['en-US'],
	MobileMe: undefined,
	AcceptInvite: undefined,
	MobileCreateBeekeeper: undefined,
	GroupMember: [],
};

export const StateContext = React.createContext(initialState);

const GraphQL = async ({ setState, query, variables = {} }) => {
	try {
		const queryDef = queries[query];
		setState({ loading: true });
		const results = await graphQLClient.request(queryDef, variables);
		setState({ loading: false, ...results });
	} catch (error) {
		setState({ loading: false, error });
	}
};

export const StateProvider = ({ children }) => {
	const [state, updateState] = React.useState(initialState);
	const setState = (update) => updateState({ ...state, ...update });
	const Query = (query) => (variables) =>
		GraphQL({ setState, query, variables });
	const api = Object.keys(queries).reduce(
		(a, x) => ({ ...a, [x]: Query(x) }),
		{}
	);
	const setLanguage = (lang) => setState({ language: languageStrings[lang] });
	//eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(api.MobileMe, []);

	return (
		<UserProvider>
			<StateContext.Provider
				value={{
					state,
					api,
					setLanguage,
				}}
			>
				{children}
			</StateContext.Provider>
		</UserProvider>
	);
};

export default StateContext;
