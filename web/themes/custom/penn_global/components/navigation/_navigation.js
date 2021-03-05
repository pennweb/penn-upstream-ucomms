// import $ from "jquery";
import debug from 'bows/dist/bows.min.js';
import Headroom from 'headroom.js';
import hoverintent from 'hoverintent';
import inViewport from '../../assets/js/base/_inViewport';
import alerts from '../alert/_alert';
import $ from "jquery";


const log = debug("navigation");
const body = document.body;

const top = document.getElementById("top");
const header = document.getElementById('header');
const search = document.getElementById('search__input');

const mainNav = document.querySelector('.nav--primary');
const navMainBtn = document.querySelector('.header__toggle-btn--menu');
const mobileSubNavButton = document.querySelectorAll('.nav__menu-button--level-1');
const topLevelButton = document.querySelectorAll('.nav__menu-button--level-0');
const topLevelLink = document.querySelectorAll('.nav__menu-link[data-level="0"]');
const childMenus = document.querySelectorAll('.nav__menu-item--level-0.nav__menu-item--children');


const searchBtn = document.querySelectorAll('.header__toggle-btn--search');
const searchCloseBtn = document.querySelector('.search__close');
const searchSection = document.querySelector('.search--header');

const dropdown = document.querySelector('.nav-dropdown');
const dropdownBtn = document.querySelector('.nav-dropdown__toggle-btn');
const utilItems = document.querySelectorAll('.nav--secondary > *:not(.nav-dropdown)');

const skipSearch = document.querySelector('.skip-link--search');
const skipResources = document.querySelector('.skip-link--resources');

const headerMenus = document.getElementById('headerMenus');
const secondaryNav = document.querySelector('.nav--secondary');

var isSafari = !!navigator.userAgent.match(/safari/i) && !navigator.userAgent.match(/chrome/i) && typeof document.body.style.webkitFilter !== "undefined" && !window.chrome;
if (isSafari) {
	body.classList.add('isSafari');
}

log(alerts.alertHeight());

// headroom variables
let headroomActive = false;
let hero = document.querySelector('main>*:first-child');
//let hero = document.querySelector('.hero');

let herosticky = false;
const nav = document.getElementById('header');
const headroom = new Headroom(nav, {
	offset: 60,
	tolerance: {
		down: 25,
		up: 25
	},
	onNotTop: function () {
		body.classList.remove('search-open', 'search-opened');
	}
});



let focusable = top.querySelectorAll(
	"a,button,input,select,iframe,video,audio, textarea"
);


function removeFocus() {
	focusable.forEach(elm => {
		elm.setAttribute("tabindex", "-1");
	});
}

function enableFocus() {
	focusable.forEach(elm => {
		elm.removeAttribute("tabindex");
	});
}

function returnFocus(doFocus) {
	let returnFocusElm = document.querySelector('.return-focus');
	if (returnFocusElm !== null) {
		if (doFocus !== false) {
			returnFocusElm.focus();
		}
		returnFocusElm.classList.remove('return-focus');
	}
}

function closeAllSubNav() {
	mobileSubNavButton.forEach(msb => {
		closeSubMenu(msb);
	});
}

function openMenu() {

	// focusable = top.querySelectorAll(
	// 	"a,button,input,select,iframe,video,audio, textarea"
	// );

	// removeFocus();

	// focusable = header.querySelectorAll(
	// 	"a,button,input,select,iframe,video,audio, textarea"
	// );
	// enableFocus();

	body.classList.add('menu-opened');
	body.classList.add('menu-open');

	hideAlerts();

	//headerMenus.setAttribute('tabindex', '-1');
	setTimeout(() => {

		let firstItem = headerMenus.querySelector('a');
		firstItem.focus();
	}, 500);
}

