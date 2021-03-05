//import $ from "jquery";
import debug from 'bows/dist/bows.min.js';
import fitvid from "./base/_fitvid";

const log = debug("modal");
const modalBtn = document.querySelectorAll("[data-modal]");
const body = document.querySelector("body");
const top = document.getElementById("top");
const modalOverlay = document.getElementById("modal-overlay");



let focusable = top.querySelectorAll(
	"a,button,input,select,iframe,video,audio, textarea"
);

let current_modal = "";

// Allow Esc key to close modal
function esc() {
	document.addEventListener("keydown", function (evt) {
		evt = evt || window.event;
		var isEscape = false;
		if ("key" in evt) {
			isEscape = evt.key == "Escape" || evt.key == "Esc";
		} else {
			isEscape = evt.keyCode == 27;
		}

		if (isEscape && body.classList.contains("modal-open")) {
			closeModal();
		}
	});
}

// Remove focus from anything in the #top div. Traps focus in the  modal
function removeFocus() {
	focusable.forEach(elm => {
		elm.setAttribute("tabindex", "-1");
	});
}

// Allows focus outside of the modal.
function enableFocus() {
	focusable.forEach(elm => {
		elm.removeAttribute("tabindex");
	});
}

function closeModal() {
	let player = current_modal.querySelector('video');
	let return_focus = document.querySelector(".return_focus");

	current_modal.classList.remove("modal--show");
	if (player) {
		player.pause();
	}
	setTimeout(() => {
		current_modal.setAttribute("aria-hidden", true);
		body.classList.remove("modal-open");
	}, 250);

	enableFocus();
	return_focus.focus();
	return_focus.classList.remove("return_focus");
}

function doModal() {
	let player = current_modal.querySelector('video');

	body.classList.add("modal-open");

	current_modal.setAttribute("aria-hidden", false);
	current_modal.setAttribute("tabindex", "-1");

	setTimeout(() => {
		current_modal.classList.add("modal--show");
	}, 150);

	// Get elements to remove focus on, grab each time incase of AJAX loaded content
	focusable = top.querySelectorAll(
		"a,button,input,select,iframe,video,audio, textarea"
	);
	removeFocus();


	current_modal.focus();
	if (player) {
		player.play();
	}

}

function showModal() {
	const which = this.getAttribute("data-modal");
	current_modal = document.getElementById(which);
	if (current_modal !== undefined && current_modal !== null) {
		log(which);
		this.classList.add("return_focus");
		doModal();
	}
}



export function init() {
	log(`modal init`);
	if (modalBtn) {
		const modal_close = document.querySelectorAll(".modal__close");
		modal_close.forEach(btn => {
			btn.addEventListener("click", closeModal);
		});
		modalBtn.forEach(btn => {
			btn.addEventListener("click", showModal);
		});

		esc();
	}


	if (modalOverlay) {
		// Closes modal if user clicks the overlay
		modalOverlay.addEventListener("click", closeModal);
	}

}

export default {
	init: init
};
