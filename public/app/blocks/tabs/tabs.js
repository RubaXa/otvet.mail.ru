import feast from 'feast';
import template from 'feast-tpl!./tabs.html';

// Используемые блоки

/**
 * @class UITabs
 * @extends feast.Block
 */
export default feast.Block.extend(/** @lends UITabs# */{
	name: 'tabs',
	template: template,
	blocks: {}
});
