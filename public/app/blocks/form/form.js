import feast from 'feast';
import template from 'feast-tpl!./form.html';

// Используемые блоки
import UIAvatar from 'app/blocks/avatar/avatar';

/**
 * @class UIForm
 * @extends feast.Block
 */
export default feast.Block.extend(/** @lends UIForm# */{
	name: 'form',
	template: template,
	blocks: {
		'avatar': UIAvatar
	}
});
