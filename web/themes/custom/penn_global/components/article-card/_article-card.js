import debug from 'bows/dist/bows.min.js';

let card_links = document.querySelectorAll('.article-card__link');
const log = debug("article-card");

function addCardHover() {
	card_links.forEach(card => {

		card.addEventListener("mouseenter", function () {
			this.closest('.article-card').classList.add('is-hovered');
		});

		card.addEventListener("mouseout", function () {
			this.closest('.article-card').classList.remove('is-hovered');
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
