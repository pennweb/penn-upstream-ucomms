// Calendar view

import $ from "jquery";
import size from '../base/_size';
import debug from 'bows/dist/bows.min.js';


let $singleSmall = $('[data-slider="single-small"]');
let sliderInitiated = false;

const $body = $('body');
const log = debug("sliders:single-small");

function sliderReInit() {
	$singleSmall = $('[data-slider="single-small"]');
	sliderInit();
}


function sliderInit() {
	$singleSmall.each(function () {
		let $this = $(this);
		let role = $this.attr('role');

		if (role !== 'region' && $body.width() < 1024) {
			$this.slick({
				dots: true,
				mobileFirst: true,
				speed: 500,
				infinite: false,
				arrows: false,
				responsive: [
					{
						breakpoint: 1023,
						settings: "unslick"
					},
					{
						breakpoint: 690,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3
						}
					},
					{
						breakpoint: 639,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
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
	if ($singleSmall.length) {
		sliderInit();
	}
}

export default {
	init
};
