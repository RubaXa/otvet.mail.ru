(function (define) {/**
 * @author RubaXa <trash@rubaxa.org>
 * @license MIT
 */
(function () {
	"use strict";

	var
		RSPACE = /\s+/,

		hasOwn = ({}).hasOwnProperty,

		returnTrue = function () {
			return true;
		}
	;


	/**
	 * Retrieve list of listeners
	 * @param   {Object}  target
	 * @param   {String}  name
	 * @returns {Array}
	 */
	function getListeners(target, name) {
		var list = target.__emList;

		name = name.toLowerCase();

		if (list === void 0) {
			list = target.__emList = {};
			list[name] = [];
		}
		else if (list[name] === void 0) {
			list[name] = [];
		}

		return list[name];
	}


	/**
	 * @class Event
	 * @param {String|Object|Event} type
	 * @constructor
	 */
	function Event(type) {
		if (type instanceof Event) {
			return type;
		}

		if (type.type) {
			for (var key in type) {
				if (hasOwn.call(type, key)) {
					this[key] = type[key];
				}
			}

			type = type.type;
		}

		this.type = type.toLowerCase();
	}

	Event.fn = Event.prototype = {
		constructor: Event,

		isDefaultPrevented: function () {
			return false;
		},

		preventDefault: function () {
			this.isDefaultPrevented = returnTrue;
		}
	};


	/**
	 * @class Emitter
	 * @constructor
	 */
	var Emitter = function () {
	};
	Emitter.fn = Emitter.prototype = {
		__lego: Emitter,
		constructor: Emitter,


		/**
		 * Attach an event handler function for one or more events.
		 * @param   {String}    events  One or more space-separated event types.
		 * @param   {Function}  fn      A function to execute when the event is triggered.
		 * @returns {Emitter}
		 */
		on: function (events, fn) {
			events = events.split(RSPACE);
			var n = events.length, list;
			while (n--) {
				list = getListeners(this, events[n]);
				list.push(fn);
			}
			return this;
		},


		/**
		 * Remove an event handler.
		 * @param   {String}    [events]  One or more space-separated event types.
		 * @param   {Function}  [fn]      A handler function previously attached for the event(s).
		 * @returns {Emitter}
		 */
		off: function (events, fn) {
			if (events === void 0) {
				this.__emList = events;
			}
			else {
				events = events.split(RSPACE);

				var n = events.length;
				while (n--) {
					var list = getListeners(this, events[n]), i = list.length, idx = -1;

					if (arguments.length === 1) {
						list.splice(0, 1e5); // dirty hack
					} else {
						if (list.indexOf) {
							idx = list.indexOf(fn);
						} else { // old browsers
							while (i--) {
								if (list[i] === fn) {
									idx = i;
									break;
								}
							}
						}

						if (idx !== -1) {
							list.splice(idx, 1);
						}
					}
				}
			}

			return this;
		},


		/**
		 * Attach a handler. The handler is executed at most once.
		 * @param   {String}    events  One or more space-separated event types.
		 * @param   {Function}  fn      A function to execute at the time the event is triggered.
		 * @returns {Emitter}
		 */
		one: function (events, fn) {
			return this.on(events, function __() {
				this.off(events, __);
				return fn.apply(this, arguments);
			});
		},


		/**
		 * Execute all handlers attached to an element for an event
		 * @param   {String}  type    One event types
		 * @param   {Array}   [args]  An array of parameters to pass along to the event handler.
		 * @returns {*}
		 */
		emit: function (type, args) {
			var list = getListeners(this, type),
				i = list.length,
				fn,
				ctx,
				retVal
			;

			type = 'on' + type.charAt(0).toUpperCase() + type.substr(1);

			if (typeof this[type] === 'function') {
				retVal = this[type].apply(this, [].concat(args));
			}

			if (i > 0) {
				args = [].concat(args);

				while (i--) {
					fn = list[i];
					ctx = this;

					if (fn.handleEvent !== void 0) {
						ctx = fn;
						fn = fn.handleEvent;
					}

					retVal = fn.apply(ctx, args);
				}
			}

			return retVal;
		},


		/**
		 * Execute all handlers attached to an element for an event
		 * @param   {String}  type    One event types
		 * @param   {Array}   [args]  An array of additional parameters to pass along to the event handler.
		 * @returns {Emitter}
		 */
		trigger: function (type, args) {
			var evt = new Event(type);
			evt.target = evt.target || this;
			evt.result = this.emit(evt.type, [evt].concat(args));
			return this;
		}
	};


	/**
	 * Apply to object
	 * @param  {Object}  target
	 */
	Emitter.apply = function (target) {
		target.on = Emitter.fn.on;
		target.off = Emitter.fn.off;
		target.one = Emitter.fn.one;
		target.emit = Emitter.fn.emit;
		target.trigger = Emitter.fn.trigger;
		return    target;
	};


	// exports
	Emitter.Event = Event;
	Emitter.getListeners = getListeners;

	if (typeof define === "function" && define.amd) {
		define('Emitter',[],function () {
			return Emitter;
		});
	} else if (typeof module != "undefined" && module.exports) {
		module.exports = Emitter;
	} else {
		window.Emitter = Emitter;
	}
})();

define('src/querystring',[], function () {
	'use strict';

	var encodeURIComponent = window.encodeURIComponent;
	var decodeURIComponent = window.decodeURIComponent;


	function _stringifyParam(key, val, indexes) {
		/* jshint eqnull:true */
		if (val == null || val === '' || typeof val !== 'object') {
			return encodeURIComponent(key) +
				(indexes ? '[' + indexes.join('][') + ']' : '') +
				(val == null || val === '' ? '' : '=' + encodeURIComponent(val));
		}
		else {
			var pairs = [];

			for (var i in val) {
				if (val.hasOwnProperty(i)) {
					pairs.push(_stringifyParam(key, val[i], (indexes || []).concat(i >= 0 ? '' : encodeURIComponent(i))));
				}
			}

			return pairs.join('&');
		}
	}



	/**
	 * @module queryString
	 */
	var queryString = /** @lends queryString */{
		/**
		 * Parse query string
		 * @param   {string} search
		 * @returns {Object}
		 */
		parse: function (search) {
			var query = {};

			if (typeof search === 'string') {
				if (/^[?#]/.test(search)) {
					search = search.substr(1);
				}

				var pairs = search.trim().split('&'),
					i = 0,
					n = pairs.length,
					pair,
					name,
					val;

				for (; i < n; i++) {
					pair = pairs[i].split('=');
					name = pair.shift().replace('[]', '');
					val = pair.join('=');

					if (val === void 0){
						val = '';
					}
					else {
						try {
							val = decodeURIComponent(val);
						}
						catch (err) {
							val = unescape(val);
						}
					}

					if (name) {


						if (query[name] === void 0) {
							query[name] = val;
						}
						else if (query[name] instanceof Array) {
							query[name].push(val);
						}
						else {
							query[name] = [query[name], val];
						}
					}
				}
			}

			return query;
		},


		/**
		 * Stringify query object
		 * @param   {Object}  query
		 * @returns {string}
		 */
		stringify: function (query) {
			var str = [], key, val;

			if (query && query instanceof Object) {
				for (key in query) {
					if (query.hasOwnProperty(key)) {
						str.push(_stringifyParam(key, query[key]));
					}
				}
			}

			return str.join('&');
		}
	};


	// Export
	return queryString;
});

/**
 * URL module
 * Base on http://jsperf.com/url-parsing/26
 */

define('src/url',['./querystring'], function (/** queryString */queryString) {
	'use strict';

	var parseQueryString = queryString.parse;
	var stringifyQueryString = queryString.stringify;
	var encodeURIComponent = window.encodeURIComponent;


	/**
	 * URL Parser
	 * @type {RegExp}
	 * @const
	 */
	var R_URL_PARSER = /^(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/;


	/**
	 * Protocol checker
	 * @type {RegExp}
	 * @const
	 */
	var R_PROTOCOL = /^[a-z]+:/;


	/**
	 * Protocol separator
	 * @type {string}
	 * @const
	 */
	var DOUBLE_SLASH = '//';


	/**
	 * @class Url
	 * @constructs Url
	 * @param {string}  url
	 * @param {string|Url|location}  [base]
	 */
	function Url(url, base) {
		if (base === void 0) {
			base = location;
		} else if (typeof base === 'string') {
			base = new Url(base);
		}


		/* jshint eqnull:true */
		if (url == null) {
			url = base.toString();
		}
		else  if (!R_PROTOCOL.test(url)) {
			var protocol = base.protocol,
				host = base.host,
				pathname = base.pathname;

			if (url.charAt(0) === '#') {
				url = base.toString().split('#')[0] + url;
			}
			else if (url.substr(0, 2) === DOUBLE_SLASH) {
				// without protocol
				url = protocol + url;
			}
			else  if (url.charAt(0) === '/') {
				// absolute path
				url = protocol + DOUBLE_SLASH + host + url;
			}
			else {
				// relative path
				url = protocol + DOUBLE_SLASH + host + pathname.substr(0, pathname.lastIndexOf('/') + 1) + url;
			}
		}

		// todo: support punycode
		var matches = R_URL_PARSER.exec(url);

		this.protocol = matches[4] || '';
		this.protocolSeparator = matches[5] || '';

		this.credhost = matches[6] || '';
		this.cred = matches[7] || '';

		this.username = matches[8] || '';
		this.password = matches[9] || '';

		this.host = matches[10] || '';
		this.hostname = matches[11] || '';
		this.port = matches[12] || '';
		this.origin = this.protocol + this.protocolSeparator + this.hostname;

		this.path =
		this.pathname = matches[13] || '/';

		this.segment1 = matches[14] || '';
		this.segment2 = matches[15] || '';

		this.search = matches[16] || '';
		this.query = parseQueryString(this.search);
		this.params = {};

		this.hash = matches[17] || '';

		this.update();
	}


	Url.fn = Url.prototype = /** @lends Url# */{
		constructor: Url,

		/**
		 * Set query params
		 * @param   {object}       query
		 * @param   {string|array} [remove]   if `true`, clear the current `query` and set new
		 * @returns {Url}
		 */
		setQuery: function (query, remove) {
			var query = this.query,
				key;

			query = parseQueryString(query);

			if (remove === true) {
				this.query = query;
			}
			else {
				if (query !== void 0) {
					for (key in query) {
						if (query[key] === null) {
							delete query[key];
						} else {
							query[key] = query[key];
						}
					}
				}

				if (remove) {
					if (typeof remove === 'string') {
						remove = remove.split('&');
					}

					remove.forEach(function (name) {
						delete query[name];
					});
				}
			}

			return this.update();
		},


		/**
		 * Add query params
		 * @param   {object} query
		 * @returns {Url}
		 */
		addQuery: function (query) {
			return this.setQuery(query);
		},


		/**
		 * Remove query params
		 * @param   {string|array}  query
		 * @returns {Url}
		 */
		removeQuery: function (query) {
			return this.setQuery(void 0, query);
		},


		/** @returns {Url} */
		update: function () {
			this.url = this.href = (
				this.protocol + this.protocolSeparator +
				(this.username ? encodeURIComponent(this.username) + (this.password ? ':' + encodeURIComponent(this.password) : '') + '@' : '') +
				this.host + this.pathname + this.search + this.hash
			);

			return this;
		},


		toString: function () {
			return this.url;
		}
	};


	/**
	 * Parse URL
	 * @static
	 * @param   {string} url
	 * @returns {Url}
	 */
	Url.parse = function (url) {
		return new Url(url);
	};


	/**
	 * Parse query string
	 * @method  Url.parseQueryString
	 * @param   {string} str
	 * @returns {Object}
	 */
	Url.parseQueryString = queryString.parse;


	/**
	 * Stringify query object
	 * @method  Url.parseQueryString
	 * @param   {Object} query
	 * @returns {string}
	 */
	Url.stringifyQueryString = stringifyQueryString;


	/**
	 * Конвертация описания пути в регулярное выражение
	 * @param  {string|RegExp}  pattern
	 * @return {RegExp}
	 */
	Url.toMatcher = function (pattern) {
		// https://github.com/visionmedia/express/blob/master/lib/utils.js#L248
		if (pattern instanceof RegExp) {
			return pattern;
		}

		if (Array.isArray(pattern)) {
			pattern = '(' + pattern.join('|') + ')';
		}

		var keys = [];

		pattern = pattern
			.concat('/*')
			.replace(/\/+/g, '/')
			//.replace(/(\/\(|\(\/)/g, '(?:/')
			.replace(/\(([^\?])/g, '(?:$1')
			.replace(/(\/)?(\.)?:(\w+)(?:(\([^)]+\)))?(\?)?(\*)?/g, function(_, slash, format, key, capture, optional, star){
				keys.push({
					name: key,
					optional: !!optional
				});

				slash = slash || '';

				return '' +
					(optional ? '' : slash) +
					'(?:' +
					(optional ? slash : '') +
					(format || '') + (capture || (format && '([^/.]+)' || '([^/]+)')).replace('(?:', '(') + ')' +
					(optional || '') +
					(star ? '(/*)?' : '')
				;
			})
			.replace(/([\/.])/g, '\\$1')
		;

		pattern = new RegExp('^' + pattern + '$', 'i');
		pattern.keys = keys;

		return pattern;
	};


	/**
	 * Вытащить параметры из url
	 * @param   {string}      pattern
	 * @param   {string|Url}  [url]
	 * @returns {Object|null}
	 */
	Url.match = function (pattern, url) {
		var i, n,
			value,
			params = {},
			matches;

		url = Url.parse(url);
		pattern = Url.toMatcher(pattern);
		matches = pattern.exec(url.path);

		if (matches) {
			for (i = 1, n = matches.length; i < n; i++) {
				value = matches[i];

				if (value !== void 0) {
					params[pattern.keys[i - 1].name] = value;
				}
			}

			return params;
		}

		return null;
	};


	if (!window.URL) {
		window.URL = Url;
	}

	// Export
	return Url;
});

define('src/match',[], function () {
	// Export
	return {
		cast: function (list) {
			var matches = {},
				match = list;

			if (typeof list !== 'function') {
				if (list === true || list === void 0) {
					match = function () {
						return true;
					};
				}
				else {
					list.forEach(function (key) {
						matches[key] = true;
					});

					match = function (key) {
						return matches[key];
					};
				}
			}

			return match;
		}
	};
});

define('src/loader',['./match'], function (match) {
	'use strict';


	var _cast = function (name, model) {
		if (typeof model === 'function') {
			model = { fetch: model };
		}

		model.name = name;
		model.match = match.cast(model.match);

		return model;
	};



	/**
	 * @class Pilot.Loader
	 * @constructs Pilot.Loader
	 * @param {Object} models
	 * @constructor
	 */
	var Loader = function (models) {
		this.models = models = (models || {});
		this.names = Object.keys(models);

		this._index = {};
		this.names.forEach(function (name) {
			this._index[name] = _cast(name, models[name]);
		}, this);
	};


	Loader.prototype = /** @lends Pilot.Loader# */{
		consturctor: Loader,


		defaults: function () {
			var defaults = {};

			this.names.forEach(function (name) {
				defaults[name] = this._index[name].defaults;
			}, this);

			return defaults;
		},


		fetch: function (req) {
			var _index = this._index,

				names = this.names,
				models = {},
				promises = [],

				waitFor = function (name) {
					var idx = models[name],
						model = _index[name];

					if (idx === void 0) {
						idx = new Promise(function (resolve) {
							if (model.fetch && model.match(req.route.id, req)) {
								resolve(model.fetch(req, waitFor));
							}
							else {
								resolve(model.defaults);
							}
						});

						idx = promises.push(idx) - 1;
						models[name] = idx;
					}

					return promises[idx];
				};

			// Загружаем все модели
			names.forEach(waitFor);

			return Promise.all(promises).then(function (results) {
				names.forEach(function (name) {
					models[name] = results[models[name]];
				});

				return models;
			});
		},


		extend: function (models) {
			models = models || {};

			this.names.forEach(function (name) {
				models[name] = models[name] || this.models[name];
			}, this);

			return new Loader(models);
		},


		/**
		 * Достаем только принадлежание лоудеру свойства
		 * @param   {Object}  model
		 * @returns {Object}
		 */
		extract: function (model) {
			var data = {};

			this.names.forEach(function (name) {
				data[name] = model[name];
			});

			return data;
		}
	};


	// Export
	return Loader;
});

define('src/request',['./url', './querystring'], function (/** URL */URL, /** queryString */queryString) {


	/**
	 * @class  Pilot.Request
	 * @constructs Pilot.Request
	 * @param  {string}  url
	 * @param  {string}  [referrer]
	 * @param  {Pilot}   [router]
	 */
	var Request = function (url, referrer, router) {
		url = new URL(url);

		this.href = url.href;
		this.protocol = url.protocol;
		this.host = url.host;
		this.hostname = url.hostname;
		this.port = url.port;

		this.path =
		this.pathname = url.pathname;

		this.search = url.search;
		this.query = queryString.parse(url.search);
		this.params = {};

		this.hash = url.hash;

		this.route = router && router.route || {};
		this.router = router;
		this.referrer = referrer;
	};


	Request.prototype = /** @lends Request# */{
		constructor: Request,

		clone: function () {
			var req = new Request(this.href, this.referrer, this.router);

			req.query = this.query;
			req.params = this.params;

			return req;
		},

		is: function (id) {
			return !!(this.route && (this.route.id == id));
		},

		toString: function () {
			return this.href;
		}
	};


	// Export
	return Request;
});

define('src/route',[
	'Emitter',
	'./match',
	'./url',
	'./querystring'
], function (
	/** Emitter */Emitter,
	/** Object */match,
	/** URL */Url,
	/** queryString */queryString
) {
	'use strict';


	/**
	 * Обработка параметров url согласно правилам
	 * @param   {Object}        rules   правила
	 * @param   {Object}        target  объект обработки
	 * @param   {Pilot.Request} req     оригинальный запрос
	 * @returns {boolean}
	 * @private
	 */
	var _urlProcessing = function (rules, target, req) {
		return Object.keys(rules).every(function (name) {
			var rule = rules[name],
				value = target[name];

			if (value === void 0) {
				target[name] = rule['default'];
				return true;
			}

			target[name] = value = (rule.decode ? rule.decode(value, req) : value);

			return !rule.validate || rule.validate(value, req);
		});
	};


	/**
	 * Преобразование образца маршрута в функцию генерации URL
	 * @param  {string}  pattern
	 * @return {Function}
	 * @private
	 */
	var _toUrlBuilder = function (pattern) {
		var code = 'var url = "',
			i = 0,
			chr,
			expr;

		// Чистим образец
		pattern = pattern.replace(/([?*]|(\[.*?))/g, '');

		function parseGroupStatement(prefix) {
			var str = 'url += "';

			while (chr = pattern[i++]) {
				if (chr === ':') { // Переменная
					expr = pattern.substr(i).match(/[a-z0-9_-]+/)[0];
					str += '" + (params ? params["' + expr + '"] : "") + "';
					i += expr.length;
				}
				else if (chr === ')' || chr === '|') { // Группа или её закрытие
					code += prefix + 'if (params["' + expr + '"]) {' + str + '";}\n';
					(chr === '|') && parseGroupStatement('else ');
					break;
				}
				else {
					str += chr;
				}
			}
		}

		// Main loop
		while (chr = pattern[i++]) {
			if (chr === ':') { // Переменная
				expr = pattern.substr(i).match(/[a-z0-9_-]+/)[0];
				code += '" + (params ? params["' + expr + '"] : "") + "';
				i += expr.length
			}
			else if (chr === '(') { // Открытие группы
				code += '";\n';
				parseGroupStatement('');
				code += 'url += "';
			} else {
				code += chr;
			}
		}

		/* jshint evil:true */
		return new Function('params', code += '/"; return url.replace(/\\/+$/, "/");');
	};


	/**
	 * @class Route
	 * @memberof Pilot
	 * @extends Emitter
	 * @constructs Pilot.Route
	 * @param  {Object}  options
	 * @param  {Pilot}   router
	 */
	var Route = function (options, router) {
		/**
		 * Описание URL
		 * @type {Object}
		 * @private
		 */
		this.url = {};

		/**
		 * Регионы
		 * @type {Array}
		 * @public
		 */
		this.regions = [];

		/**
		 * Ссылка на роутер
		 * @type {Pilot}
		 */
		this.router = router;

		// Инит опций и свойств по ним
		this._initOptions(options);

		/**
		 * Зазгрузчик моделей
		 * @type {Pilot.Loader}
		 * @private
		 */
		this.__model__ = options.model;

		/**
		 * Модели
		 * @type {Object}
		 * @public
		 */
		this.model = options.model.defaults();

		this.url.regexp = Url.toMatcher(this.url.pattern + (options.__group__ ? '/:any([a-z0-9\\/-]*)' : ''));
		this._urlBuilder = _toUrlBuilder(this.url.pattern);

		// Родительский маршрут (группа)
		this.parentRoute = this.router[this.parentId];

		this._initMixins()
	};


	Route.prototype = /** @lends Route# */{
		constructor: Route,

		/**
		 * Внутряняя инициализация маршрута
		 * @private
		 */
		__init: function () {
			this.inited = true;

			this.trigger('before-init', this);
			this.init();
			this.trigger('init', this);
		},

		/**
		 * Пользовательская инициализация маршрута
		 * @protected
		 */
		init: function () {
		},

		/**
		 * @param {Object} options
		 * @protected
		 */
		_initOptions: function (options) {
			var _this = this;

			_this.options = options;

			Object.keys(options).forEach(function (key) {
				var value = options[key],
					act = key.match(/^(one?)[:-](\w+)/);

				if (key === '*') { // Регионы
					Object.keys(value).map(function (name) {
						var region = new Route.Region(name, value[name], _this);

						_this.regions.push(region);
						_this.regions[name] = region;

						_this.on('model', function () {
							region.model = _this.model;
						});
					});
				}
				else if (act) {
					if (act[1]) { // Биндинг событий
						_this[act[1]](act[2].replace(/-/g, ''), function (evt, req) {
							// Передаем только `req`
							_this[key](req);
						});
					}
				}

				_this[key] = value;
			});
		},


		/**
		 * Подмешиваем
		 * @protected
		 */
		_initMixins: function () {
			Array.isArray(this.mixins) && this.mixins.forEach(function (mix) {
				Object.keys(mix).forEach(function (name) {
					if (name != 'apply') {
						this[name] = this[name] || mix[name];
					}
				}, this);

				mix.apply && mix.apply.call(this, this);
			}, this);
		},


		/**
		 * Обработка маршрута
		 * @param  {URL}     url
		 * @param  {Request} req
		 * @param  {Route}   currentRoute
		 * @param  {Object}  model
		 */
		handling: function (url, req, currentRoute, model) {
			// Либо это «мы», либо группа (только так, никаких множественных маршрутов)
			if ((this === currentRoute) || (this.__group__ && this.match(url, req))) {
				this.model = this.__model__.extract(model);
				this.params = req.params;
				this.request = req;

				this.trigger('model', [this.model, req]);

				if (!this.active) {
					this.active = true;

					// Внутренняя инициализация
					!this.inited && this.__init();

					this.trigger('route-start', req);
				}
				else {
					this.trigger('route-change', req);
				}

				this.trigger('route', req);

				// Обработка регионов
				this.regions.forEach(function (/** Route.Region */region) {
					if (this.active && region.match(currentRoute.id)) {
						if (!region.active) {
							region.active = true;

							!region.inited && region.__init();

							region.trigger('route-start', req);
						}

						region.trigger('route', req);
					}
					else if (region.active) {
						region.active = false;
						region.trigger('route-end', req);
					}
				}, this);
			}
			else if (this.active) {
				this.active = false;
				this.model = this.__model__.defaults();

				// Это не копипаст!
				this.regions.forEach(function (/** Route.Region */region) {
					if (region.active) {
						region.active = false;
						region.trigger('route-end', req);
					}
				});

				this.trigger('route-end', req);
			}
		},


		/**
		 * Проверка маршрута
		 * @param   {URL}  url
		 * @param   {Pilot.Request}  req
		 * @returns {boolean}
		 */
		match: function (url, req) {
			var params = Url.match(this.url.regexp, url.pathname),
				query = queryString.parse(url.query),
				_paramsRules = this.url.params,
				_queryRules = this.url.query;

			return (
				params &&
				(!_paramsRules || _urlProcessing(_paramsRules, req.params = params, req)) &&
				(!_queryRules || _urlProcessing(_queryRules, req.query = query, req))
			);
		},

		/**
		 * Получить данные
		 * @param   {Pilot.Request} req
		 * @returns {Promise}
		 */
		fetch: function (req) {
			return this.__model__.fetch(req);
		},

		/**
		 * Получить URL
		 * @param  {Object} [params]
		 * @return {string}
		 */
		getUrl: function (params) {
			return this.url.toUrl ? this.url.toUrl(params, this._urlBuilder) : this._urlBuilder(params);
		},

		/**
		 * @param  {string} id
		 * @return {boolean}
		 */
		is: function (id) {
			return this.id === id;
		}
	};


	Emitter.apply(Route.prototype);


	/**
	 * Регион маршрута
	 * @class Route.Region
	 * @extends Route
	 * @memberof Pilot
	 * @constructs Pilot.Route.Region
	 */
	Route.Region = function (name, options, route) {
		this.name = name;
		this.router = route.router;
		this.parentRoute = route;

		this._initOptions(options);
		this._initMixins();

		this.match = match.cast(options.match);
	};


	// Наследуем `Route`
	Route.Region.prototype = Object.create(Route.prototype);
	Route.Region.prototype.constructor = Route.Region;
	Route.Region.prototype.getUrl = function (params) {
		return this.parentRoute.getUrl(params);
	};


	// Export
	return Route;
});

define('src/status',[], function () {
	/**
	 * @class Pilot.Status
	 * @constructs  Pilot.Status
	 * @param  {number} code
	 * @param  {*} details
	 */
	var Status = function (code, details) {
		this.code = code;
		this.details = details;
	};


	Status.prototype = /** @lends Pilot.Status */{
		constructor: Status,

		toJSON: function () {
			return {code: this.code, details: this.details};
		}
	};


	/**
	 * Преобразовать в статус
	 * @methodOf Pilot.Status
	 * @param {*} value
	 * @return {Pilot.Status}
	 */
	Status.from = function (value) {
		if (value.status) {
			value = new Status(value.status, value);
		}
		else if (!value || !value.code) {
			value = new Status(500, value);
		}

		return value;
	};


	// Export
	return Status;
});

define('src/pilot.js',[
	'Emitter',
	'./url',
	'./match',
	'./loader',
	'./request',
	'./route',
	'./status'
], function (
	/** Emitter */Emitter,
	/** URL */URL,
	/** Object */match,
	/** Pilot.Loader */Loader,
	/** Pilot.Request */Request,
	/** Pilot.Route */Route,
	/** Pilot.Status */Status
) {
	'use strict';

	var resolvedPromise = Promise.resolve();


	function _normalizeRouteUrl(url, relative) {
		relative = relative || {};

		if (!url) {
			url = relative.pattern;
		}

		if (typeof url === 'string') {
			url = { pattern: url };
		}

		if (url.pattern.charAt(0) !== '/') {
			url.pattern = (relative.pattern + '/' + url.pattern.replace(/(^\.\/|^\.$)/, ''));
		}

		url.pattern = url.pattern.replace(/\/+/g, '/');
		url.params = url.params || relative.params || {};
		url.query = url.query || relative.query || {};
		url.toUrl = url.toUrl || relative.toUrl;

		return url;
	}



	/**
	 * @class Pilot
	 * @param {Object} map крата маршрутов
	 */
	var Pilot = function (map) {
		var routes = [];

		map.url = map.url || '/';
		map.access = map.access || function () {
			return resolvedPromise;
		};

		// Подготавливаем данные
		(function _prepareRoute(map) {
			map.__group__ = false;

			Object.keys(map).forEach(function (key) {
				var options = map[key];

				if (key.charAt(0) === '#') {
					// Это маршрут, следовательно `map` — группа
					map.__group__ = true;
					delete map[key];

					options.id = key;
					options.parentId = map.id;

					options.url = _normalizeRouteUrl(options.url, map.url);
					options.model = map.model.extend(options.model);
					options.access = options.access || map.access;

					routes.push(options);
					_prepareRoute(options);
				}
			});
		})({'#__root__': map, model: new Loader(map.model) });


		this.model = map.model.defaults();
		this.__model__ = map.model;


		/**
		 * Текущий реквест
		 * @type {Pilot.Request}
		 */
		this.request = new Request('about:blank', '', this);


		/**
		 * Активный URL
		 * @type {URL}
		 */
		this.activeUrl = new URL('about:blank');


		/**
		 * Массив маршрутов
		 * @type {Pilot.Route[]}
		 */
		this.routes = routes.map(function (route) {
			route = new Route(route, this);

			this[route.id] = route;

			return route;
		}, this);
	};


	Pilot.prototype = /** @lends Pilot# */{
		constructor: Pilot,

		/**
		 * Получить URL по id
		 * @param  {string} id
		 * @param  {Object} [params]
		 */
		getUrl: function (id, params) {
			return this[id].getUrl(params);
		},


		/**
		 * Перейти по id
		 * @param  {string} id
		 * @param  {Object} [params]
		 * @return {Promise}
		 */
		go: function (id, params) {
			return this.nav(this[id].getUrl(params));
		},


		/**
		 * Навигация по маршруту
		 * @param   {string|URL|Pilot.Request}  href
		 * @returns {Promise}
		 */
		nav: function (href) {
			var req,
				url = new URL(href.toString(), location),
				_this = this,
				routes = _this.routes,
				_promise = _this._promise,
				currentRoute;

			// URL должен отличаться от активного
			if (_this.activeUrl.href !== url.href) {
				// Создаем объект реквеста и дальше с ним работаем
				req = new Request(url, _this.request.href, _this);

				// Находим нужный нам маршрут
				currentRoute = routes.filter(function (/** Pilot.Route */item) {
					return !item.__group__ && item.match(url, req);
				})[0];


				_this.activeUrl = url;
				_this.activeRequest = req;
				_this.activeRoute = currentRoute;

				_this.trigger('before-route', [req]);


				if (!_this._promise) {
					_this._promise = _promise = new Promise(function (resolve, reject) {
						// Только в целях оптимизации стека
						_this._resolve = resolve;
						_this._reject = reject;
					});

					_promise['catch'](function (err) {
						if (currentRoute) {
							// todo: Найти ближайшую 404
							currentRoute.trigger(err.code + '', [err, req]);
							currentRoute.trigger('error', [err, req]);
						}

						_this.trigger('route-fail', [err, req]);
						_this.trigger('route-end', [req]);
					});
				}


				if (!currentRoute) {
					// Если маршрут не найден, кидаем ошибку
					_this._reject(new Status(404));
				}
				else {
					req.route = currentRoute;

					// Запрашиваем доступ к маршруту
					currentRoute.access(req).then(function () {
						// Доступ есть, теперь собираем данные для маршрута
						return currentRoute.fetch(req).then(function (/** Object */model) {
							if (_this.activeUrl === url) {
								_this.url = url;
								_this.referrer = _this.request.href;

								_this.model = _this.__model__.extract(model);
								_this.route = currentRoute;
								_this.request = req;

								// Обходим всем маршруты и тегерим события
								routes.forEach(function (/** Route */route) {
									route.handling(url, req.clone(), currentRoute, model);
								});

								_this.trigger('route', [req, currentRoute]);
								_this.trigger('route-end', [req, currentRoute]);

								_this._promise = null;
								_this._resolve();
							}
						});
					})['catch'](function (err) {
						console.warn(err);

						// todo: Редирект!
						// Обработка ошибки
						if (_this.activeUrl === url) {
							_this._promise = null;
							_this._reject(Status.from(err));

							return Promise.reject(err);
						}
					});
				}
			}

			return _promise || resolvedPromise;
		}
	};


	/**
	 * Создать роутер
	 * @param  {Object}  sitemap
	 * @return {Pilot}
	 */
	Pilot.create = function (sitemap) {
		return new Pilot(sitemap);
	};


	Emitter.apply(Pilot.prototype);

	Pilot.version = '2.0.0';
	return Pilot;
});

})((function () {
							var defined = {};
							var _define = function (name, deps, callback) {
								var i = deps.length, depName;

								while (i--) {
									depName = name.split('/').slice(0, -1).join('/');
									deps[i] = defined[deps[i].replace('./', depName ? depName + '/' : '')];
								}

								if (name === 'src/pilot.js') {
									define([], function () {
										return callback.apply(null, deps);
									});
								} else {
									defined[name] = callback.apply(null, deps);
								}
							};
							_define.amd = true;
							return _define;
						})());
						