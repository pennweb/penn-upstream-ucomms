import $ from "jquery";
import size from '../base/_size';
import debug from 'bows/dist/bows.min.js';


let $singleImage = $('[data-slider="single-image"]');


const $body = $('body');
const log = debug("sliders:single-image");



function sliderInit() {
	$singleImage.each(function () {
		let $this = $(this);
		let role = $this.attr('role');
		let prev = $(this).find('[data-direction="prev"]');
		let next = $(this).find('[data-direction="next"]');
		let slider = '';

		if (role !== 'region') {
			slider = $this.slick({
				dots: false,
				mobileFirst: true,
				speed: 500,
				infinite: true,
				arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1
			});
		}

		prev.on('click', function () {
			slider.slick('slickPrev');
		});
		next.on('click', function () {
			slider.slick('slickNext');
		})
	});

}


export function init() {
	if ($singleImage.length) {
		sliderInit();
	}
}

export default {
	init
};
