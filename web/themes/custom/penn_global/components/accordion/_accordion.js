/*
	*   This content is licensed according to the W3C Software License at
	*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
	*
	*   Simple accordion pattern example
	*  https://www.w3.org/TR/wai-aria-practices/#accordion
	* https://www.w3.org/TR/wai-aria-practices/examples/accordion/accordion.html
	*/

import accordionControls from './_accordion-controls';

export function init() {

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
				setTimeout(() => {
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

					setTimeout(() => {
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
					setTimeout(() => {
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
					setTimeout(() => {
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
export default {
	init
};