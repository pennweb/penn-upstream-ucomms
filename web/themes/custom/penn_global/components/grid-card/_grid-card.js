import debug from 'bows/dist/bows.min.js';

let card_links = document.querySelectorAll('.grid-card__image-link, .grid-card__link');
const log = debug("card");

function addCardHover() {
	card_links.forEach(card => {

		card.addEventListener("mouseenter", function () {
			this.closest('.grid-card').classList.add('is-hovered');
		});

		card.addEventListener("mouseout", function () {
			this.closest('.grid-card').classList.remove('is-hovered');
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
