import debug from 'bows/dist/bows.min.js';

let card_links = document.querySelectorAll('.listing-card__title__link, .listing-card__image');

const log = debug("listing-card");

function addCardHover() {
	card_links.forEach(card => {

		card.addEventListener("mouseenter", function () {
			this.closest('.listing-card').classList.add('is-hovered');
		});

		card.addEventListener("mouseout", function () {
			this.closest('.listing-card').classList.remove('is-hovered');
		});
	});
}

export function init() {
	if (card_links) {
		addCardHover();
	}
}

export default {
	init
};