function closeMenu(doFocus = true) {
	let ariaExpanded = header.querySelectorAll('[aria-expanded]');
	ariaExpanded.forEach(ae => {
		ae.setAttribute('aria-expanded', false);
	});

	enableFocus();
	body.classList.remove('menu-open');
	body.classList.remove('menu-opened');

	showAlerts();

	// setTimeout(() => {
	// 	body.classList.remove('menu-opened');
	// }, 5);

	returnFocus(doFocus);

	let nmbo = document.querySelectorAll('.nav__menu-button--open');
	nmbo.forEach((el) => {
		closeSubMenu(el);
	});

}

function hideAlerts() {
	if ( $("body").hasClass("has-alerts") == true ) {
		if ( $("#header").hasClass("headroom--not-top") == false ) {
			$(".header").css({
			"position": "fixed",
			"top": "0"
			});
		}
	
		$(".alert-content").css("visibility", "hidden");
	
		if ( $("#header").hasClass("headroom--not-top") == false ) {
			$("#content").css("margin", "-"+alertContentHeight()+"px 0 0 0");
		}
	}
}

function showAlerts() {
	if ( $("body").hasClass("has-alerts") == true ) {
		if ( $("#header").hasClass("headroom--not-top") == false ) {
			$(".header").css({
			"position": "absolute",
			"top": alertContentHeight()+"px"
			});
		}
	
		$(".alert-content").css("visibility", "visible");
	
		if ( $("#header").hasClass("headroom--not-top") == false ) {
			$("#content").css("margin", "0 0 0 0");
		}
	}
}

function closeMenuIfInactive(e) {
	setTimeout(function() {
		if (body.clientWidth >= 1024 && !mainNav.contains(document.activeElement)) {
			closeMenu(false); //close menu without returning focus, since the user has left the menu
		} else if (body.clientWidth < 1024 && !header.contains(document.activeElement)) {
			// On mobile, close the menu when focus leaves the header altogether
			closeMenu(false);
		}
	}.bind(this), 500); // give users enough time to finish a full click
}

function closeSearchIfInactive(e) {
	setTimeout(function() {
		if (!searchSection.contains(document.activeElement)) {
			closeSearch();
		}
	}.bind(this), 500); // give users enough time to finish a full click
}

function setReturnFocus($this) {
	returnFocus(false);
	$this.classList.add('return-focus');
}


function toggleMenu() {
	this.focus(); // compensates for idiosyncratic treatment of <button> focus across browsers
	if (body.classList.contains('menu-opened') === false) {
		shouldCloseSearch()
		setReturnFocus(this);
		openMenu();
	} else {
		closeMenu();
	}
}

function esc() {
	document.addEventListener("keydown", function (evt) {
		evt = evt || window.event;
		var isEscape = false;
		if ("key" in evt) {
			isEscape = evt.key == "Escape" || evt.key == "Esc";
		} else {
			isEscape = evt.keyCode == 27;
		}

		if (isEscape && (body.classList.contains('menu-opened') === true ||  body.classList.contains('toplevel-opened') )) {
			closeMenu();
		}
		if (isEscape && body.classList.contains('search-opened') === true) {
			closeSearch();
		}
		if (isEscape && dropdown.classList.contains('nav-dropdown--active') === true) {
			closeDropdown();
		}
	});
}


function subMenuOpen(el, time) {

	el.classList.add('nav__submenu--visible');
	setTimeout(() => {
		el.classList.add('nav__submenu--active');
	}, time);
}

function subMenuClose(el, time) {
	el.classList.remove('nav__submenu--visible');
	setTimeout(() => {
		el.classList.remove('nav__submenu--active');
	}, time);
}

function openSubMenu(el) {

	let navItem = el.closest('.nav__menu-item');
	let nextSubmenu = navItem.querySelector('.nav__submenu');
	let nextNavmenu = navItem.querySelector('.nav__menu');
	let prevSibling = el.previousElementSibling;

	el.classList.add('nav__menu-button--open');
	navItem.classList.add('nav__menu-item--open');

	el.setAttribute('aria-expanded', true);
	prevSibling.classList.add('nav__menu-link--active');

	if (nextSubmenu) {
		subMenuOpen(nextSubmenu, 5);
	} else if (nextNavmenu) {
		subMenuOpen(nextNavmenu, 5);
	}
}

