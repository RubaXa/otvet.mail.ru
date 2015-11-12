import feast from 'feast';
import template from 'feast-tpl!./question.html';

// Используемые блоки
import UIAvatar from 'app/blocks/avatar/avatar';
import UIAnswer from 'app/blocks/answer/answer';

/**
 * @class UIQuestion
 * @extends feast.Block
 */
export default feast.Block.extend(/** @lends UIQuestion# */{
	name: 'question',
	template: template,

	blocks: {
		'avatar': UIAvatar,
		'answer': UIAnswer
	}
});
