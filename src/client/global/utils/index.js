export * from './actionsList';
export * from './contextParser';
export * from './filterByType';
export * from './filterMenusByName';
export * from './findByType';
export * from './getColor.js';
export * from './getLastIdElement';
export * from './getNestedValue.js';
export * from './getNesting';
export * from './getddmmyyDate';
export * from './isDeepEqual';
export * from './nestData';
export * from './orderContextItems';
export * from './orderFormItems';
export * from './parseProperties';
export * from './parseValue.js';
export * from './setNestedValue.js';
export * from './stringUtils';
export * from './getFilledQueryParams';

export const clone =
	typeof structuredClone === 'undefined'
		? (x) => JSON.parse(JSON.stringify(x))
		: (x) => structuredClone(x);
