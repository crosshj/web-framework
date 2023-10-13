import * as _ from 'lodash';

const mockSyntax = {
	standard: 'WHEN showEducation IS true THEN shown ELSE hidden', // WHEN w IS x THEN y ELSE z ->
	short: 'WHEN showEducation THEN shown ELSE hidden', // WHEN x THEN show ELSE hidden -> WHEN x IS true THEN shown ELSE hidden
	shorter: 'WHEN showEducation', // WHEN x -> WHEN x THEN true ELSE false
	withSingleQuotes:
		"WHEN childDedsCreateDedMethodSelected IS 'hi there' THEN flex ELSE none",
	withDoubleQuotes:
		'WHEN childDedsCreateDedMethodSelected IS "hi there" THEN flex ELSE none',
	propertyNames: 'WHEN global_test1 IS global_test2 THEN flex ELSE none',
	propertyNamesRowGlobal:
		'WHEN row_test1 IS global_test1 THEN flex ELSE none',
	propertyNamesGlobalRow:
		'WHEN global_test1 IS row_test1 THEN flex ELSE none',
	nested: 'WHEN nested.child THEN string1 ELSE string2',
	withDebug: 'DEBUG WHEN showEducation',
	withDebugError: 'debug WHEN showEducation',
};

const mockState = {
	global: {
		test1: '1',
		test2: '1',
	},
	row: {
		status: '1',
	},
};

const whenParser = (inputString) => {
	let input = inputString;
	const result = { debug: false };
	const hasDebug = input.toUpperCase().includes('DEBUG');
	// The following regex will identify a UPPERCASE name followed by a lowercase value
	const regex = /([A-Z][a-zA-Z]*)\s((?:"[^"]*")|(?:'[^']*')|\S+)/g;

	if (hasDebug) {
		input = input.replace('DEBUG', '');
		result.debug = true;
	}

	const matches = input.matchAll(regex);
	for (const match of matches) {
		const key = match[1].toLowerCase().trim();
		const value = match[2].trim().replace(/["']/g, '');
		result[key] = value;
	}

	return result;
};

//whenParser(mockSyntax.standard);
//whenParser(mockSyntax.short);
//whenParser(mockSyntax.shorter);
//whenParser(mockSyntax.withSingleQuotes);
//whenParser(mockSyntax.withDoubleQuotes);
//whenParser(mockSyntax.propertyNames);
//whenParser(mockSyntax.nested);
//whenParser(mockSyntax.withDebug);
//whenParser(mockSyntax.withDebugError);

const whenRunner = ({ inputString, state, logger = console.log }) => {
	const conditions = whenParser(inputString);
	const { when, is } = conditions;

	function isModifiers(args) {
		const { whenPrefixModifier, whenKey, isPrefixModifier, isKey } = args;

		const modifiers = {
			global: () => {
				const stateClone = _.cloneDeep(state);
				const peekState = _.findKey(
					state,
					(o) => o[whenKey] === o[isKey],
				);

				console.log({
					whenPrefixModifier,
					whenKey,
					isPrefixModifier,
					isKey,
					stateClone,
					peekState,
				});
			},
			row: () => {},
		};
		return modifiers[isPrefixModifier](isKey) || undefined;
	}

	if (when && is) {
		const [whenPrefixModifier, whenKey] = when.split('_');
		const [isPrefixModifier, isKey] = is.split('_');
		isModifiers({ whenPrefixModifier, whenKey, isPrefixModifier, isKey });
	}
};

whenRunner({ inputString: mockSyntax.propertyNames, state: mockState });
whenRunner({
	inputString: mockSyntax.propertyNamesGlobalRow,
	state: mockState,
});

//whenRunner({ inputString: mockSyntax.shorter, state: mockState }); // it should not console.log
