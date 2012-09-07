/**
 * Titon: The Mootools UI/Utility Framework
 *
 * @copyright	Copyright 2010+, Titon
 * @link		http://github.com/titon
 * @license		http://opensource.org/licenses/bsd-license.php (BSD License)
 */

/**
 * The base object for all Titon classes. Contains global functionality and configuration.
 *
 * @version	0.2.1 ALPHA
 */
var Titon = {

	/**
	 * Current version.
	 */
	version: '0.1.1 ALPHA',

	/**
	 * Options for all classes.
	 *
	 *	prefix 			- (string) String to prepend to all created element containers
	 *	activeClass		- (string) Class name to append to active elements
	 *	disabledClass	- (string) Class name to append to disabled elements
	 */
	options: {
		prefix: 'titon-',
		activeClass: 'active',
		disabledClass: 'disabled'
	},

	/**
	 * Localization messages.
	 */
	msg: {
		loading: 'Loading...'
	},

	/**
	 * Converts a value to a specific scalar type.
	 * The value is extracted via parseOptions().
	 *
	 * @param value
	 * @return mixed
	 */
	convertType: function(value) {
		if (value === 'true') {
			value = true;

		} else if (value === 'false') {
			value = false;

		} else if (value === 'null') {
			value = null;

		} else if (isNaN(value)) {
			value = String.from(value);

		} else {
			value = Number.from(value);
		}

		return value;
	},

	/**
	 * Merge custom options into the base. Clone the base as to not reference the original.
	 *
	 * @param {object} base
	 * @param {object} options
	 * @return {object}
	 */
	mergeOptions: function(base, options) {
		return Object.merge(Object.clone(base || {}), options || {});
	},

	/**
	 * Parse options out of the data-options attributes.
	 * Format: key1:value1;key2:value2
	 *
	 * @param {object} data
	 * @return {object}
	 */
	parseOptions: function(data) {
		var options = {};

		if (data) {
			data.split(';').each(function(item) {
				var pieces = item.split(':');

				if (pieces.length) {
					options[pieces[0]] = Titon.convertType(pieces[1]);
				}
			});
		}

		return options;
	},

	/**
	 * Apply custom options.
	 *
	 * @param {object} options
	 */
	setup: function(options) {
		Titon.options = Object.merge(Titon.options, options);
	}

};

/**
 * Prototype overrides.
 */
Element.implement({

	/**
	 * Returns an object representation of the data-options attribute located on the element.
	 *
	 * @param {string} scope
	 * @return {object}
	 */
	getOptions: function(scope) {
		return Titon.parseOptions(this.get('data-' + scope + '-options'));
	},

	/**
	 * Show an element using its default display type, or pass a forced type.
	 *
	 * @param {string} force
	 */
	show: function(force) {
		this.setStyle('display', force || '');
	},

	/**
	 * Hide an element.
	 */
	hide: function() {
		this.setStyle('display', 'none');
	},

	/**
	 * Fade in an element and set its display type.
	 *
	 * @param {int} duration
	 */
	fadeIn: function(duration) {
		duration = duration || 600;

		this.setStyles({
			display: '',
			opacity: 0
		}).set('tween', {
			duration: duration,
			link: 'cancel'
		}).fade('in');
	},

	/**
	 * Fade out an element and remove from DOM.
	 *
	 * @param {int} duration
	 */
	fadeOut: function(duration) {
		duration = duration || 600;

		this.set('tween', {
			duration: duration,
			link: 'cancel'
		}).fade('out').get('tween').chain(function() {
			this.element.dispose();
		});
	}

});