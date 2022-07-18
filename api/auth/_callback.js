const fetch = require('node-fetch');
const { Cookie, base64 } = require('../_utils');

let audience = process.env.NEXT_PUBLIC_API_URL;
if (audience.includes('greenfield-api-sandbox')) {
	audience = audience.replace(
		'greenfield-api-sandbox',
		'happy-brattain-aaa545'
	);
}

const FormDataBody = (formData) => {
	return Object.entries(formData)
		.map(([k, v]) => `${k}=${v}`)
		.join('&');
};

const getAuth = (code) => {
	if (!code) throw new Error('Authorization code missing.');

	const url = `https://${process.env.AUTH0_DOMAIN}/oauth/token`;
	const options = {
		method: 'POST',
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
			'Cache-Control': 'no-cache',
		},
		body: FormDataBody({
			grant_type: 'authorization_code',
			client_id: process.env.AUTH0_CLIENT_ID,
			client_secret: process.env.AUTH0_CLIENT_SECRET,
			code,
			audience,
			redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
		}),
	};
	return fetch(url, options).then((x) => x.json());
};

module.exports = (cache) => async (req, res) => {
	let returnTo = '/';
	try {
		const {
			state: sessionKey,
			code,
			error,
			error_description,
		} = req?.query || {};
		// const session = cache.get(sessionKey) || {};
		// const returnTo = session.returnTo || '/';
		// delete session.returnTo;

		if (error) throw new Error(error + ': ' + error_description);

		({ returnTo = '/' } = sessionKey
			? JSON.parse(base64.decode(sessionKey))
			: {});

		const auth = await getAuth(code);

		// cache.set(sessionKey, { ...session, ...auth });
		// res.setHeader('Set-Cookie', [
		// 	Cookie({
		// 		session: sessionKey || '',
		// 		Expires: new Date('2022-12-12'),
		// 		HttpOnly: true,
		// 	}),
		// ]);

		if (!auth?.access_token) throw new Error('Access token missing.');

		const expires = auth.expires_in || 86400;
		res.setHeader('Set-Cookie', [
			Cookie({
				accessToken: `${auth.access_token}`,
				Expires: new Date(Date.now() + expires * 1000),
				Path: '/api/',
				HttpOnly: true,
			}),
		]);
		return res.redirect(returnTo);
	} catch (e) {
		console.log(e);
		res.setHeader('Set-Cookie', [
			Cookie({
				accessToken: ``,
				Expires: Date.now(),
				Path: '/api/',
				HttpOnly: true,
			}),
		]);
		return res.redirect(returnTo);
	}
};
