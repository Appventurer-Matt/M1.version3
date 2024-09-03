/*---------------------------------------------------------
*	Author:			Travolgi
*	Theme:			Cyberwind
*	Version:			1.0.0
*	Created:	 		03/06/2024
*	Last update:	03/06/2024
---------------------------------------------------------*/

/*--------------------------------------------------------
*	HELPER FUNCTIONS
--------------------------------------------------------*/
const delay = (callback, ms) => setTimeout(callback, ms);

const getElement = (selector) => document.querySelector(selector);

const getAllElements = (selector) => document.querySelectorAll(selector);

const changeAttribute = (target, dataAttribute, val = true) => target.setAttribute(dataAttribute, val);

const changeClass = (target, removeClass, addClass) => {
	target.classList.remove(removeClass);
	target.classList.add(addClass);
}


/*--------------------------------------------------------
*	NAVBAR
--------------------------------------------------------*/
const header = getElement('header'),
		navToggle = getElement('#nav-toggle'),
		nav = getElement('#navbar'),
		navToggleOpen = getElement('#nav-toggle-open'),
		navToggleClose = getElement('#nav-toggle-close');

const openNavBar = (val = true) => {
	changeAttribute(nav, 'data-visible', val);
	changeAttribute(navToggle, 'aria-expanded', val);
	nav.classList.toggle('hidden');
	navToggleOpen.classList.toggle('hidden');
	navToggleClose.classList.toggle('hidden');
}

navToggle.addEventListener('click', () => {
	const visible = nav.getAttribute('data-visible');
	if (visible === 'false') {
		openNavBar();
	} else {
		openNavBar(false);
	}
});

// document.addEventListener('click', e => {
// 	if (!header.contains(e.target)) {
// 		openNavBar(false);
// 	}
// });


/*--------------------------------------------------------
*	THEME MODE
--------------------------------------------------------*/
const thememode = getElement('#thememode');

if (thememode) {
	thememode.addEventListener('click', () => document.documentElement.classList.toggle('dark'));
}

/*--------------------------------------------------------
*	SWIPER
--------------------------------------------------------*/
if (getElement('.swiper-reviews')) {
	const swiper = new Swiper('.swiper-reviews', {
		slidesPerView: 2,
		spaceBetween: 25,
		centeredSlides: false,
		loop: true,
		navigation: {
			nextEl: '.swiper-reviews-next',
			prevEl: '.swiper-reviews-prev',
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
				spaceBetween: 20,
				centeredSlides: false,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 25,
				centeredSlides: false,
			},
			1024: {
				slidesPerView: 2,
				spaceBetween: 30,
			}
		}
	});
}


/*--------------------------------------------------------
*	FOOTER
--------------------------------------------------------*/
const thisYear = getElement('#thisYear');
if (thisYear) {
	thisYear.innerHTML= new Date().getFullYear(); 
}


/*--------------------------------------------------------
*	SCROOL TOP BUTTON
--------------------------------------------------------*/
const scroolTop = getElement('#scroolTop');

if (scroolTop) {
	window.onscroll = () => {
		if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
			changeClass(scroolTop, 'hidden', 'block');
		} else {
			changeClass(scroolTop, 'block', 'hidden');
		}
	}

	scroolTop.addEventListener('click', () => {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	});
}