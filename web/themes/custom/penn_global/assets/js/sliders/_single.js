// Calendar view

import $ from "jquery";
import size from '../base/_size';
import debug from 'bows/dist/bows.min.js';


let $single = $('[data-slider="single"]');


const $body = $('body');
const log = debug("sliders:single-small");



function sliderInit() {
	$single.each(function () {
		let $this = $(this);
		let role = $this.attr('role');

		if (role !== 'region') {
			$this.slick({
				dots: true,
				mobileFirst: true,
				speed: 500,
				infinite: true,
				arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				fade: true
			});
		}
	});

}


export function init() {
	if ($single.length) {
		sliderInit();
	}
}

export default {
	init
};
