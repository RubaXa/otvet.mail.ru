const user = {
	"email": "k.lebedev@corp.mail.ru",
	"name": "Константин Лебедев",
	"nickName": "RubaXa",
	"lvl": "2",
	"points": "137",
	"qstcnt": 0,
	"anscnt": 0,
	"id": "30457211",
	"maillogin": "k.lebedev",
	"rank" : "Ученик"
};

export const mock = user;

export default {
	cases: {
		'base': {
			attrs: {
				model: user
			}
		}
	}
};
