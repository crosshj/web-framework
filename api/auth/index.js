const { match } = require('../_utils');

const { Cache } = require('./_session');
const cache = new Cache();

const callbackHandler = require('./_callback')(cache);
const loginHandler = require('./_login')(cache);
const logoutHandler = require('./_logout')(cache);
const meHandler = require('./_me')(cache);
const notFoundHandler = (req, res) =>
	res.status(404).json({ error: 'route not found' });

module.exports = (req, res) => {
	const handler = match(req.url, ''.startsWith, {
		'/api/auth/callback': callbackHandler,
		'/api/auth/login': loginHandler,
		'/api/auth/logout': logoutHandler,
		'/api/auth/me': meHandler,
		default: notFoundHandler,
	});

	return handler(req, res);
};
