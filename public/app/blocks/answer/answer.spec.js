import {mock as question} from 'app/blocks/question/question.spec';

export default {
	cases: {
		'base': {
			attrs: {
				model: question.answers[0]
			}
		},

		'comments': {
			attrs: {
				expanded: true,
				model: question.answers[1]
			}
		}
	}
};
