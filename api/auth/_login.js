const { ParamString } = require('../_utils');
const { base64 } = require('../_utils');

let audience = process.env.NEXT_PUBLIC_API_URL;
if (audience.includes('greenfield-api-sandbox')) {
	audience = audience.replace(
		'greenfield-api-sandbox',
		'happy-brattain-aaa545'
	);
}

module.exports = (cache) => (req, res) => {
	// const state = cache.create({
	// 	returnTo: req.params.returnTo || '/',
	// });
	const state = base64.encode(
		JSON.stringify({
			returnTo: req.query?.returnTo || '/',
		})
	);

	const params = ParamString({
		response_type: 'code',
		//scope: 'openid offline-access profile api',
		scope: 'openid profile api',
		client_id: process.env.AUTH0_CLIENT_ID,
		redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
		audience,
		//domain: process.env.AUTH0_DOMAIN,
		//prompt: 'login',
		// connection: 'CONNECTION',
		screen_hint: 'signup',
		state,
	});

	const loginUrl = `https://${process.env.AUTH0_DOMAIN}/authorize?${params}`;

	return res.redirect(loginUrl);
};
