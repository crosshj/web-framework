export const clone =
	typeof structuredClone === 'undefined'
		? (x) => JSON.parse(JSON.stringify(x))
		: (x) => structuredClone(x);
