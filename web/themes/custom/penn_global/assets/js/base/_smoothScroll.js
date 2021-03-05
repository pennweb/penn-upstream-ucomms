//import $ from "jquery";
import debug from 'bows/dist/bows.min.js';

const linksToAnchors = document.querySelectorAll('a[href^="#"]');
let theOffset = 0;
let header = document.getElementById('header');
const log = debug("scroll");

export function anchorLinkHandler(e) {
	const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);

	e.preventDefault();
	log(this);
	const isTab = this.getAttribute('role');
	if (isTab === 'tab') { return false; }
	const targetID = this.getAttribute("href");
	const split = targetID.split('#');

	if (split[1] === '') return;
	const targetAnchor = document.querySelector(targetID);
	if (!targetAnchor) return;

	theOffset = header.offsetHeight;
	log(distanceToTop(targetAnchor))
	log(theOffset);

	const originalTop = distanceToTop(targetAnchor) - theOffset;

	window.scrollBy({ top: originalTop, left: 0, behavior: "smooth" });

	const checkIfDone = setInterval(function () {
		const atBottom =
			window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
		if (distanceToTop(targetAnchor) === 0 || atBottom) {
			targetAnchor.tabIndex = "-1";
			targetAnchor.focus();

			// window.history.pushState("", "", targetID);
			clearInterval(checkIfDone);
		}
		targetAnchor.addEventListener("blur", function () {
			targetAnchor.removeAttribute('tabIndex');
		});
	}, 100);
}

export function init(setOffset) {
	log(`scroll init`);
	if (setOffset) {
		theOffset = setOffset;
	}
	if (linksToAnchors !== undefined) {
		linksToAnchors.forEach(each => (each.onclick = anchorLinkHandler));
	}
}

export default {
	init: init,
	anchorLinkHandler: anchorLinkHandler
};