function closeSubMenu(el) {
	// let thisParent = this.parentNode;
	if (el !== undefined) {
		el.classList.remove('nav__menu-button--open');
		let navItem = el.closest('.nav__menu-item');
		let nextSubmenu = navItem.querySelector('.nav__submenu');
		let prevSibling = el.previousElementSibling;

		navItem.classList.remove('nav__menu-item--open');

		el.setAttribute('aria-expanded', false);
		prevSibling.classList.remove('nav__menu-link--active');

		let nextSibling = el.nextElementSibling;

		if (nextSibling !== null) {
			subMenuClose(nextSibling, 5);
		} else if (nextSubmenu) {
			subMenuClose(nextSubmenu, 5);
		}
	}
}

function toggleSubMenu() {
	this.focus(); // compensates for idiosyncratic treatment of <button> focus across browsers
	if (this.classList.contains('nav__menu-button--open') === false) {
		if (body.clientWidth >= 1024) {
			closeAllSubNav();
		}
		openSubMenu(this);

	} else {
		closeSubMenu(this);
	}
}


function closeTopLevel(all, $this) {
	if (document.body.clientWidth >= 1024 && all !== false) {
		childMenus.forEach(el => {
			let btn = el.querySelector('.nav__menu-button--level-0');
			let subMenu = el.querySelector('.nav__submenu');
			let navItem = el.closest('.nav__menu-item');
			if (btn) {
				btn.classList.remove('nav__menu-button--open');
			}
			if (subMenu) {
				subMenu.classList.remove('nav__submenu--visible');
				subMenu.classList.remove('nav__submenu--active');
			}
			if (navItem) {
				navItem.classList.remove('nav__menu-item--open');
			}
			body.classList.remove('toplevel-opened');
		});
	} else {
		let subMenu = $this.closest('li').querySelector('.nav__submenu');
		let navItem = $this.closest('.nav__menu-item');
		$this.setAttribute('aria-expanded', false);
		$this.classList.remove('nav__menu-button--open');
		navItem.classList.remove('nav__menu-item--open');
		body.classList.remove('toplevel-opened');
		if (subMenu) {
			subMenu.classList.remove('nav__submenu--visible');
			setTimeout(() => {
				subMenu.classList.remove('nav__submenu--active');
			}, 10);
		}
	}
}

function openTopLevel($this) {
	let subMenu = $this.closest('li').querySelector('.nav__submenu');
	let navItem = $this.closest('.nav__menu-item');
	$this.setAttribute('aria-expanded', true);
	$this.classList.add('nav__menu-button--open');
	navItem.classList.add('nav__menu-item--open');
	body.classList.add('toplevel-opened');
	if (subMenu) {
		subMenu.classList.add('nav__submenu--visible');
		setTimeout(() => {
			subMenu.classList.add('nav__submenu--active');
		}, 10);
	}
}

function toggleTopMenu() {
	this.focus(); // compensates for idiosyncratic treatment of <button> focus across browsers
	if (this.classList.contains('nav__menu-button--open')) {
		closeTopLevel(false, this);
	} else {
		if (document.body.clientWidth >= 1024) {
			closeTopLevel(true);
			setReturnFocus(this);
		}
		openTopLevel(this);
		shouldCloseSearch();
	}

}


function openSearch() {
	body.classList.add('search-opened');
	setTimeout(() => {
		body.classList.add('search-open');
	}, 100);
	setTimeout(() => {
		search.focus();
	}, 800);

}

function shouldCloseSearch() {
	log('shouldCloseSearch');
	if (body.classList.contains('search-opened') === true) {
		closeSearch(false);
	}
}

