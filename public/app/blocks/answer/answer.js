import feast from 'feast';
import template from 'feast-tpl!./answer.html';

// Используемые блоки
import UIForm from 'app/blocks/form/form';
import UIAvatar from 'app/blocks/avatar/avatar';

/**
 * @class UIAnswer
 * @extends feast.Block
 */
export default feast.Block.extend(/** @lends UIAnswer# */{
	name: 'answer',
	template: template,
	blocks: {
		'avatar': UIAvatar,
		'form': UIForm
	}
});
