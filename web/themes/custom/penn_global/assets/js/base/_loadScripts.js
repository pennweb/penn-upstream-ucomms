import debug from "bows";
const log = debug("loadScripts");

function inject(url, callback, options) {
	// Adding the script tag to the head as suggested before
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;

	if (typeof options !== 'undefined') {
		if (typeof options.async !== 'undefined' && options.async) {
			script.async = true;
		}
		if (typeof options.defer !== 'undefined' && options.defer) {
			script.defer = true;
		}
		if (typeof options.id !== 'undefined' && options.id) {
			script.id = options.id;
		}
	}

	// Then bind the event to the callback function.
	// There are several events for cross browser compatibility.
	script.onreadystatechange = callback;
	script.onload = callback;

	// Fire the loading
	head.appendChild(script);
}


var loadScriptsObj = {
    delay: 100,
	name: null,
	url: null,
	ip: null,
    ips: [],
	env: null,
	envs: [],
	ua: [],
	matchIP: function () {
		return this.ips.indexOf(this.ip) !== -1;
    },
	matchENV: function () {
		return this.envs.indexOf(this.env) !== -1;
	},
	matchUA: function () {
		return this.ua.filter(function (item) {
			return navigator.userAgent.indexOf(item) !== -1;
		}).length > 0;
	},
	blocked: function () {
		if (this.matchUA()) {
			log( this.name, ': Blocked UA' );
			return true;
        }
		if (this.matchENV()) {
			log(this.name, ': Blocked ENV');
			return true;
		}
		if (this.matchIP()) {
			log( this.name, ': Blocked IP' );
			return true;
		}
		return false;
	},
    init: function () {
        this.ip = app.clientIp || null;
        this.env = app.env || null;
        setTimeout(() => {
            if (!this.blocked()) {
                this.run();
            }
        }, this.delay);
    }
};

function loadScripts(Obj) {

	var newObj = Object.create(loadScriptsObj);

	return Object.assign(newObj, Obj);

}


export default {
	load: loadScripts,
	inject
}
