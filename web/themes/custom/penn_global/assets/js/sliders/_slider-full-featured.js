import $ from "jquery";
import debug from 'bows/dist/bows.min.js';


let $sliderFullFeatured = $('[data-slider="slider-full-featured"]');

const $body = $('body');
const log = debug("sliders:slider-full-featured");


function showText($active, $sffc) {
	let active_content = $active.find('.sff-card__content').html();
	$sffc.html(active_content).removeClass('slider-full-featured__content--inactive');
}

function sliderInit() {
	$sliderFullFeatured.each(function () {
		let $self = $(this);
		let role = $self.attr('role');
		let $btns = $self.find('.sff-card__button');
		let $sffc = $self.closest('.slider-full-featured').find('.slider-full-featured__content');

		log($sffc);
		if (role !== 'region') {
			let $slider = $self.slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: false,
				dots: false,
				centerMode: false,
				variableWidth: true,
				arrows: false,
				draggable: true,
				touchThreshold: 20,
				// cssEase: 'ease-out'
			});

			let lastSlide = parseInt($self.find('.slick-slide').last().data('slick-index'));
			$self.find('.slick-current').addClass('active-sff');

			$btns.on('click', function () {
				let $this = $(this);
				let direction = $this.data('direction');
				let $activeSFF = $self.find('.active-sff')
				let isFirst = $activeSFF.prevAll().length;
				let isLast = $activeSFF.nextAll().length;

				$sffc.addClass('slider-full-featured__content--inactive');
				log(isFirst);
				log(lastSlide);
				if (direction === 'prev' && isFirst === 0) {
					$slider.slick('slickGoTo', lastSlide);
				} else if (direction === 'prev') {
					$slider.slick('slickPrev');

				} else if (direction === 'next' && isLast === 0) {
					$slider.slick('slickGoTo', 0)
				} else {
					$slider.slick('slickNext');
				}
			});

			let previousSlide = '';
			let isNext = false; s

			$slider.on('edge', function (slick, direction) {
				let $activeSFF = $self.find('.active-sff')
				let isFirst = $activeSFF.prevAll().length;
				let isLast = $activeSFF.nextAll().length;

				if (isFirst === 0) {
					$slider.slick('slickGoTo', lastSlide);
				} else if (isLast === 0) {
					$slider.slick('slickGoTo', 0)
				}
			});

			$slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
				log(nextSlide);
				previousSlide = currentSlide;

				if (currentSlide !== nextSlide) {
					$sffc.addClass('slider-full-featured__content--inactive');
					$self.find('.active-sff').removeClass('active-sff');
					$self.find('.sff-card--active').removeClass('sff-card--active');

					if (nextSlide < currentSlide) {
						$self.find(`[data-slick-index="${nextSlide}"]`).addClass('active-sff').find('.sff-card').addClass('sff-card--active');
					} else {
						isNext = true;

					}
				}
			}).on('afterChange', function (event, slick, currentSlide) {
				// log(event);
				// log(slick);
				let $active = $self.find(`[data-slick-index="${currentSlide}"]`);
				// log(`CurrentSlide = ${currentSlide}`);

				if (isNext === true) {
					isNext = false;
					$active.addClass('active-sff').find('.sff-card').addClass('sff-card--active');
				}


				$active.find('.sff-card').addClass('sff-card--active').closest('.slick-slide').focus();
				showText($active, $sffc);



			});

			let $active = $self.find('.slick-current')
			$active.find('.sff-card').addClass('sff-card--active');
			showText($active, $sffc);
		}
	});

}


export function init() {

	if ($sliderFullFeatured.length) {
		sliderInit();
	}
}

export default {
	init
};
