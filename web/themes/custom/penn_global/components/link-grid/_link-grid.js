
import debug from 'bows/dist/bows.min.js';
import hoverintent from 'hoverintent';

const log = debug("link-grid");
const linkGrid = document.getElementById("linkGrid");
const linkGridImg = document.querySelectorAll('.link-grid__image');
const linkGridItem = document.querySelectorAll('.link-grid__link');


function showGridBackground(grid) {
	let showGrid = linkGrid.querySelector(`.${grid}`);

	if (showGrid) {
		if (showGrid.classList.contains('link-grid__image--active') === false) {
			hideGridBackground();
			showGrid.classList.add('link-grid__image--active');
			setTimeout(() => {
				showGrid.classList.add('link-grid__image--opacity');
			}, 20);
		}
	}
}

function hideGridBackground() {
	let currentGrid = linkGrid.querySelector('.link-grid__image--active');
	if (currentGrid) {
		currentGrid.classList.remove('link-grid__image--opacity');
		setTimeout(() => {
			currentGrid.classList.remove('link-grid__image--active');
		}, 500);
	}
}

function itemHoverIntent(element, theClass, time) {
	var opts = {
		timeout: time
	}
	log(element);
	element.forEach(function (elem) {
		var hoverListener = hoverintent(elem,
			function () {
				elem.classList.add(theClass);
				let grid = elem.dataset.grid;
				log(grid);
				showGridBackground(grid);

			},
			function () {
				elem.classList.remove(theClass);
			}).options(opts);
	});
}

// Can be called in site.js on window load to preload background images.
export function loadAllGrid() {
	linkGridImg.forEach(item => {
		item.classList.add('link-grid__image--loading');
		setTimeout(() => {
			item.classList.remove('link-grid__image--loading');
		}, 100);
	});
}

export function init() {
	if (linkGridItem) {
		itemHoverIntent(linkGridItem, 'link-grid__item--active', 250);
		linkGridItem.forEach(item => {
			item.addEventListener('focus', function () {
				let grid = this.dataset.grid;
				showGridBackground(grid);
			})
		})
	}
}

export default {
	init,
	loadAllGrid
};
