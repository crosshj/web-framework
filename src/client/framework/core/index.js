export * from './statefulComponents';

export const parseProps = (component) => {
	return component.properties
		.split(',')
		.map((x) => x.trim().split(':'))
		.reduce((acc, [key, value]) => {
			acc[key] = value;
			return acc;
		}, {});
};
