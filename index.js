'use strict';

const feast = require('feast');
const request = require('request');

const app = feast.createSimpleApp({
	name: 'Ответы@Mail.Ru'
}, (req, res, next) => {
	if (/\/api\//.test(req.pathname)) {
		res.writeHead(200, {'Content-Type': 'application/json'});

		request('https://otvet.mail.ru' + req.pathname + req.search, (err, http, body) => {
			res.write(body);
			res.end();
		})
	} else {
		next();
	}
});
