/* babeljs modules:common */

define(['feast'], function (feast) {
	'use strict';

	var isNodeJS = typeof window === 'undefined';
	var buildMap = {};


	if (feast.config && feast.config.socket) {
		// Слушаем изменения шаблонов
		require(['io-socket'], function (socket) {

			['xml', 'html'].forEach(function (ext) {
				socket.on('file-changed:' + ext, function (data) {
					var exists = feast.Block.all.some(function (Block) {
						if (!Block.prototype.virtual && data.file.split('?')[0].indexOf(Block.prototype.template.file.split('?')[0]) > -1) {
							try {
								var template = feast.parse(data.content, data.file);

								Block.setTemplate(template);
								Block.getInstances().forEach(function (block) {
									block.__testsRunner__ && block.__testsRunner__();
								});

								feast.Block.emit('template', [template, Block]);

								return true;
							} catch (err) {
								Block.setTemplate(feast.parse('<div key="tpl-compile-error" style="white-space: pre; padding: 5px; margin: 5px; background: red; color: #fff; font-size: 11px; text-shadow: 1px 1px 1px #000">' +
									err.toString().replace(/</g, '&lt;').replace(/>/g, '&gt;') +
								'</div>', data.file));
							}
						}
					});

					if (!exists) {
						console.warn('[feast.Block.template] "%s" no matches found', data.file);
					}
				});
			});
		});
	}


	// Export
	return {
		write: function (pluginName, moduleName, write) {
			if (buildMap.hasOwnProperty(moduleName)) {
				var name = JSON.stringify(pluginName + "!" + moduleName);
                var content = JSON.stringify(buildMap[moduleName]);

                write('define(' + name + ', function () { return require("feast").parse(' + content +  ', ' + JSON.stringify(moduleName) + ');});\n');
            }
		},

		load: function (name, req, onLoad) {
			if (isNodeJS) {
				var fs = requirejs.nodeRequire('fs');
				var contents = fs.readFileSync(require.toUrl(name)) + '';

				buildMap[name] = contents;
				onLoad(contents);

				return;
			}

			var url = require.toUrl(name).replace(/\/+/g, '/').replace('./', '');

			feast.ajax(url + '?' + Math.random(), function (err, content) {
				if (err) {
					onLoad.error(err);
				} else {
					onLoad(feast.parse(content, url));
				}
			});
		}
	};
});
