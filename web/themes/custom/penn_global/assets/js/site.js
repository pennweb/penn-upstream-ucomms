// Polyfill
import './base/_polyfill';
// external scripts
import debug from 'bows/dist/bows.min.js';

// example of ES2015 modules loading & tree shaking
import { emptyLinks } from './base/_links';

import fitvid from './base/_fitvid';
import keyboardFocus from './base/_keyboardFocus';
import size from './base/_size';
// import smoothScroll from './base/_smoothScroll';

// Site
import objectFitImages from 'object-fit-images';

import modal from './_modal';
import navigation from '../../components/navigation/_navigation';
import video_inline from '../../components/video-inline/_video-inline';
import video_vimeo from '../../components/video-vimeo/_video-vimeo';
import filter from '../../components/filter/_filter';
import hero from '../../components/hero/_hero';
import accordion from '../../components/accordion/_accordion';
import tabs from '../../components/tabs/_tabs';
import link_grid from '../../components/link-grid/_link-grid';
import a_to_z from '../../components/a-to-z/_a-to-z';
import general from './_general';
import factbars from '../../components/fact-bar/_fact-bar';
import alert from '../../components/alert/_alert';
// Card Imports
import cards from '../../components/card/_card';
import articleCards from '../../components/article-card/_article-card';
import featuredInitiativeCards from '../../components/featured-initiative-card/_featured-initiative-card';
import eventCards from '../../components/event-card/_event-card';
import listingCards from '../../components/listing-card/_listing-card';
import gridCards from '../../components/grid-card/_grid-card';
//Slider Imports
import threeAcross from './sliders/_three-across';
import centerToEdge from './sliders/_center-to-edge';
import singleSmall from './sliders/_single-small';
import gallery from './sliders/_slider-gallery';
import twoAcross from './sliders/_two-across';
import single from './sliders/_single';
import singleImage from './sliders/_single-image';
import threeAcrossCards from './sliders/_three-across-cards';


const log = debug("site");

class Site {
	constructor() {
		document.addEventListener('DOMContentLoaded', () => this.ready());
		window.addEventListener('load', () => this.load());
	}

	ready() {
		const log = debug("site:domReady");
		alert.init();
		//Creates globablly accessible array for sliders to be used to fix issue with slider in tabs
		window.upennsliders = [];

		keyboardFocus.init();

		log('document.DOMContentLoaded');

		navigation.init();
		modal.init();

		size.init();
		filter.init();
		fitvid();
		video_inline.init();
		video_vimeo.init();
		hero.init();
		accordion.init();
		tabs.init();
		link_grid.init();
		a_to_z.init();
		general.init();
		factbars.init();

		//Cards
		cards.init();
		articleCards.init();
		featuredInitiativeCards.init();
		eventCards.init();
		listingCards.init();
		gridCards.init();

		// Sliders
		threeAcross.init();
		centerToEdge.init();
		singleSmall.init();
		gallery.init();
		twoAcross.init();
		single.init();
		singleImage.init();
		threeAcrossCards.init();
	}

	load() {
		const log = debug("site:windowLoad");
		log("window.onload");
		objectFitImages();


		//Uncomment to preload background images for Link Grid
		//link_grid.loadAllGrid();


	}

}

export default Site;
