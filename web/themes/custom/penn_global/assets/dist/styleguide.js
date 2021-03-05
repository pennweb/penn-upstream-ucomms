(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
	typeof define === 'function' && define.amd ? define(['jquery'], factory) :
	(global = global || self, global.Styleguide = factory(global.jQuery));
}(this, function ($) { 'use strict';

	$ = $ && $.hasOwnProperty('default') ? $['default'] : $;

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var bows_min = createCommonjsModule(function (module, exports) {
	!function(e){{ module.exports=e(); }}(function(){return function e(n,o,r){function t(f,d){if(!o[f]){if(!n[f]){var u="function"==typeof commonjsRequire&&commonjsRequire;if(!d&&u){ return u(f,!0); }if(i){ return i(f,!0); }var a=new Error("Cannot find module '"+f+"'");throw a.code="MODULE_NOT_FOUND",a}var s=o[f]={exports:{}};n[f][0].call(s.exports,function(e){var o=n[f][1][e];return t(o||e)},s,s.exports,e,n,o,r);}return o[f].exports}for(var i="function"==typeof commonjsRequire&&commonjsRequire,f=0;f<r.length;f++){ t(r[f]); }return t}({1:[function(e,n,o){(function(o){(function(){var r=function(){return s+=.618033988749895,360*(s%=1)},t="undefined"==typeof window,i=!t&&function(){var e;try{e=window.localStorage;}catch(e){}return e}(),f=i&&i.andlogKey?i.andlogKey:"debug",d=!(!i||!i[f])&&i[f],u=e("andlog"),a=Function.prototype.bind,s=0,c=!0,l="|",p=15,w=function(){},g=i&&i.debugColors?"false"!==i.debugColors:function(){if("undefined"==typeof window||"undefined"==typeof navigator){ return !1; }var e,n=!!window.chrome,r=/firefox/i.test(navigator.userAgent),t=o&&o.versions&&o.versions.electron;if(r){var i=navigator.userAgent.match(/Firefox\/(\d+\.\d+)/);i&&i[1]&&Number(i[1])&&(e=Number(i[1]));}return n||e>=31||t}(),v=null,h=null,y=!1,m={};d&&"!"===d[0]&&"/"===d[1]&&(y=!0,d=d.slice(1)),h=d&&"/"===d[0]&&new RegExp(d.substring(1,d.length-1));for(var b=["log","debug","warn","error","info"],x=0,E=b.length;x<E;x++){ w[b[x]]=w; }v=function(e){if(!i){ return w; }var n,o,t;if(c?(n=e.slice(0,p),n+=Array(p+3-n.length).join(" ")+l):n=e+Array(3).join(" ")+l,h){var f=e.match(h);if(!y&&!f||y&&f){ return w }}if(!a){ return w; }var d=[u];if(g){m[e]||(m[e]=r());var s=m[e];n="%c"+n,o="color: hsl("+s+",99%,40%); font-weight: bold",d.push(n,o);}else { d.push(n); }if(arguments.length>1){var v=Array.prototype.slice.call(arguments,1);d=d.concat(v);}return t=a.apply(u.log,d),b.forEach(function(e){t[e]=a.apply(u[e]||t,d);}),t},v.config=function(e){e.padLength&&(p=e.padLength),"boolean"==typeof e.padding&&(c=e.padding),e.separator?l=e.separator:!1!==e.separator&&""!==e.separator||(l="");},void 0!==n?n.exports=v:window.bows=v;}).call();}).call(this,e("_process"));},{_process:3,andlog:2}],2:[function(e,n,o){!function(){var e="undefined"==typeof window,r=!e&&function(){var e;try{e=window.localStorage;}catch(e){}return e}(),t={};if(e||!r){ return void(n.exports=console); }var i=r.andlogKey||"debug";if(r&&r[i]&&window.console){ t=window.console; }else { for(var f="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d=f.length,u=function(){};d--;){ t[f[d]]=u; } }void 0!==o?n.exports=t:window.console=t;}();},{}],3:[function(e,n,o){function r(){}var t=n.exports={};t.nextTick=function(){var e="undefined"!=typeof window&&window.setImmediate,n="undefined"!=typeof window&&window.postMessage&&window.addEventListener;if(e){ return function(e){return window.setImmediate(e)}; }if(n){var o=[];return window.addEventListener("message",function(e){var n=e.source;if((n===window||null===n)&&"process-tick"===e.data&&(e.stopPropagation(),o.length>0)){o.shift()();}},!0),function(e){o.push(e),window.postMessage("process-tick","*");}}return function(e){setTimeout(e,0);}}(),t.title="browser",t.browser=!0,t.env={},t.argv=[],t.on=r,t.addListener=r,t.once=r,t.off=r,t.removeListener=r,t.removeAllListeners=r,t.emit=r,t.binding=function(e){throw new Error("process.binding is not supported")},t.cwd=function(){return "/"},t.chdir=function(e){throw new Error("process.chdir is not supported")};},{}]},{},[1])(1)});
	});

	//import $ from "jquery";

	var linksToAnchors = document.querySelectorAll('a[href^="#"]');
	var theOffset = 0;
	var header = document.getElementById('header');
	var log = bows_min("scroll");

	function anchorLinkHandler(e) {
		var distanceToTop = function (el) { return Math.floor(el.getBoundingClientRect().top); };

		e.preventDefault();
		log(this);
		var isTab = this.getAttribute('role');
		if (isTab === 'tab') { return false; }
		var targetID = this.getAttribute("href");
		var split = targetID.split('#');

		if (split[1] === '') { return; }
		var targetAnchor = document.querySelector(targetID);
		if (!targetAnchor) { return; }

		theOffset = header.offsetHeight;
		log(distanceToTop(targetAnchor));
		log(theOffset);

		var originalTop = distanceToTop(targetAnchor) - theOffset;

		window.scrollBy({ top: originalTop, left: 0, behavior: "smooth" });

		var checkIfDone = setInterval(function () {
			var atBottom =
				window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
			if (distanceToTop(targetAnchor) === 0 || atBottom) {
				targetAnchor.tabIndex = "-1";
				targetAnchor.focus();

				// window.history.pushState("", "", targetID);
				clearInterval(checkIfDone);
			}
			targetAnchor.addEventListener("blur", function () {
				targetAnchor.removeAttribute('tabIndex');
			});
		}, 100);
	}

	function init(setOffset) {
		log("scroll init");
		if (setOffset) {
			theOffset = setOffset;
		}
		if (linksToAnchors !== undefined) {
			linksToAnchors.forEach(function (each) { return (each.onclick = anchorLinkHandler); });
		}
	}

	var smoothScroll = {
		init: init,
		anchorLinkHandler: anchorLinkHandler
	};

	// import $ from "jquery";

	var log$1 = bows_min("accordion-controls");
	var accordionBtns = document.querySelectorAll('.js-wikit-accordion-toggle__btn');

	function openAll(triggers) {
		triggers.forEach(function (trigger) {
			var isExpanded = trigger.getAttribute('aria-expanded');
			if (isExpanded === 'false') {
				trigger.click();
			}
		});
	}

	function closeAll(triggers) {
		triggers.forEach(function (trigger) {
			var isExpanded = trigger.getAttribute('aria-expanded');
			if (isExpanded === 'true') {
				trigger.click();
			}
		});
	}

	function accordionToggle() {
		var which = this.dataset.toggle;
		var accordionSet = this.closest('.js-wikit-accordion-group');
		var triggers = accordionSet.querySelectorAll('.js-wikit-accordion__trigger');

		if (which === 'expand') {
			openAll(triggers);
		} else if (which === 'collapse') {
			closeAll(triggers);
		}

	}

	function init$1() {
		accordionBtns.forEach(function (ab) {
			ab.addEventListener('click', accordionToggle);
		});
	}

	var accordionControls = {
		init: init$1
	};

	/*
		*   This content is licensed according to the W3C Software License at
		*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
		*
		*   Simple accordion pattern example
		*  https://www.w3.org/TR/wai-aria-practices/#accordion
		* https://www.w3.org/TR/wai-aria-practices/examples/accordion/accordion.html
		*/

	function init$2() {

		Array.prototype.slice.call(document.querySelectorAll('.js-wikit-accordion')).forEach(function (accordion) {

			// Allow for multiple accordion sections to be expanded at the same time
			var allowMultiple = accordion.hasAttribute('data-allow-multiple');
			// Allow for each toggle to both open and close individually
			//(`allowMultiple = ${allowMultiple}`)

			var allowToggle = (allowMultiple) ? allowMultiple : accordion.hasAttribute('data-allow-toggle');
			//console.log(`allowToggle = ${allowToggle}`);
			// Create the array of toggle elements for the accordion group
			var triggers = Array.prototype.slice.call(accordion.querySelectorAll('.js-wikit-accordion__trigger'));

			//panels var from original code
			//var panels = Array.prototype.slice.call(accordion.querySelectorAll('.js-wikit-accordion__panel'));


			accordion.addEventListener('click', function (event) {
				// jlongwill: commented out because it is preventing default on links in accordions
				// event.preventDefault();
				event.stopPropagation();
				var target = event.target;
				//(target);
				if (target.classList.contains('js-wikit-accordion__trigger') && target.classList.contains('js-wikit-accordion__trigger--animating') === false) {
					// Check if the current toggle is expanded.
					// if (target.classList.contains('js-wikit-accordion__trigger--animating')) { return false; }
					var isExpanded = target.getAttribute('aria-expanded') == 'true';
					var active = accordion.querySelector('[aria-expanded="true"]');
					target.classList.add('js-wikit-accordion__trigger--animating');
					setTimeout(function () {
						target.classList.remove('js-wikit-accordion__trigger--animating');
						console.log('removed Class');
					}, 1000);
					// without allowMultiple, close the open accordion
					if (!allowMultiple && active && active !== target) {

						// Set the expanded state on the triggering element
						active.setAttribute('aria-expanded', 'false');
						active.closest('.js-wikit-accordion__item').classList.remove('is-expanded');
						// Hide the accordion sections, using aria-controls to specify the desired section
						document.getElementById(active.getAttribute('aria-controls')).classList.remove('js-wikit-accordion__panel--open');

						setTimeout(function () {
							document.getElementById(active.getAttribute('aria-controls')).setAttribute('hidden', '');
						}, 1000);


						// When toggling is not allowed, clean up disabled state
						if (!allowToggle) {
							active.removeAttribute('aria-disabled');
						}
					}

					if (!isExpanded) {
						// Set the expanded state on the triggering element
						target.setAttribute('aria-expanded', 'true');
						target.closest('.js-wikit-accordion__item').classList.add('is-expanded');
						// Hide the accordion sections, using aria-controls to specify the desired section

						document.getElementById(target.getAttribute('aria-controls')).removeAttribute('hidden');
						setTimeout(function () {
							document.getElementById(target.getAttribute('aria-controls')).classList.add('js-wikit-accordion__panel--open');
						}, 10);
						// If toggling is not allowed, set disabled state on trigger
						if (!allowToggle) {
							target.setAttribute('aria-disabled', 'true');
						}
					}
					else if (allowToggle && isExpanded) {
						// Set the expanded state on the triggering element
						target.setAttribute('aria-expanded', 'false');
						target.closest('.js-wikit-accordion__item').classList.remove('is-expanded');
						// Hide the accordion sections, using aria-controls to specify the desired section
						// document.getElementById(target.getAttribute('aria-controls')).setAttribute('hidden', '');

						document.getElementById(target.getAttribute('aria-controls')).classList.remove('js-wikit-accordion__panel--open');
						setTimeout(function () {
							document.getElementById(target.getAttribute('aria-controls')).setAttribute('hidden', '');
						}, 1000);

					}

					event.preventDefault();
				}
			});

			// Bind keyboard behaviors on the main accordion container
			accordion.addEventListener('keydown', function (event) {
				var target = event.target;
				var key = event.which.toString();

				var isExpanded = target.getAttribute('aria-expanded') == 'true';
				var allowToggle = (allowMultiple) ? allowMultiple : accordion.hasAttribute('data-allow-toggle');

				// 33 = Page Up, 34 = Page Down
				var ctrlModifier = (event.ctrlKey && key.match(/33|34/));
				// console.log('target is ' + target);
				// Is this coming from an accordion header?
				if (target !== undefined && target !== null) {
					if (target.classList.contains('js-wikit-accordion__trigger')) {
						// Up/ Down arrow and Control + Page Up/ Page Down keyboard operations
						// 38 = Up, 40 = Down
						if (key.match(/38|40/) || ctrlModifier) {
							var index = triggers.indexOf(target);
							var direction = (key.match(/34|40/)) ? 1 : -1;
							var length = triggers.length;
							var newIndex = (index + length + direction) % length;

							triggers[newIndex].focus();

							event.preventDefault();
						}
						else if (key.match(/35|36/)) {
							// 35 = End, 36 = Home keyboard operations
							switch (key) {
								// Go to first accordion
								case '36':
									triggers[0].focus();
									break;
								// Go to last accordion
								case '35':
									triggers[triggers.length - 1].focus();
									break;
							}
							event.preventDefault();

						}

					}
				}
			});

			// These are used to style the accordion when one of the buttons has focus
			accordion.querySelectorAll('.js-wikit-accordion__trigger').forEach(function (trigger) {

				trigger.addEventListener('focus', function (event) {
					accordion.classList.add('focus');
				});

				trigger.addEventListener('blur', function (event) {
					accordion.classList.remove('focus');
				});

			});

			// Minor setup: will set disabled state, via aria-disabled, to an
			// expanded/ active accordion which is not allowed to be toggled close
			if (!allowToggle) {
				// Get the first expanded/ active accordion
				var expanded = accordion.querySelector('[aria-expanded="true"]');

				// If an expanded/ active accordion is found, disable
				if (expanded) {
					expanded.setAttribute('aria-disabled', 'true');
				}
			}

		});

		accordionControls.init();

	}
	var accordion = {
		init: init$2
	};

	var log$2 = bows_min("Styleguide");
	var $body = $('body');
	var $layoutAside = $('#layout-aside');
	var $jumpMenu = $('#jump_menu');
	var $componentMenu = $('#component__menu');



	var Styleguide = function Styleguide() {
		var this$1 = this;

		document.addEventListener('DOMContentLoaded', function () { return this$1.ready(); });
		window.addEventListener('load', function () { return this$1.load(); });
	};

	Styleguide.prototype.esc = function esc () {
		var self = this;
		document.addEventListener("keydown", function (evt) {
			evt = evt || window.event;
			var isEscape = false;
			if ("key" in evt) {
				isEscape = evt.key == "Escape" || evt.key == "Esc";
			} else {
				isEscape = evt.keyCode == 27;
			}

			if (isEscape && $body.hasClass('cm-open')) {
				self.closeMenu();
			}
		});
	};

	Styleguide.prototype.openMenu = function openMenu () {
		$componentMenu.addClass('return').text('Close');
		$layoutAside.addClass('layout-aside--active');
		$body.addClass('cm-open');
		$jumpMenu.focus();
	};

	Styleguide.prototype.closeMenu = function closeMenu () {
		$componentMenu.removeClass('return').text('Menu');
		$layoutAside.removeClass('layout-aside--active');
		$body.removeClass('cm-open');
		$componentMenu.focus();
	};

	Styleguide.prototype.ready = function ready () {
		accordion.init();
		var self = this;

		self.esc();
		smoothScroll.init(150);

		$componentMenu.on('click', function () {
			if ($(this).hasClass('return') === true) {
				self.closeMenu();
			} else {
				self.openMenu();
			}
		});

		$('.jump__link').on('click', function () {

			self.closeMenu();
		});
	};

	Styleguide.prototype.load = function load () {

	};

	return Styleguide;

}));
