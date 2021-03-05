// import $ from "jquery";
import debug from 'bows/dist/bows.min.js';

const log = debug("video-inline");
let videoInline = document.querySelectorAll('.video-inline');

function changeButtonType(btn, value, hidden) {
	let btnText = btn.querySelector('.a11y');
	btnText.innerHTML = value;
	if (value === 'pause') {
		btn.classList.add('video-button--pause');
		btn.classList.remove('video-button--play');
	} else {
		btn.classList.remove('video-button--pause');
		btn.classList.add('video-button--play');
	}

	if (hidden === true) {
		btn.setAttribute('hidden', true);

	}
}

function playPauseVideo(player, btnPlayPause) {
	if (player.paused || player.ended) {
		// Change the button to a pause button
		let isloop = player.getAttribute('autoplay');
		if (isloop !== null && isloop !== false) {
			changeButtonType(btnPlayPause, 'pause', false);
		} else {
			changeButtonType(btnPlayPause, 'pause', true);
		}

		if (player.classList.contains('video-inline__video--controls') === true) {
			player.setAttribute('controls', true);
		}
		player.play();
	}
	else {
		changeButtonType(btnPlayPause, 'play', false);
		if (player.classList.contains('video-inline__video--controls') === true) {
			player.removeAttribute('controls');
		}
		player.pause();
	}
}


function setUp() {
	videoInline.forEach(el => {
		let player = el.querySelector('video');
		let btnPlayPause = el.querySelector('.video-button--play-toggle');

		if (btnPlayPause) {
			btnPlayPause.addEventListener('click', function () {
				playPauseVideo(player, btnPlayPause);
			});
		}

		if (player) {
			// Add a listener for the play and pause events so the buttons state can be updated
			player.addEventListener('play', function () {
				// Change the button to be a pause button
				changeButtonType(btnPlayPause, 'pause');
			}, false);

			player.addEventListener('pause', function () {
				// Change the button to be a play button
				changeButtonType(btnPlayPause, 'play');
			}, false);
		}
	});
}

export function init() {
	if (videoInline.length) {
		setUp();
	}
}

export default {
	init
};
