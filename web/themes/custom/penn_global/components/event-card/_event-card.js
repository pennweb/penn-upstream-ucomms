import debug from 'bows/dist/bows.min.js';

let card_links = document.querySelectorAll('.event-card__link');
let card_image_links = document.querySelectorAll('.event-card__image-link');

const log = debug("event-card");

function addCardListener(el) {
	el.addEventListener("mouseenter", function () {
		this.closest('.event-card ').classList.add('is-hovered');
	});

	el.addEventListener("mouseout", function () {
		this.closest('.event-card ').classList.remove('is-hovered');
	});
}


export function init() {
	if (card_links) {
		card_links.forEach(card => {
			addCardListener(card);
		});
	}

	if (card_image_links) {
		card_image_links.forEach(image_link => {
			addCardListener(image_link);
		});
	}
}

export default {
	init
};
