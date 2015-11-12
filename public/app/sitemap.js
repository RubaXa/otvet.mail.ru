import api from './api';

import {mock as currentUser} from './blocks/user-card/user-card.spec';
import {default as categories, index as categoriesIndex} from './categories';

export default {
	model: {
		categories: () => categories,
		currentUser: () => currentUser,

		leaders: {
			match: ['#index', '#question'],
			fetch: () =>
				Promise.all([
					api.leaders.users.find({n: 8}),
					api.leaders.questions.find({n: 5})
				]).then(results => ({
					users: results[0],
					questions: results[1]
				}))
		}
	},

	'#index': {
		url: {
			pattern: '/:category?',
			params: {
				category: {
					validate: (value) => categoriesIndex[value]
				}
			}
		},

		model: {
			questions: (req) =>
				api.questions.find({n: 20, cat: req.params.category}),

			category: (req) =>
				({
					root: categoriesIndex[req.params.category]
				})
		}
	},

	'#ask': {
		url: '/ask'
	},

	'#top': {
		url: '/top',
		model: {
			top: () => api.leaders.users.find({n: 20})
		}
	},

	'#question': {
		url: '/question/:id',

		model: {
			question: (req) =>
				api.question.findOne(req.params.id),

			category: (req, waitFor) =>
				waitFor('question').then(q =>
					({
						active: q.cid,
						root: categoriesIndex[categoriesIndex[q.cid].parent]
					}))
		}
	}
};
