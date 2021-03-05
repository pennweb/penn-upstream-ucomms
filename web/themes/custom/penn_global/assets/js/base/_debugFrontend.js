import debug from 'bows/dist/bows.min.js';

const log = debug("overlays");
let grid = document.querySelector('.wdg_grid');
let overlay = document.querySelector('.wdg_overlay');
const local_grid = localStorage.getItem('wdg_grid');
const local_overlay = localStorage.getItem('wdg_overlay');
const local_overlay_bg = localStorage.getItem('wdg_overlay_bg');

function show_grid() {
	if (grid) {
		grid.classList.add('wdg_grid--active');
		localStorage.setItem('wdg_grid', true);
	}
}

function hide_grid() {
	if (grid) {
		grid.classList.remove('wdg_grid--active');
		localStorage.removeItem('wdg_grid');
	}
}

function show_overlay() {
	if (overlay) {
		overlay.classList.add('wdg_overlay--active');
		localStorage.setItem('wdg_overlay', true);
		if (local_overlay_bg !== null) {
			overlay.style.backgroundPosition = local_overlay_bg;
		}
	}
}

function hide_overlay() {
	if (overlay) {
		overlay.classList.remove('wdg_overlay--active');
		localStorage.removeItem('wdg_overlay');
	}
}

window.wdg_debug_overlay_bgp = function (cords) {
	if (overlay) {
		if (cords) {
			overlay.style.backgroundPosition = cords;
			localStorage.setItem('wdg_overlay_bg', cords);
		} else {
			localStorage.removeItem('wdg_overlay_bg');
			overlay.removeAttribute('style');
		}

	}
}

window.wdg_debug_grid = function () {
	if (grid) {
		if (grid.classList.contains('wdg_grid--active') === true) {
			hide_grid();
		} else {
			show_grid();
		}
	}
}

window.wdg_debug_overlay = function () {
	if (overlay) {
		log(overlay);
		if (overlay.classList.contains('wdg_overlay--active') === true) {
			hide_overlay();
		} else {
			show_overlay();
		}
	}
}

window.wdg_debug_go = function () {
	wdg_debug_grid();
	wdg_debug_overlay();
}

window.wdg_debug_reset = function () {
	hide_overlay();
	hide_grid();
	localStorage.removeItem('wdg_overlay_bg');
}

export function init() {
	log(overlay);
	log(grid);
	if (overlay === null) {
		let divOverlay = document.createElement('div');
		divOverlay.classList.add('wdg_overlay');
		document.body.append(divOverlay);

		overlay = document.querySelector('.wdg_overlay');

	}

	if (grid === null) {
		let divGrid = document.createElement('div');
		divGrid.classList.add('wdg_grid');
		document.body.append(divGrid);
		grid = document.querySelector('.wdg_grid');
	}

	if (local_grid === true || local_grid === 'true') {
		show_grid();
	}

	if (local_overlay === true || local_overlay === 'true') {
		show_overlay();
	}
}

export default {
	init
};