function closeSearch(doReturnFocus) {
	body.classList.remove('search-open');

	setTimeout(() => {
		body.classList.add('search-closing');
	}, 100);
	setTimeout(() => {
		body.classList.remove('search-opened');
		body.classList.remove('search-closing');
	}, 500);

	if (doReturnFocus !== false) {
		returnFocus();
	}
}

function toggleSearch() {
	if (body.classList.contains('search-opened') === false) {
		if (body.classList.contains('menu-opened') === true) {
			closeMenu();
		}
		if (document.body.clientWidth >= 1024) {
			closeTopLevel();
		}
		setReturnFocus(this);
		openSearch();
	} else {
		closeSearch();
	}

}

function openDropdown() {

	if (body.classList.contains('search-open') === true) {
		closeSearch(false);
	}
	closeMenu();

	dropdown.classList.add('nav-dropdown--active');
	dropdownBtn.classList.add('nav__dropdown-toggle-btn--open');
	dropdownBtn.setAttribute('aria-expanded', true);
}

function closeDropdown() {
	dropdown.classList.remove('nav-dropdown--active');
	dropdownBtn.classList.remove('nav__dropdown-toggle-btn--open');
	dropdownBtn.setAttribute('aria-expanded', false);
}

function toggleDropdown() {
	if (this.classList.contains('nav__dropdown-toggle-btn--open') === false) {
		openDropdown(this);
	} else {
		closeDropdown(this);
	}
}

function itemHoverIntent(element, theClass, visClass, time) {
	var opts = {
		timeout: time
	}

	element.forEach(function (elem) {
		var hoverListener = hoverintent(elem,
			function () {
				if (document.body.clientWidth >= 1024) {
					closeTopLevel();
					closeSearch();
				}
				elem.classList.add(visClass);
				setTimeout(() => {
					elem.classList.add(theClass);
				}, 100);
			},
			function () {
				elem.classList.remove(theClass);
				setTimeout(() => {
					elem.classList.remove(visClass);
					closeAllSubNav();
				}, 100);
			}).options(opts);
	});
}


function is_touch_device() {
	return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0));
}

let alertContent = document.querySelector('.alert-content');
function stickyHeaderAlertSmall() {
	if (document.body.clientWidth < 1024) {
		if (headroomActive === false) {
			if (inViewport.isAnyPartOfElementInViewport(alertContent) === false) {
				headroom.init();
				headroomActive = true;
				body.classList.add('header-sticky');
			}

		} else {
			if (inViewport.isAnyPartOfElementInViewport(alertContent) === true) {
				headroom.destroy();
				headroomActive = false;
				body.classList.remove('header-sticky');
			}
		}
	}
}

// Make the navigation sticky after it scrolls past the first element in the <main id="content">
// Navigation will be sticky in different places on each page based on content size

function stickyHeaderFirstElement() {
	if (headroomActive === false) {
		if (inViewport.isAnyPartOfElementInViewport(hero) === false && herosticky === false) {
			herosticky = true;
			headroom.init();
			headroomActive = true;
			body.classList.add('hero-out');

			setTimeout(() => {
				body.classList.add('hero-out--show');
			}, 250);
		}

	} else if (inViewport.isAnyPartOfElementInViewport(hero) === true && herosticky === true) {
		if (headroomActive === true) {
			herosticky = false;
			body.classList.add('hero-leave');
			body.classList.remove('hero-out--show');
			setTimeout(() => {
				body.classList.remove('hero-leave');
				body.classList.remove('hero-out');
				headroom.destroy();
				headroomActive = false;
			}, 250);
		}
	}
}


