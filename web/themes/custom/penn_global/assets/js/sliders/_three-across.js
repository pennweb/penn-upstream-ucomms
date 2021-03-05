import $ from "jquery";
import size from '../base/_size';
import debug from 'bows/dist/bows.min.js';


let $slidersThreeAcross = $('[data-slider="three-across"]');
let sliderInitiated = false;

const $body = $('body');
const log = debug("sliders:three-across");

function sliderReInit() {
	// log('threeAcrossReInit');
	$slidersThreeAcross = $('[data-slider="three-across"]');
	sliderInit();
}

function sliderInit() {
	$slidersThreeAcross.each(function () {
		let $this = $(this);
		let role = $this.attr('role');

		if (role !== 'region' && $body.width() < 1024) {
			$this.slick({
				dots: true,
				mobileFirst: true,
				speed: 500,
				// adaptiveHeight: true,
				touchThreshold: 20,
				infinite: false,
				variableWidth: true,
				slidesToShow: 1,
				arrows: false,
				responsive: [
					{
						breakpoint: 1024,
						settings: "unslick"
					}
				]
			});
		}

		if (sliderInitiated === false) {
			size.addMedium(sliderReInit);
			size.addSmall(sliderReInit);
			sliderInitiated = true;
		}
	});

}


export function init() {
	if ($slidersThreeAcross.length) {
		sliderInit();
	}
}

export default {
	init
};
