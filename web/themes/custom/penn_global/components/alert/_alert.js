import debug from 'bows/dist/bows.min.js';

let alertContent = document.querySelector('.alert-content');
let header = document.getElementById('header');
let closeBtn = document.querySelectorAll('.alert__close');
let notification = document.querySelectorAll('.alert');
let body = document.querySelector('body');

const log = debug("alerts");

export function alertHeight() {
	if (header && alertContent) {
		header.style.top = alertContent.offsetHeight + 'px';
	}
}

function closeAlert() {
	//close alert, get new height of alertContent & change header top position
	//localStorage to remember what's been closed
	let currentAlert = this.closest('.alert');

	if (currentAlert.classList.contains('alert--emergency') === true) {
		body.classList.remove('alert-emergency');
	}
	log(currentAlert.dataset.alert);

	currentAlert.style.display = 'none';

	if (currentAlert.dataset.alert) {
		localStorage.setItem(currentAlert.dataset.alert, true);
	}

	setTimeout(() => {
		alertHeight();
	}, 100);

}

window.clearAlert = function () {
	localStorage.removeItem('emergency');
	localStorage.removeItem('primary');
	localStorage.removeItem('secondary');
	log('alerts cleared');
}


export function init() {
	if (alertContent) {

		//header top position
		alertHeight();

		closeBtn.forEach(btn => {
			btn.addEventListener("click", closeAlert);
		});

		notification.forEach(notification => {
			if (notification.dataset.alert && localStorage.getItem(notification.dataset.alert)) {
				notification.style.display = 'none';
				alertHeight();
			} else {
				if (notification.classList.contains('alert--emergency') === true && body.classList.contains('styleguide') === false) {
					body.classList.add('alert-emergency');
				}
				body.classList.add('has-alerts')
				notification.style.display = 'block';
				alertHeight();
			}
		});


		window.addEventListener('resize', alertHeight);

	}
}

export default {
	init, alertHeight
};
