'use strict';

const feast = require('feast');
const app = feast.createSimpleApp({
	name: 'Ответы@Mail.Ru'
}, (req, res, next) => {
	if (/\/api\//.test(req.path)) {
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.write(JSON.stringify({foo: 'bar'}));
		res.end();
	} else {
		next();
	}
});
