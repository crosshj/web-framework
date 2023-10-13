import mutation from './mutation.gql';
import { graphQLClient } from '../../../framework/api';

const flattenForTag = (forTag, flat) => {
	try {
		if (typeof forTag === 'undefined') return;
		if (flat?.call) return `call:${flat?.call}`;
		return `submit:${flat?.args?.key}`;
	} catch (e) {}
};

export const flattenInput = (input, forTag) => {
	const { args, flatten, ...rest } = input[0];
	const flat = { ...rest, args: {} };
	if (typeof flatten !== 'undefined' && flatten === false) {
		const tag = flattenForTag(forTag, flat);
		if (tag) return tag;
		flat.args = args;
		return [flat];
	}
	const parsedArgs = JSON.parse(args);
	for (const [k, v] of Object.entries(parsedArgs)) {
		if (Array.isArray(v)) {
			flat.args[k] = v;
			continue;
		}
		if (typeof v !== 'object') {
			flat.args[k] = v;
			continue;
		}
		for (const [k1, v1] of Object.entries(v)) {
			if (typeof v !== 'object') continue;
			flat.args[k1] = v1;
		}
	}
	const tag = flattenForTag(forTag, flat);
	if (tag) return tag;

	flat.args = JSON.stringify(flat.args);
	return [flat];
};

export const submitFormData = async (input) => {
	if (!input || !input.length) throw new Error('form has no data');

	for (const inp of input) {
		if (!inp.name && typeof inp.call === 'string') {
			inp.name = 'ui.sp_Upsert';
		}
	}

	const body = {
		tag: flattenInput(input, 'forTag'),
		input: flattenInput(input),
	};
	const { FormProc } = await graphQLClient.request(mutation, body);

	let errorString = '';
	FormProc?.forEach(({ error, name }) => {
		if (!error) return;
		console.log('error: ' + error);
		errorString += `${name}: ${error}; `;
	});

	if (errorString) throw new Error(errorString);
	return FormProc;
};
