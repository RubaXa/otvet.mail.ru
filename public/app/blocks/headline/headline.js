import feast from 'feast';
import template from 'feast-tpl!./headline.html';

// Используемые блоки

/**
 * @class UIHeadline
 * @extends feast.Block
 */
export default feast.Block.extend(/** @lends UIHeadline# */{
	name: 'headline',
	template: template,
	blocks: {}
});
