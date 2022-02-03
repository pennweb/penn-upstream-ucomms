import $ from "jquery";
import size from '../base/_size';
import debug from 'bows/dist/bows.min.js';


let $slidersTwoAcross = $('[data-slider="two-across"]');

const $body = $('body');
const log = debug("sliders:two-across");


function sliderInit() {
	$slidersTwoAcross.each(function () {
		let $this = $(this);
		let role = $this.attr('role');

		if (role !== 'region') {
			$this.slick({
				dots: true,
				//mobileFirst: true,
				speed: 500,
				// adaptiveHeight: true,
				infinite: false,
				//variableWidth: true,
				slidesToShow: 2,
				arrows: false,
				responsive: [
					{
						breakpoint: 640,
						settings: {
							slidesToShow: 1
						}
					}
				]
			});
		}
	});

}


export function init() {
	if ($slidersTwoAcross.length) {
		sliderInit();
	}
}

export default {
	init
};
