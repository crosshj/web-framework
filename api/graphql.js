const fetch = require('node-fetch');

const API_URL = process.env.NEXT_PUBLIC_API_URL;

module.exports = async (req, res) => {
	if (!req?.method === 'POST')
		return res.status(400).json({ error: 'method not supported' });
	if (!req?.cookies?.accessToken)
		return res.status(400).json({ error: 'not authorized' });
	try {
		const options = {
			method: 'POST',
			body: JSON.stringify(req.body),
			headers: {
				Authorization: 'Bearer ' + req?.cookies?.accessToken,
				'Content-Type': 'application/json',
			},
		};
		const apiRes = await fetch(API_URL, options).then((x) => x.json());
		res.json(apiRes);
	} catch (e) {
		console.log(e);
		res.status(500).json({ error: e.message });
	}
};
