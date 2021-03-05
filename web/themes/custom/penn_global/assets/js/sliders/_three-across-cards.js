import $ from "jquery";
import debug from 'bows/dist/bows.min.js';


let $slidersThreeAcrossCards = $('[data-slider="three-across-cards"]');

const $body = $('body');
const log = debug("sliders:three-across-cards");


function sliderInit() {
	$slidersThreeAcrossCards.each(function () {
		let $this = $(this);
		let role = $this.attr('role');

		if (role !== 'region') {
			let slider = $this.slick({
				dots: true,
				//mobileFirst: true,
				speed: 500,
				// adaptiveHeight: true,
				//infinite: false,
				//variableWidth: true,
				slidesToShow: 3,
				slidesToScroll: 3,
				arrows: true,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},
					{
						breakpoint: 640,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});

			window.upennsliders.push(slider);
		}
	});

}


export function init() {
	if ($slidersThreeAcrossCards.length) {
		sliderInit();
	}
}

export default {
	init
};
