import $ from "jquery";
import debug from 'bows/dist/bows.min.js';


let $gallery = $('[data-slider="gallery"]');

const log = debug("sliders:gallery");

function setControls($self, $gn) {

	let currentImageHeight = $self.find('img').height();
	$gn.css('top', currentImageHeight + 40);
}


function sliderInit() {
	$gallery.each(function () {
		let $self = $(this);
		let role = $self.attr('role');
		let $btns = $self.find('.gallery-card__button');
		let $galleryslider = $self.closest('.gallery-slider');
		let $gn = $galleryslider.find('.gallery__navigation');
		let $gb = $galleryslider.find('.gallery__arrows');
		let $gd = $galleryslider.find('.gallery__dots');

		if (role !== 'region') {
			let $slider = $self.slick({
				slidesToShow: 1,
				infinite: true,
				dots: true,
				appendDots: $gd,
				arrows: true,
				appendArrows: $gb,
				draggable: true,
				touchThreshold: 20,
				adaptiveHeight: false
			});

			$galleryslider.addClass('gallery-slider--active');
			setTimeout(() => {
				setControls($self.find('.slick-current'), $gn);
			}, 100);

			$slider.on('afterChange', function (event, slick, currentSlide) {
				setControls($self.find(`[data-slick-index="${currentSlide}"]`), $gn);
			});

			$(window).on('resize', function () {
				setTimeout(() => {
					setControls($self.find('.slick-current'), $gn);
				}, 100);
			})

		}
	});

}


export function init() {

	if ($gallery.length) {
		sliderInit();
	}
}

export default {
	init
};
