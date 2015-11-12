import feast from 'feast';

export default {
	leaders: {
		users: feast.resource('/api/v2/usrrating', {body: 'rating'}),
		questions: feast.resource('/api/v2/leadqst', {body: 'qst'})
	},

	question: feast.resource('/api/v2/question', {id: 'qid'}),
	questions: feast.resource('/api/v2/questlist', {body: 'qst'})
};

