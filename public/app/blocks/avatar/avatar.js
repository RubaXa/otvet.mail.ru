import feast from 'feast';
import template from 'feast-tpl!./avatar.html';

// Используемые блоки

/**
 * @class UIAvatar
 * @extends feast.Block
 */
export default feast.Block.extend(/** @lends UIAvatar# */{
	name: 'avatar',
	template: template,
	blocks: {}
});
