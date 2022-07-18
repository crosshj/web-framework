const { Cookie, ParamString } = require('../_utils');

module.exports = (cache) => (req, res) => {
	const params = ParamString({
		client_id: process.env.AUTH0_CLIENT_ID,
		returnTo: process.env.NEXT_PUBLIC_BASE_URL,
	});
	const logoutUrl = `https://${process.env.AUTH0_DOMAIN}/v2/logout?${params}`;
	res.setHeader('Set-Cookie', [
		Cookie({
			accessToken: `deleted`,
			'Max-Age': -1,
			Path: '/api/',
			HttpOnly: true,
		}),
	]);
	return res.redirect(logoutUrl);
};
