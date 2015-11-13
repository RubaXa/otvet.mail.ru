import categories from 'app/categories';
import {mock as tabs} from 'app/blocks/tabs/tabs.spec';
import {mock as leaders} from 'app/blocks/leaders/leaders.spec';
import {mock as questions} from 'app/blocks/questions/questions.spec';
import {mock as currentUser} from 'app/blocks/user-card/user-card.spec';

function getPage(id, path) {
	const model = {
		currentUser: currentUser,
		categories: categories,

		leaders: {
			users: leaders.category.models,
			questions: leaders.question.models
		},

		tabs: {
			index: tabs.items
		},

		questions: questions
	};

	return {
		name: 'Simple app',

		route: {
			is: (target) => target === id,
			model: model
		},

		request: {
			path: path
		},

		model: model
	};
}

export default {
	cases: {
		'index': {
			css: {'max-height': '400px', overflow: 'scroll'},
			attrs: getPage('#index', '/')
		},

		'ask': {
			css: {'max-height': '400px', overflow: 'scroll'},
			attrs: getPage('#ask', '/ask')
		}
	}
};
