import $ from "jquery";
import debug from 'bows/dist/bows.min.js';


// Make :contain case insensitive
jQuery.expr[':'].Contains = function (a, i, m) {
	return jQuery(a).text().toUpperCase()
		.indexOf(m[3].toUpperCase()) >= 0;
};


const $azSearch = $('#a-z-search');
const log = debug("a-to-z");

let $aToZ = '';
let $aToZItems = '';
let $aToZNoResults = $('#a-to-z-no-results');
let activeButton = 'ALL';


function letterUpdates(letter) {
	activeButton = letter;
	$('.a-z-search__button--active').removeClass('a-z-search__button--active');

	$(`.a-z-search__button[value="${letter}"]`).addClass('a-z-search__button--active');
	$('.a-z-search__select').find(`option[value="${letter}"]`).prop('selected', true);
	if (letter === 'ALL') {
		$aToZ.css('display', 'block');
		isSectionEmpty();
	} else {
		$aToZ.hide();
		$(`.a-to-z[data-letter="${letter}"]`).css('display', 'block');
	}
	showNoResults();
}

function showNoResults() {
	let $this = '';
	if (activeButton === 'ALL') {
		$this = $('#content');
	} else {
		$this = $(`[data-letter="${activeButton}"]`);
	}

	let $items = $this.find('.a-to-z__item');
	let $itemsHidden = $this.find('.a-to-z__item--hidden');

	if ($items.length === $itemsHidden.length) {
		$aToZNoResults.addClass('no-results--active');
	} else {
		$aToZNoResults.removeClass('no-results--active');
	}
}
function aToZSelect() {
	$('.a-z-search__select').on('change', function () {
		let letter = $(this).val().toUpperCase();
		letterUpdates(letter);
	});
}

function aToZButtons() {
	$azSearch.on('click', '.a-z-search__button', function () {
		let $this = $(this);
		if ($this.hasClass('a-z-search__button--active') === false) {
			let letter = $this.val().toUpperCase();
			letterUpdates(letter);
		}
	});
}

function isSectionEmpty() {
	$aToZ.each(function () {
		let $this = $(this);
		let $items = $this.find('.a-to-z__item');
		let $itemsHidden = $this.find('.a-to-z__item--hidden');

		if ($items.length === $itemsHidden.length) {
			$this.hide();
		} else {
			$this.css('display', 'block');
		}
	});
}

function aToZSearch() {
	$('.a-z-search__input').on('keyup', function () {
		let textVal = $(this).val();
		log(textVal);

		if (textVal.length >= 1) {
			$aToZItems.addClass('a-to-z__item--hidden');
			let aZSearchResults = $(`.a-to-z__item:Contains('${textVal}')`);


			aZSearchResults.removeClass('a-to-z__item--hidden');

		} else {
			$aToZItems.removeClass('a-to-z__item--hidden');
			$aToZNoResults.removeClass('no-results--active');
		}
		showNoResults()
		if (activeButton === 'ALL') {
			isSectionEmpty();
		}
	})
}

export function init() {
	if ($azSearch.length) {
		$aToZ = $('.a-to-z');
		$aToZItems = $('.a-to-z__item');
		aToZButtons();
		aToZSearch();
		aToZSelect();

		$('.a-z-search__form').on('submit', function () {
			$(this).attr('tabindex', '-1').focus();
			setTimeout(() => {
				$(this).removeAttr('tabindex');
			}, 100);
			return false;
		});
	}
}

export default {
	init
};
