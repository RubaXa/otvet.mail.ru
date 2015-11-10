import feast from 'feast';
import template from 'feast-tpl!./layout.html';

// Используемые блоки

/**
 * @class UILayout
 * @extends feast.Block
 */
export default feast.Block.extend(/** @lends UILayout# */{
	name: 'layout',
	template: template,
	blocks: {}
});
