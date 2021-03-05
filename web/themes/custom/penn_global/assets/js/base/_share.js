//import $ from "jquery";
import debug from 'bows/dist/bows.min.js';

const elem = document.querySelectorAll(".share__link--modal");
const log = debug("share");

export function sharePop(e) {
	//elem.addEventListener("click", function(e) {

	const href = $(this).attr("href");
	const t = (window.screen.height - 350) / 2;
	const l = (window.screen.width - 550) / 2;
	log(l);
	const opts = [
		"scrollbars=yes",
		"resizable=yes",
		"toolbar=no",
		"location=yes",
		"width=550",
		"height=350",
		"top=" + t,
		"left=" + l
	];
	return window.open(href, "sharer", opts.join(","));
	//});
}

export function init() {
	log(`share init`);
	if (elem !== undefined) {
		for (let i = 0; i < elem.length; i++) {
			elem[i].addEventListener("click", sharePop);
		}
	}

	let clipboard = new ClipboardJS('[data-clipboard-text]');
	let copied = document.querySelector('.share__copied');

	clipboard.on('success', function (e) {
		copied.textContent = "Page URL Copied";
		copied.classList.add('share__copied--success');
		setTimeout(() => {
			copied.classList.remove('share__copied--success');
		}, 3000);
		setTimeout(() => {
			copied.textContent = "";
		}, 3500);
	});

	clipboard.on('error', function (e) {
		copied.textContent = "URL not copied";
		copied.classList.add('share__copied--error');
		setTimeout(() => {
			copied.classList.remove('share__copied--error');
		}, 1000);
		setTimeout(() => {
			copied.textContent = "";
		}, 1250);
	});
}

export default {
	init: init,
	sharePop: sharePop
};
