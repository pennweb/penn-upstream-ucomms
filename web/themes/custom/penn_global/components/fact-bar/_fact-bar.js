import $ from "jquery";
import debug from 'bows/dist/bows.min.js';
import inViewport from '../../assets/js/base/_inViewport';
import throttle from 'lodash.throttle';

const log = debug("fact-bar");

const factbars = document.querySelectorAll('.fact-bar');

const throttleIt = throttle(inview, 100);

let activeFactbars = 0;
function inview() {
	log('throttleing')
	factbars.forEach(fb => {
		if (inViewport.isElementInViewport(fb) === true && fb.classList.contains('fact-bar--active') === false) {
			let fbb = fb.querySelector('.fact-bar__bar');
			let fbb_width = 0;
			if (fbb) {
				fbb_width = parseInt(fbb.dataset.percentage, 10);
			}
			fb.classList.add('fact-bar--active');
			activeFactbars++;
			setTimeout(() => {
				fbb.style.maxWidth = `${fbb_width}%`;
			}, 500);


		}
	});

	if (activeFactbars === factbars.length) {
		window.removeEventListener('scroll', throttleIt);
	}
}



export function init() {
	if (factbars.length > 0) {
		window.addEventListener('scroll', throttleIt);
		$(window).on('load', function () {
			inview();
		});
	}

}

export default {
	init
};
