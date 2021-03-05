import debug from 'bows/dist/bows.min.js';

const sizeResize = {
	xlarge: [],
	large: [],
	medium: [],
	small: [],
	any: [],
	body: document.body,
	small_max: 640,
	medium_max: 1024,
	large_max: 1200,
	pause: 100,
	currentSize: '',
	previousSize: ''
};


export function addXlarge(func, params) {
	sizeResize.xlarge.push([func, params]);
}

export function addLarge(func, params) {
	sizeResize.large.push([func, params]);
}

export function addMedium(func, params) {
	sizeResize.medium.push([func, params]);
}

export function addSmall(func, params) {
	sizeResize.small.push([func, params]);
}

export function addAny(func, params) {
	sizeResize.any.push([func, params]);
}

export function getWidth() {
	return sizeResize.body.clientWidth;
}

export function getCurrent(width) {
	sizeResize.previousSize = sizeResize.currentSize;
	if (width <= sizeResize.small_max) {
		sizeResize.currentSize = 'small';
	} else if (width > sizeResize.small_max && width <= sizeResize.medium_max) {
		sizeResize.currentSize = 'medium';
	} else if (width > sizeResize.medium_max && width <= sizeResize.large_max) {
		sizeResize.currentSize = 'large';
	} else {
		sizeResize.currentSize = 'xlarge';
	}
	return sizeResize.currentSize;
}

export function runFunctions() {
	sizeResize.body.classList.remove('size--xlarge');
	sizeResize.body.classList.remove('size--large');
	sizeResize.body.classList.remove('size--medium');
	sizeResize.body.classList.remove('size--small');
	if (sizeResize.currentSize === 'small') {
		sizeResize.body.classList.add('size--small');
		for (var i = 0; i < sizeResize.small.length; i++) {
			sizeResize.small[i][0].apply(this, sizeResize.small[i][1]);
		}
	} else if (sizeResize.currentSize === 'medium') {
		sizeResize.body.classList.add('size--medium');
		for (var i = 0; i < sizeResize.medium.length; i++) {
			sizeResize.medium[i][0].apply(this, sizeResize.medium[i][1]);
		}
	} else if (sizeResize.currentSize === 'large') {
		sizeResize.body.classList.add('size--large');
		for (var i = 0; i < sizeResize.large.length; i++) {
			sizeResize.large[i][0].apply(this, sizeResize.large[i][1]);
		}
	} else if (sizeResize.currentSize === 'xlarge') {
		sizeResize.body.classList.add('size--xlarge');
		for (var i = 0; i < sizeResize.xlarge.length; i++) {
			sizeResize.xlarge[i][0].apply(this, sizeResize.xlarge[i][1]);
		}
	}

	for (var i = 0; i < sizeResize.any.length; i++) {
		sizeResize.any[i][0].apply(this, sizeResize.any[i][1]);
	}
}

export function sizeCheck() {
	const _this = this;
	if (_this.getCurrent(_this.getWidth()) === sizeResize.previousSize) {
		return false;
	}

	_this.runFunctions();
}

export function init() {
	const _this = this;
	_this.getCurrent(_this.getWidth());
	_this.runFunctions();

	var endResizeEvent;
	window.onresize = function () {
		clearTimeout(endResizeEvent);
		endResizeEvent = setTimeout(function () {
			// Run code here, resizing has "stopped"
			_this.sizeCheck();
		}, sizeResize.pause);
	}
}


export default {
	init: init,
	addXlarge: addXlarge,
	addLarge: addLarge,
	addMedium: addMedium,
	addSmall: addSmall,
	addAny: addAny,
	getWidth: getWidth,
	getCurrent: getCurrent,
	runFunctions: runFunctions,
	sizeCheck: sizeCheck
};
