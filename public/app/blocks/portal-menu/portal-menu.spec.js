import categories from 'app/categories';

const user = {
	id: 123,
	name: 'Лебедев Константин',
	email: 'k.lebedev@corp.mail.ru'
};

export default {
	cases: {
		'base': {
			attrs: {
				user: user,
				unread: 3,
				categories: categories
			}
		},

		'ask': {
			attrs: {
				user: user,
				active: '/ask'
			}
		},

		'leaders': {
			attrs: {
				user: user,
				active: '/top'
			}
		},

		'profile': {
			attrs: {
				user: user,
				active: '/profile/id' + user.id
			}
		}
	}
};
