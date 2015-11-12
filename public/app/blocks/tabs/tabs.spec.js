const tabs = {
	active: '/',
	items: [
		{href: '/', text: 'Открытые'},
		{href: '/vote/', text: 'На голосовании'},
		{href: '/best/', text: 'Лучшие'}
	]
};

export const mock = tabs;

export default {
	cases: {
		'base': {
			attrs: tabs
		}
	}
};
