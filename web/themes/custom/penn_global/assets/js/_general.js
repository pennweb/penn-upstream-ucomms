import $ from "jquery";
import debug from 'bows/dist/bows.min.js';

const log = debug("general");
const body = $('body');
let $header = $('#header');
let $figcaption = $('figcaption');

function scrollTo($this) {

	let href = $this.attr('href');
	let where = $(href);
	let scrollToIt = where.offset().top - $header.height();

	if (href === '#top') {
		scrollToIt = 0;
	}

	$('html,body').animate({ scrollTop: scrollToIt }, 'slow', function () {

		if (href !== '#top') {

			where.focus();
		} else {
			body.attr('tabindex', '-1');
			body.focus();
			setTimeout(() => {
				body.removeAttr('tabindex');
			}, 100);
		}
	});
	return false;
}

function figcaptionWidth() {
	$figcaption.each(function () {
		let $this = $(this);
		let img = $this.closest('figure').find('img').eq(0);
		if (img.length) {
			let newWidth = img.width();
			$this.css('max-width', newWidth);
		}
	});
}

export function init() {

	$('.footer__to-top, .jump-link').on('click', function () {
		scrollTo($(this));
		return false;
	});

	// Move video modal outside of #top
	$(".modal").detach().insertAfter("#modal-overlay");

	$(window).on('load', function () {
		figcaptionWidth();
	}).on('resize', function () {
		clearTimeout(timeout);
		let timeout = setTimeout(() => {
			figcaptionWidth();
		}, 100);
	});

}

export default {
	init
};
