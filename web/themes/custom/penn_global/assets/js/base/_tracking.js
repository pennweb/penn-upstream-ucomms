import $ from "jquery";
import debug from 'bows/dist/bows.min.js';

const log = debug("tracking");
let trackingType = 'testing';

export function trackEvent(action, category, label, value) {
	if (trackingType === 'gtag') {
		gtag('event', action, {
			'event_category': category,
			'event_label': label,
			'value': value
		});
	} else if (trackingType === 'gtm') {
		dataLayer.push({
			'event': 'GAEvent',
			'eventCategory': category,
			'eventAction': action,
			'eventLabel': label,
			'eventValue': value
		});
	} else if (trackingType === 'testing') {
		log(`Action: ${action}`);
		log(`Category: ${category}`);
		log(`Label: ${label}`);
		log(`Value: ${value}`);
	}
}

function fireTracking() {


}

export function init(type) {
	if (type !== undefined) {
		trackingType = type;
	}

	fireTracking();
}

export default {
	init,
	trackEvent
};
