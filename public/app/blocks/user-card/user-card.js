import feast from 'feast';
import template from 'feast-tpl!./user-card.html';

// Используемые блоки

/**
 * @class UIUserCard
 * @extends feast.Block
 */
export default feast.Block.extend(/** @lends UIUserCard# */{
	name: 'user-card',
	template: template,
	blocks: {}
});
