// import $ from "jquery";
import debug from 'bows/dist/bows.min.js';

const log = debug("filter");

const filters = document.querySelectorAll('.filter');

function filterToggle($this) {
	$this.classList.toggle('filter--active');
}

function filterTrigger($this, filter, btn) {

	let currentExpanded = filter.querySelector('[aria-expanded="true"]');
	let isExpanded = $this.getAttribute('aria-expanded');
	let controls = $this.dataset.controls;

	let activeTrigger = filter.querySelector('.filter__trigger--active');

	if (activeTrigger) {
		activeTrigger.classList.remove('filter__trigger--active');
	}

	if (isExpanded === 'false') {
		if (currentExpanded) {
			let showingId = currentExpanded.dataset.controls;
			let showing = document.getElementById(showingId);
			currentExpanded.setAttribute('aria-expanded', false);
			showing.classList.remove('filter-section--active');
			showing.classList.remove('filter-section--showing');
		}
		let toShow = document.getElementById(controls);
		$this.classList.add('filter__trigger--active');
		$this.setAttribute('aria-expanded', true);
		toShow.classList.add('filter-section--active');
		setTimeout(() => {
			toShow.classList.add('filter-section--showing');
		}, 50);

	}


	filter.classList.toggle('filter--active');
	//start text change
	let text = $this.innerHTML;
	let textChange = btn.querySelector('.filter__toggle__text');
	if (textChange) {
		textChange.innerHTML = text;
	}
	//end text change

	btn.focus();
}

function doFilters() {
	filters.forEach(filter => {
		let btn = filter.querySelector('.filter__toggle');
		let trigger = filter.querySelectorAll('.filter__trigger');

		if (btn) {
			btn.addEventListener('click', function () {
        this.focus(); // compensates for idiosyncratic treatment of <button> focus across browsers
				filterToggle(filter);
			});


			trigger.forEach(el => {
				el.addEventListener('click', function () {
					filterTrigger(this, filter, btn);
				})
			});
		}

		filter.addEventListener('mouseleave', function () {
			log('mouseleave');
			this.classList.remove('filter--active');
		});
		filter.addEventListener('focusout', function () {
			setTimeout(() => {
				let focused = filter.querySelector(':focus');
				if (focused === null) {
					this.classList.remove('filter--active');
				}
			}, 500);

		});

	});
}



export function init() {

	if (filters) {
		doFilters();
	}
}

export default {
	init
};
