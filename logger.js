(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define([], factory);
	} else if (typeof module === 'object' && module.exports) {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory();
	} else {
		// Browser globals (root is window)
		root.logger = factory();
	}
}(this, function() {
	var colors = {
		browser: ['color: #1cb329', 'color: #ff0', 'color: #5454ff', 'color: #f0f'],
		node: ['\x1b[32m%s\x1b[0m', '\x1b[33m%s\x1b[0m', '\x1b[34m%s\x1b[0m', '\x1b[35m%s\x1b[0m']
	};

	var isBrowser = new Function('try {return this===window;}catch(e){ return false;}');
	var isNode = new Function('try {return this===global;}catch(e){ return false;}');

	function isDebug() {
		return (isBrowser() && window.location.hash.indexOf('debug=enable') !== -1)
			|| (isNode() && (process.env.debug === '1' || process.argv.indexOf('-d') !== -1))
	}

	function newLogger(loggerName) {
		var title = loggerName || 'logger';
		var color = isBrowser() ? colors.browser.pop() :  colors.node.pop();

		function getMsg(args) {
			var msg = Array.prototype.slice.call(args) || [];

			if (isBrowser()) {
				msg.unshift('%c ' + title, color);
			} else {
				msg.unshift(color, title);
			}

			return msg;
		}

		function logger() {
			if (!isDebug()) {
				return;
			}

			console.log.apply(console, getMsg(arguments));
		}

		logger.warning = function() {
			if (!isDebug()) {
				return;
			}

			console.warn.apply(console, getMsg(arguments));
		}

		logger.error = function() {
			if (!isDebug()) {
				return;
			}

			console.error.apply(console, getMsg(arguments));
		}

		return logger;
	}

	return newLogger
}));