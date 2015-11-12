import feast from 'feast';
import template from 'feast-tpl!./categories-nav.html';

// Используемые блоки

/**
 * @class UICategoriesNav
 * @extends feast.Block
 */
export default feast.Block.extend(/** @lends UICategoriesNav# */{
	name: 'categories-nav',
	template: template,
	blocks: {}
});
