import $ from "jquery";
import debug from 'bows/dist/bows.min.js';
import hoverintent from 'hoverintent';

const log = debug("hero");
const heroContent = document.querySelector('.hero__content');
const heroText = document.querySelector('.hero__text');
const heroExcerpt = document.querySelector('.hero__excerpt');
const heroLink = document.querySelector('.hero__link');
const heroClass = 'hero__text--hover';

function itemHoverIntent(element, theClass, time, num) {
	var opts = {
		timeout: time,
		interval: num
	}
	log(element);
	var hoverListener = hoverintent(element,
		function () {
			heroText.classList.add(theClass);
		},
		function () {
			heroText.classList.remove(theClass);
		}).options(opts);
}


export function init() {
	if (heroExcerpt) {
		itemHoverIntent(heroContent, heroClass, 200, 50);
	}
	if (heroLink) {
		heroLink.addEventListener('focus', function () {
			heroText.classList.add(heroClass);
		});
		heroLink.addEventListener('blur', function () {
			heroText.classList.remove(heroClass);
		});
	}
}

export default {
	init
};