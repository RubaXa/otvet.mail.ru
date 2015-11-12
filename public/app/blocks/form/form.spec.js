import categories from 'app/categories';

export default {
	cases: {
		'Быстрый вопрорс': {
			attrs: {
				mode: 'fast-ask'
			}
		},

		'Комментарий': {
			attrs: {
				mode: 'comment'
			}
		},

		'Вопрорс': {
			attrs: {
				mode: 'ask',
				type: 'question',
				categories: categories.slice(1),
				variants: ['', '', '']
			}
		}
	}
};
