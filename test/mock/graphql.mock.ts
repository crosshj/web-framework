import { defineMock } from 'vite-plugin-mock-dev-server';
import { ctxDashboard } from './graphql/ctxDashboard';
import { menuRoot } from './graphql/menuRoot';
import { ctxFeatures } from './graphql/ctxFeatures';
import { notMocked } from './graphql/notMocked';

export default defineMock({
	url: '/api/graphql',
	method: 'POST',
	response: (req, res, next) => {
		const { query, body, params, headers } = req;
		//console.log(query, body, params, headers);
		res.setHeader('Content-Type', 'application/json');

		if (typeof query['ctx:dashboard'] !== 'undefined') {
			res.end(ctxDashboard);
			return;
		}
		if (typeof query['ctx:features'] !== 'undefined') {
			res.end(ctxFeatures);
			return;
		}
		if (typeof query['menu:root'] !== 'undefined') {
			res.end(menuRoot);
			return;
		}

		res.end(notMocked(req));
	},
});
