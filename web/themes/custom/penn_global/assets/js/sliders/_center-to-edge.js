import $ from "jquery";

import debug from 'bows/dist/bows.min.js';



let $centerToEdge = $('[data-slider="center-to-edge"]');


const log = debug("sliders:center-to-edge");

function sliderInit() {

	$centerToEdge.each(function () {
		let $this = $(this);

		const appendArrowsTo = $this.next('.penn-priorities__arrows');
		let slider = $this.slick({
			dots: true,
			mobileFirst: true,
			speed: 500,

			infinite: false,
			variableWidth: false,
			slidesToShow: 1,
			arrows: false,
			slidesToScroll: 1,
			touchThreshold: 20,
			responsive: [
				{
					breakpoint: 676,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
						infinite: true,
						dots: true,
						centerMode: true,
						variableWidth: true,
						arrows: true,
						appendArrows: appendArrowsTo
					}
				}
			]
		});
		window.upennsliders.push(slider);

		//move arrows inside slider so that we can vertically center
		$(appendArrowsTo).detach().appendTo($this);
	});
}

export function init() {
	if ($centerToEdge.length) {
		sliderInit();
	}
}

export default {
	init
};
