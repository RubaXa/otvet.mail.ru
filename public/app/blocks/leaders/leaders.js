import feast from 'feast';
import template from 'feast-tpl!./leaders.html';

// Используемые блоки
import UIAvatar from 'app/blocks/avatar/avatar';

/**
 * @class UILeaders
 * @extends feast.Block
 */
export default feast.Block.extend(/** @lends UILeaders# */{
	name: 'leaders',
	template: template,
	blocks: {
		'avatar': UIAvatar
	}
});
