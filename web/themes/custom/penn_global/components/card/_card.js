import debug from 'bows/dist/bows.min.js';

let card_links = document.querySelectorAll('.card a');
const log = debug("card");

function addCardHover() {
	card_links.forEach(card => {

		card.addEventListener("mouseenter", function () {
			this.closest('.card').classList.add('is-hovered');
		});

		card.addEventListener("mouseout", function () {
			this.closest('.card').classList.remove('is-hovered');
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
