import feast from 'feast';
import template from 'feast-tpl!./application.html';

// Используемые блоки
import UILeaders from 'app/blocks/leaders/leaders';
import UILayout from 'app/blocks/layout/layout';
import UIPortalMenu from 'app/blocks/portal-menu/portal-menu';
import UIHeadline from 'app/blocks/headline/headline';

/**
 * @class UIApplication
 * @extends feast.Block
 */
export default feast.Block.extend(/** @lends UIApplication# */{
	name: 'application',
	template: template,
	blocks: {
		'headline': UIHeadline,
		'portal-menu': UIPortalMenu,
		'layout': UILayout,
		'leaders': UILeaders
	}
});
