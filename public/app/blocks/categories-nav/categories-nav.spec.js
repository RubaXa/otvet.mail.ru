import categories from 'app/categories';

const category = categories.filter(item => item.urlname == 'lifestyle')[0];

export const mock = category;

export default {
	cases: {
		'base': {
			attrs: {
				active: `/${category.categories[0].urlname}/`,
				category: category
			}
		}
	}
};
