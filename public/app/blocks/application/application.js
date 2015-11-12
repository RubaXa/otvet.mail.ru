import feast from 'feast';
import template from 'feast-tpl!./application.html';

// Используемые блоки
import UICategoriesNav from 'app/blocks/categories-nav/categories-nav';
import UIQuestion from 'app/blocks/question/question';
import UIQuestions from 'app/blocks/questions/questions';
import UITabs from 'app/blocks/tabs/tabs';
import UIForm from 'app/blocks/form/form';
import UIUserCard from 'app/blocks/user-card/user-card';
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
		'leaders': UILeaders,
		'user-card': UIUserCard,
		'form': UIForm,
		'tabs': UITabs,
		'question': UIQuestion,
		'questions': UIQuestions,
		'categories-nav': UICategoriesNav
	}
});
