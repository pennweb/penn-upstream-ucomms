import debug from 'bows/dist/bows.min.js';

let card_links = document.querySelectorAll('.featured-initiative-card__title__link');
let card_button = document.querySelectorAll('.featured-initiative-card .btn');

const log = debug("featured-initiative-card");

function addCardListener(el) {
	el.addEventListener("mouseenter", function () {
		this.closest('.featured-initiative-card ').classList.add('is-hovered');
	});

	el.addEventListener("mouseout", function () {
		this.closest('.featured-initiative-card ').classList.remove('is-hovered');
	});
}


export function init() {
	if (card_links) {
		card_links.forEach(card => {
			addCardListener(card);
		});
	}

	if (card_button) {
		card_button.forEach(button => {
			addCardListener(button);
		});
	}
}

export default {
	init
};
