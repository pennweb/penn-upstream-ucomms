import $ from "jquery";
import debug from 'bows/dist/bows.min.js';
import smoothScroll from './base/_smoothScroll';
import accordion from '../../components/accordion/_accordion';

const log = debug("Styleguide");
const $body = $('body');
const $layoutAside = $('#layout-aside');
const $jumpMenu = $('#jump_menu');
const $componentMenu = $('#component__menu');



class Styleguide {
	constructor() {
		document.addEventListener('DOMContentLoaded', () => this.ready());
		window.addEventListener('load', () => this.load());
	}

	esc() {
		let self = this;
		document.addEventListener("keydown", function (evt) {
			evt = evt || window.event;
			var isEscape = false;
			if ("key" in evt) {
				isEscape = evt.key == "Escape" || evt.key == "Esc";
			} else {
				isEscape = evt.keyCode == 27;
			}

			if (isEscape && $body.hasClass('cm-open')) {
				self.closeMenu();
			}
		});
	}

	openMenu() {
		$componentMenu.addClass('return').text('Close');
		$layoutAside.addClass('layout-aside--active');
		$body.addClass('cm-open');
		$jumpMenu.focus();
	}

	closeMenu() {
		$componentMenu.removeClass('return').text('Menu');
		$layoutAside.removeClass('layout-aside--active');
		$body.removeClass('cm-open');
		$componentMenu.focus();
	}

	ready() {
		accordion.init();
		let self = this;

		self.esc();
		smoothScroll.init(150);

		$componentMenu.on('click', function () {
			if ($(this).hasClass('return') === true) {
				self.closeMenu();
			} else {
				self.openMenu();
			}
		});

		$('.jump__link').on('click', function () {

			self.closeMenu();
		});
	}

	load() {

	}
}

export default Styleguide;
