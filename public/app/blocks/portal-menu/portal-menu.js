import feast from 'feast';
import template from 'feast-tpl!./portal-menu.html';

// Используемые блоки

/**
 * @class UIPortalMenu
 * @extends feast.Block
 */
export default feast.Block.extend(/** @lends UIPortalMenu# */{
	name: 'portal-menu',
	template: template,
	blocks: {},

	attrChanged: {
		expandedCategories(state) {
			this[state ? '$on' : '$off'](this.el.ownerDocument, 'click', 'handleOutsideClick');
		}
	},

	handleOutsideClick(evt) {
		if (!this.refs.categories.contains(evt.target)) {
			this.set('expandedCategories', false);
		}
	}
});
