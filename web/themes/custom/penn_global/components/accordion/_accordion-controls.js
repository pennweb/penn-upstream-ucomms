// import $ from "jquery";
import debug from 'bows/dist/bows.min.js';

const log = debug("accordion-controls");
const accordionBtns = document.querySelectorAll('.js-wikit-accordion-toggle__btn');

function openAll(triggers) {
	triggers.forEach(trigger => {
		let isExpanded = trigger.getAttribute('aria-expanded');
		if (isExpanded === 'false') {
			trigger.click();
		}
	});
}

function closeAll(triggers) {
	triggers.forEach(trigger => {
		let isExpanded = trigger.getAttribute('aria-expanded');
		if (isExpanded === 'true') {
			trigger.click();
		}
	});
}

function accordionToggle() {
	let which = this.dataset.toggle;
	let accordionSet = this.closest('.js-wikit-accordion-group');
	let triggers = accordionSet.querySelectorAll('.js-wikit-accordion__trigger');

	if (which === 'expand') {
		openAll(triggers);
	} else if (which === 'collapse') {
		closeAll(triggers);
	}

}

export function init() {
	accordionBtns.forEach(ab => {
		ab.addEventListener('click', accordionToggle);
	})
}

export default {
	init
};
