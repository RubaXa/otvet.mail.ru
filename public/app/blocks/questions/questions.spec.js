const list = [
	{
		"waslead": "0",
		"qtext": "Голландский, Французский, Норвежский, Шведский или Чешский?",
		"urlname": "languages",
		"polltype": "",
		"added": 0,
		"nick": "nikolai hepikov",
		"state": "A",
		"email": "hepikov@mail.ru",
		"anscnt": "0",
		"catname": "Лингвистика",
		"vip": 0,
		"id": "184112730",
		"cid": "1507",
		"kpd": 3.33,
		"usrid": "175914375"
	}, {
		"waslead": "0",
		"qtext": "помогите мне пожалуйста с домашним заданием!",
		"urlname": "edu_kid",
		"polltype": "",
		"added": 1,
		"nick": "Мария Биткова",
		"state": "A",
		"email": "vip.bitkova@bk.ru",
		"anscnt": "0",
		"catname": "Школы",
		"vip": 0,
		"id": "184112729",
		"cid": "1363",
		"kpd": 0,
		"usrid": "199882300"
	}, {
		"waslead": "0",
		"qtext": "Почему я начинаю рефлексионально улыбаться, когда узнаю интересную для себя информацию?",
		"urlname": "edu_other",
		"polltype": "",
		"added": 3,
		"nick": "Дмитрий Дедюшин",
		"state": "A",
		"email": "dima.dedyushin@mail.ru",
		"anscnt": "0",
		"catname": "Прочее образование",
		"vip": 0,
		"id": "184112728",
		"cid": "1367",
		"kpd": 0,
		"usrid": "181657710"
	}
];

export const mock = list;

export default {
	cases: {
		'base': {
			attrs: {
				items: list
			}
		}
	}
};
