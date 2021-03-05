import debug from 'bows/dist/bows.min.js';

const log = debug('keyboardFocus');
const keyboardFocusClass = 'keyboard--focus';

// Internal flag
let keyboardFocus = false;

export function init() {
	// Keydown event trigger
	window.addEventListener('keydown', (e) => {
		if (e.defaultPrevented || keyboardFocus) {
			return; // Do nothing
		}
		// Capture certain keys (or alt key press)
		if ('Tab' === e.key || 'Enter' === e.key || e.altKey) {
			keyboardFocus = true;
			document.body.classList.add(keyboardFocusClass);
			log('site.keyboardFocus', keyboardFocus);
		}
	});

	// Mousedown event cancel
	window.addEventListener('mousedown', (e) => {
		if (e.defaultPrevented || !keyboardFocus) {
			return; // Do nothing
		}
		// Cancel keyboard active
		keyboardFocus = false;
		document.body.classList.remove(keyboardFocusClass);
		log('site.keyboardFocus', keyboardFocus);
	});
};

export default {
	init: init
};
