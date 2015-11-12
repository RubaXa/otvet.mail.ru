import feast from 'feast';
import template from 'feast-tpl!./questions.html';

// Используемые блоки
import UIAvatar from 'app/blocks/avatar/avatar';

/**
 * @class UIQuestions
 * @extends feast.Block
 */
export default feast.Block.extend(/** @lends UIQuestions# */{
	name: 'questions',
	template: template,
	blocks: {
		'avatar': UIAvatar
	}
});
