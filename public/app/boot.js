import Pilot from 'pilotjs';
import sitemap from './sitemap';

// Used blocks
import UIApplication from 'app/blocks/application/application';

// Router
const router = Pilot.create(sitemap);

// Export `boot` method
export default function (el, data) {
	const getViewAttrs = () => ({
		name: data.name,
		router: router,
		route: router.route,
		request: router.request
	});
	const view = new UIApplication(getViewAttrs());

	router.view = view;
	router.on('route', () => {
		view.set(getViewAttrs());
	});

	view.renderTo(el);

	// Setup History API & click
	document.onclick = (evt) => {
		let el = evt.target;

		if (!evt.isDefaultPrevented() && !(evt.metaKey || evt.shiftKey || evt.ctrlKey || evt.altKey)) {
			do {
				if ((el.nodeName === 'A') && (el.target !== '_blank') && (el.host === location.host)) {
					if (history.pushState) {
						router.nav(el.href);
						history.pushState(null, null, el.href);
					} else {
						location.hash = '#!' + el.href.split('#!').pop();
					}

					evt.preventDefault();
					break;
				}
			} while (el = el.parentNode);
		}
	};

	window[('onpopstate' in window) ? 'onpopstate' : 'onhashchange'] = () => {
		router.nav(location.toString().split('#!').pop());
	};

	// Run
	return router.nav(location.toString().split('#!').pop()).then(() => router);
};
