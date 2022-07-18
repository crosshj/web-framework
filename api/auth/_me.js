const fetch = require('node-fetch');
const jwt_decode = require('jwt-decode');

const getProfile = (token) => {
	const url = `https://${process.env.AUTH0_DOMAIN}/userinfo`;
	const options = {
		method: 'GET',
		headers: { Authorization: 'Bearer ' + token },
	};
	return fetch(url, options).then((x) => x.json());
};

module.exports = (cache) => async (req, res) => {
	if (!req.cookies.accessToken) return res.json(false);

	//TODO: if accessToken is expired

	const decoded = jwt_decode(req.cookies.accessToken);
	const user = {
		//id: decoded['https://greenfield.com/identity/uuid'],
		roles: decoded['https://greenfield.com/claims/roles'],
		email: decoded['https://greenfield.com/identity/email'],
	};
	try {
		const profile = await getProfile(req.cookies.accessToken);
		const { nickname, picture } = profile || {};
		user.name = nickname || (user.email || '').split('@')[0];
		user.picture = picture;
		return res.json(user);
	} catch (e) {
		console.log(e);
		return res.status(400).json({ error: e.message });
	}
};
