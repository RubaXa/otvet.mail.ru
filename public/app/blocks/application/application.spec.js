import {mock as tabs} from 'app/blocks/tabs/tabs.spec';
import {mock as leaders} from 'app/blocks/leaders/leaders.spec';
import {mock as questions} from 'app/blocks/questions/questions.spec';
import {mock as currentUser} from 'app/blocks/user-card/user-card.spec';

function getPage(id, path) {
	return {
		name: 'Simple app',

		route: {
			is: function (target) {
				return target === id;
			}
		},

		request: {
			path: path
		},

		currentUser: currentUser,

		leaders: [
			leaders.question,
			leaders.category
		],

		tabs: {
			index: tabs.items
		},

		questions: questions
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
