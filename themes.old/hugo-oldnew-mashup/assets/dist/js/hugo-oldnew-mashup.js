"use strict";

/* jshint undef: true, unused: true, esversion: 6, globalstrict: true */
/* globals SITE_DOMAIN: false, Cookies: false, window: false, document: false */
// ---- JSHint linter settings

/*!  Copyright (C) 2007,2017 Daniel F. Dickinson <thecshore.thecshore.com>
 *    Released under the MIT License
 */

//    Script to set, save and restore stylesheet choice for site
//    and to create smooth font resizing based on browser window size

// The information used to write this script comes from
//   http://www.alistapart.com/articles/alternate, however I wrote the script
//   myself.
//
(function () {
  function createCookie(style, fontZoom, siteDomain) {
    if (style) {
      /* Use same setting if site viewed within two weeks from now */
      Cookies.set("cshore-style-helper-style", style, { "expires": 14, "domain": siteDomain });
    }
    if (fontZoom) {
      Cookies.set("cshore-style-helper-fontZoom", fontZoom, { "expires": 14, "domain": siteDomain });
    }
  }

  function readCookie() {
    var cookiePairs = {
      "style": Cookies.get("cshore-style-helper-style"),
      "fontZoom": Cookies.get("cshore-style-helper-fontZoom")
    };

    return cookiePairs;
  }

  // If link is a stylesheet link, get it's title and return it, otherwise return
  //   empty string to indicate no stylesheet title is present
  function getStyleFromLink(link) {
    var foundStyle;
    var styleTitle;

    if (!link) {
      return "";
    }
    // Don't bork if no 'rel' attribute
    if (link.getAttribute("rel")) {
      // is link a stylesheet link?
      foundStyle = link.getAttribute("rel").indexOf("style");
    } else {
      // No style because no 'rel' attribute
      foundStyle = -1;
    }

    // title of link
    styleTitle = link.getAttribute("title");

    // is a style and has a title?
    if (styleTitle && foundStyle != -1) {
      return styleTitle;
    } else {
      return "";
    }
  }

  // Determine current style name's title (if any)
  // NB: of the set of 'stylesheet' and 'alternate stylesheet'
  //   with a title attribute, we only allow one to be active
  //   at a time.
  function handleStyle() {
    var doGetParam = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var handlePreferred = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var newStyle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Default";

    var link;
    var style;
    var foundStyle = "";

    var links = document.head.getElementsByTagName("link");
    // iterate through set of link elements
    style = "";
    for (var i = 0; typeof (link = links[i]) != "undefined"; i++) {
      style = getStyleFromLink(link);
      // if the link is a style with a title
      if (style) {
        // if style is enabled
        if (!link.disabled) {
          // If we're getting the preferred style and this not an alternate stylesheet,
          //   return the style
          if (doGetParam && handlePreferred && link.getAttribute("rel").indexOf("alt") == -1) {
            return style;
            // If we're getting rather than setting, and we just want the active style
          } else if (doGetParam && !handlePreferred) {
            // return the active style
            return style;
            // if we are wanting to set a style and this isn't it
          } else if (!doGetParam && style.localeCompare(newStyle)) {
            // disable this style
            link.disabled = true;
          }
          // If we're setting the style and the style title matches desired title
        } else if (!doGetParam && style.localeCompare(newStyle) == 0) {
          // set link as active
          link.disabled = false;
          foundStyle = true;
        }
      }
    }

    if (!doGetParam) {
      // If we were able to set the style return the style,
      // otherwise return "Default"
      return foundStyle ? newStyle : "Default";
    } else {
      // Getting but didn't find an active stylesheet with title
      return "Default";
    }
  }

  // Function to calcuate  the root font size for html element so that
  // all other proportionally defined fonts will be scaled accordingly.
  // The idea is to have a smoothly scaling font size as number of pixels gets
  // larger.

  // This is on the assumption higher resolutions mean more dpi; sadly there is
  // no good way to find dpi in javascript and/or with CSS in present browser
  // implementations; many solutions have been proposed, but none are consistently
  // successful across platforms (and Windows 10 is particularly bad at reporting
  // a useful DPI) as of 2017-04-18 23:59:00 -0400

  // fontZoom is a constant multiplier (e.g. 1.6 = 160%) for zoom
  function calculateFontSize(fontZoom) {
    // Some magic numbers that worked for me.
    // It is basically intuitive approach involving trial and error.
    // The basic idea was to shift and apply constants multipliers
    // to a natural logarithmic scale to get the scaling to 'play nicely'.
    // (Meaning that at small pixel counts font size changes are fast relative
    // to pixel count but deaccelerate as pixel counts go up (but still end up
    // being larger increments on larger displays due to the larger initial value).
    var maxWidth = 999999;
    var minWidth = 1;
    var fontRatio = 1;
    var fontLogScale = 8;
    var fontLogOffset = 105536;
    var fontScale = 109;
    var fontScaleOffset = -11.448;

    // This is the desired font range in css pixels (which are sadly not actually
    // device-independent even though they were supposed to be
    // Note that this only affects cutoff, to get the range to work as desired, you
    // will need to play with the magic numbers.
    var minFont = 16;
    var maxFont = 32;

    minFont = minFont * fontZoom;
    maxFont = maxFont * fontZoom;

    var baseWidth = document.documentElement.offsetWidth;
    var setWidth = baseWidth > maxWidth ? maxWidth : baseWidth < minWidth ? minWidth : baseWidth;
    var fontBase = (Math.log(fontLogOffset + fontLogScale * (setWidth / fontRatio)) + fontScaleOffset) * fontScale * fontZoom;
    var fontSize = (fontBase > maxFont ? maxFont : fontBase < minFont ? minFont : fontBase) + "px";
    return fontSize;
  }

  // Function to set the root font size inline (on the html element), thus causing
  // all other proportionally defined fonts to be scaled accordingly.
  // The idea is to have a smoothly scaling font size as number of pixels gets
  // larger.

  // This concept was borrowed from Flow.js.
  // https://github.com/simplefocus/FlowType.JS/blob/master/flowtype.js
  // but implemented using completely different code.
  // In that case the goal was actually to maintain 45-75 words on a page based
  // the theory this is typographically optimal.

  // fontZoom is a constant multiplier (e.g. 1.6 = 160%) for zoom
  function setFontSizeOnResize() {
    var fontZoom = document.documentElement["cshore-font-zoom"];

    if (!fontZoom || fontZoom < 0) {
      var currentStyle = document.documentElement["cshore-current-style"];
      switch (currentStyle) {
        case "Large Print":
        case "Large Contrast":
          fontZoom = 1.6;
          break;
        default:
          fontZoom = 1;
          break;
      }
    }
    document.documentElement.style["font-size"] = calculateFontSize(fontZoom);
  }

  function setCurrentStyle() {
    var styleName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Default";
    var fontZoom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var siteDomain = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

    var style = handleStyle(false, false, styleName);
    if (!fontZoom || fontZoom < 0) {
      var cookieParts = readCookie();
      fontZoom = cookieParts.fontZoom;
      if (!fontZoom || fontZoom < 0) {
        switch (style) {
          case "Large Print":
          case "Large Contrast":
            fontZoom = 1.6;
            break;
          default:
            fontZoom = 1;
            break;
        }
      }
    }
    document.documentElement["cshore-current-style"] = style;
    document.documentElement["cshore-font-zoom"] = fontZoom;

    createCookie(style, fontZoom, siteDomain);
    setFontSizeOnResize();
  }

  function getPageStyle() {
    var styleParts = {};
    var cookieParts = readCookie();
    var style = cookieParts.style;
    var fontZoom = cookieParts.fontZoom;
    if (!style) {
      style = handleStyle(true, true);
    }
    if (!fontZoom || fontZoom < 0) {
      switch (style) {
        case "Large Print":
        case "Large Contrast":
          fontZoom = 1.6;
          break;
        default:
          fontZoom = 1;
          break;
      }
    }
    styleParts.style = style;
    styleParts.fontZoom = fontZoom;
    return styleParts;
  }

  function doOnResize() {
    setFontSizeOnResize();
    return true;
  }

  function doOnLoad() {
    var styleParts = getPageStyle();
    var siteDomain = "";
    if (typeof SITE_DOMAIN !== "undefined") {
      if (SITE_DOMAIN) {
        siteDomain = SITE_DOMAIN;
      }
    }
    setCurrentStyle(styleParts.style, styleParts.fontZoom, siteDomain);
    return true;
  }

  function doOnUnload() {
    var style = document.documentElement["cshore-current-style"];
    var fontZoom = document.documentElement["cshore-font-zoom"];
    var siteDomain = "";
    if (typeof SITE_DOMAIN !== "undefined") {
      if (SITE_DOMAIN) {
        siteDomain = SITE_DOMAIN;
      }
    }
    createCookie(style, fontZoom, siteDomain);
    return null;
  }

  window.setCurrentStyle = setCurrentStyle;

  window.addEventListener("resize", doOnResize);
  window.addEventListener("load", doOnLoad);
  window.addEventListener("unload", doOnUnload);

  window.onload = doOnLoad;
  window.onunload = doOnUnload;
  window.onresize = doOnResize;
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader = false;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
})(function () {
	function extend() {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[i];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init(converter) {
		function api(key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				// We're using "expires" because "max-age" is not supported by IE
				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				var stringifiedAttributes = '';

				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += '; ' + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}
					stringifiedAttributes += '=' + attributes[attributeName];
				}
				return document.cookie = key + '=' + value + stringifiedAttributes;
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!this.json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ? converter.read(cookie, name) : converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
});