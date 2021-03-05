// https://codepen.io/heydon/pen/veeaEa
// import $ from "jquery";


// Get relevant elements and collections
const tabbed = document.querySelectorAll('.js-wikit-tabbed');

const accordionTitle = document.querySelectorAll('.accordion-toggle-tab');

function doEachTab(tablist, tabs, panels, toggleTab) {

	// The tab switching function
	let switchTab = (oldTab, newTab, isFocus) => {

		if (isFocus !== false) {
			newTab.focus();
		} else

			// Make the active tab focusable by the user (Tab key)
			newTab.removeAttribute('tabindex');

		// Set the selected state
		newTab.setAttribute('aria-selected', 'true');
		newTab.removeAttribute('tabindex');
		oldTab.removeAttribute('aria-selected');
		oldTab.setAttribute('tabindex', '-1');
		oldTab.setAttribute('aria-selected', 'false');
		// Get the indices of the new and old tabs to find the correct
		// tab panels to show and hide
		let index = Array.prototype.indexOf.call(tabs, newTab);
		let oldIndex = Array.prototype.indexOf.call(tabs, oldTab);

		panels[oldIndex].hidden = true;
		panels[index].hidden = false;

		// Code for updating accordions
		let oldAtt = oldTab.getAttribute('href').split('#');
		let newAtt = newTab.getAttribute('href').split('#');


		oldAtt = document.querySelector(`.accordion-toggle-tab[aria-controls="${oldAtt[1]}"]`);
		newAtt = document.querySelector(`.accordion-toggle-tab[aria-controls="${newAtt[1]}"]`);

		if (oldAtt) {
			oldAtt.setAttribute('aria-expanded', 'false');
		}

		if (newAtt) {
			newAtt.setAttribute('aria-expanded', 'true');
		}

		// Trigger resize event for sliders
		window.dispatchEvent(new Event('resize'));
		window.upennsliders.forEach(slider => {
			slider.slick('setPosition')
		});
	}



	// Add the tablist role to the first <ul> in the .tabbed container
	tablist.setAttribute('role', 'tablist');

	// Add semantics are remove user focusability for each tab
	Array.prototype.forEach.call(tabs, (tab, i) => {
		tab.setAttribute('role', 'tab');
		// tab.setAttribute('id', 'tab' + (i + 1));
		tab.setAttribute('tabindex', '-1');
		tab.parentNode.setAttribute('role', 'presentation');

		// Handle clicking of tabs for mouse users
		tab.addEventListener('click', e => {
			e.preventDefault();
			let currentTab = tablist.querySelector('[aria-selected="true"]');
			if (e.currentTarget !== currentTab) {

				switchTab(currentTab, e.currentTarget, true);
			}
		});


		// Handle keydown events for keyboard users
		tab.addEventListener('keydown', e => {
			// Get the index of the current tab in the tabs node list
			let index = Array.prototype.indexOf.call(tabs, e.currentTarget);
			// Work out which key the user is pressing and
			// Calculate the new tab's index where appropriate
			let dir = e.which === 37 ? index - 1 : e.which === 39 ? index + 1 : e.which === 40 ? 'down' : null;
			if (dir !== null) {
				e.preventDefault();
				// If the down key is pressed, move focus to the open panel,
				// otherwise switch to the adjacent tab

				dir === 'down' ? panels[i].focus() : tabs[dir] ? switchTab(e.currentTarget, tabs[dir]) : void 0;
			}
		});
	});

	// Add tab panel semantics and hide them all
	Array.prototype.forEach.call(panels, (panel, i) => {
		panel.setAttribute('role', 'tabpanel');
		panel.setAttribute('tabindex', '-1');
		let id = panel.getAttribute('id');
		panel.setAttribute('aria-labelledby', tabs[i].id);
		panel.hidden = true;
	});


	// Initially activate the first tab and reveal the first tab panel
	tabs[0].removeAttribute('tabindex');
	tabs[0].setAttribute('aria-selected', 'true');

	Array.prototype.forEach.call(toggleTab, tt => {
		tt.setAttribute('aria-expanded', false);
	});
	toggleTab[0].setAttribute('aria-expanded', true);
	panels[0].hidden = false;

}


function tabAccordionFix() {
	// Ensure that accordion buttons are set correctly if user goes from large to small screens
	let acc = document.querySelectorAll('.accordion-toggle-tab');
	acc.forEach(tab => {
		let isHidden = tab.nextElementSibling.getAttribute('hidden');
		if (isHidden !== null && isHidden !== true) {
			tab.setAttribute('aria-expanded', false);
		}
	});

}

function init() {
	if (tabbed.length > 0) {
		for (let i = 0; i < tabbed.length; i++) {
			let tablist = tabbed[i].querySelector('ul');
			let tabs = tablist.querySelectorAll('a');
			let panels = tabbed[i].querySelectorAll('[id^="tabpanel"]');
			let toggleTab = tabbed[i].querySelectorAll('.accordion-toggle-tab');
			doEachTab(tablist, tabs, panels, toggleTab);
		}

		var endResizeEvent;
		window.addEventListener('resize', function () {

			clearTimeout(endResizeEvent);
			endResizeEvent = setTimeout(function () {
				tabAccordionFix();
				// Code below ensures that
				if (window.innerWidth >= 1024) {

					// Run code here, resizing has "stopped"
					let tf = document.querySelectorAll('.tablist--fix');
					tf.forEach($this => {
						let wk = $this.closest('.js-wikit-tabbed').querySelectorAll('.wikit-tab')
						let activeTab = $this.querySelector('[aria-selected="true"]').getAttribute('href').split('#');
						let removeHidden = document.getElementById(activeTab[1]);

						$this.classList.remove('tablist--fix');
						wk.forEach(wk => {
							wk.setAttribute('hidden', 'hidden');
						});

						if (removeHidden) {
							removeHidden.removeAttribute('hidden');
						}
					})
				}
			}, 250);

		});
	}


	Array.prototype.forEach.call(accordionTitle, at => {
		let btn = at;
		let target = at.nextElementSibling;

		btn.onclick = () => {
			let expanded = btn.getAttribute('aria-expanded') === 'true';

			btn.setAttribute('aria-expanded', !expanded);
			target.hidden = expanded;

			let tabTarget = target.getAttribute('id');
			let activeTab = document.querySelector(`.tab-nav__link[href="#${tabTarget}"]`);

			if (activeTab) {
				let tabList = activeTab.parentElement.parentElement;
				let tabs = tabList.querySelectorAll('a[role="tab"]');

				tabList.classList.add('tablist--fix');
				Array.prototype.forEach.call(tabs, tab => {
					tab.removeAttribute('aria-selected');
					tab.setAttribute('tabindex', '-1');
					tab.setAttribute('aria-selected', 'false');
				});

				activeTab.setAttribute('aria-selected', 'true');
				activeTab.removeAttribute('tabindex');
			}
			// Trigger resize event for sliders
			window.dispatchEvent(new Event('resize'));
			window.upennsliders.forEach(slider => {
				slider.slick('setPosition')
			});
		}
	});

}

export default {
	init
};