// Make the navigation sticky after it scrolls past a set amout of pixels
// Navigation will be sticky at the same place regardless of content
function stickyHeaderScrollPosition(position) {
	if (headroomActive === false) {
		if (window.scrollY >= position && herosticky === false) {
			herosticky = true;
			headroom.init();
			headroomActive = true;
			body.classList.add('hero-out');

			setTimeout(() => {
				body.classList.add('hero-out--show');
			}, 250);
		}

	} else if (window.scrollY < position && herosticky === true) {
		if (headroomActive === true) {
			herosticky = false;
			body.classList.add('hero-leave');
			body.classList.remove('hero-out--show');
			setTimeout(() => {
				body.classList.remove('hero-leave');
				body.classList.remove('hero-out');
				headroom.destroy();
				headroomActive = false;
			}, 250);
		}
	}
}

// Get the height of the alert content in px
function alertContentHeight() {
	if (header && alertContent) {
		return alertContent.offsetHeight;
	} else return 0;
}

export function init() {
	const navMenuItem0 = document.querySelectorAll('.nav--primary .nav__menu-item--level-0.nav__menu-item--children');

	if (!is_touch_device()) {
		itemHoverIntent(navMenuItem0, 'nav__menu-item--active', 'nav__menu-item--visible', 200);
	}

	if (topLevelLink) {
		topLevelLink.forEach(tll => {
			tll.addEventListener('focus', function () {
				if (document.body.clientWidth >= 1024) {
					closeMenu();
				}
			});
		})

	}
	if (navMainBtn) {
		navMainBtn.addEventListener('click', toggleMenu);
	}
	if (header) {
		header.addEventListener('focusout', closeMenuIfInactive);
	}
	if (topLevelButton) {
		topLevelButton.forEach((tlb) => {
			tlb.addEventListener('click', toggleTopMenu);
		});
	}

	if (mobileSubNavButton) {
		mobileSubNavButton.forEach((msnb) => {
			msnb.addEventListener('click', toggleSubMenu);
		});
	}

	if (searchBtn) {
		searchBtn.forEach((sb) => {
			sb.addEventListener('click', toggleSearch);
		});
	}
	if (searchCloseBtn) {
		searchCloseBtn.addEventListener('click', closeSearch);
	}
	if (searchSection) {
		searchSection.addEventListener('focusout', closeSearchIfInactive);
	}

	if (dropdown) {
		dropdown.addEventListener('mouseleave', function () {
			closeDropdown();
		});
	}

	if (dropdownBtn) {
		dropdownBtn.addEventListener('click', toggleDropdown);
	}

	if (skipSearch) {
		skipSearch.addEventListener('click', openSearch);
	}
	if (skipResources) {
		skipResources.addEventListener('click', openDropdown);
	}

	if (utilItems) {
		utilItems.forEach((ui) => {
			ui.addEventListener('focus', closeDropdown);
		});
	}

	if (navMainBtn || searchBtn || dropdownBtn) {
		esc();
	}



	if (nav) {

		// Can be used to provide homepage different instructions for sticky nav if desired
		// if (body.classList.contains('homepage') === true) {

		// } else {


		if (body.clientWidth < 1024) {
			if (alertContent) {
				stickyHeaderAlertSmall();
			} else {
				headroomActive = true;
				headroom.init();
			}
			//
			//
			//find last item in #headerMenus and on blur return to toggle-btn with class return-focus (less than 1024)
			secondaryNav.lastElementChild.addEventListener('blur', function () {
				navMainBtn.focus();
			});
		}


		window.addEventListener('scroll', function () {
			stickyHeaderFirstElement();
			if (alertContent) {
				stickyHeaderAlertSmall();
			}
			// stickyHeaderScrollPosition(1500)
		});



		window.addEventListener('resize', function () {
			headroomActive = false;
			setTimeout(() => {
				if (body.clientWidth < 1024) {

					if (alertContent) {
						stickyHeaderAlertSmall();
					} else {
						headroomActive = true;
						headroom.init();
					}
				} else {
					stickyHeaderFirstElement();
					// stickyHeaderScrollPosition(1500)
				}
			}, 100);

			if (body.classList.contains('menu-opened')) {
				hideAlerts();
			}
		});
		//}

	}

}

export default {
	init
};