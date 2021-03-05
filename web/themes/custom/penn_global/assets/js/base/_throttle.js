import debug from 'bows/dist/bows.min.js';

const log = debug('throttle');

export default function (fn, time = 50) {
	let timer = null;

	log(fn, time);

	function throttledFn(...args) {
		if (!timer) {
			timer = setTimeout(() => {
				fn(...args);
				timer = null;
			}, time)
		}
	}

	throttledFn.cancel = () => {
		clearTimeout(timer);
		timer = null;
	}

	return throttledFn;
}