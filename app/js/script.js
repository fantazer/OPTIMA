$(document).ready(function () {


	//fancy
	$('.fancybox').fancybox();
	//fancy ===end
	// range-slider
	$(".calc-slider").ionRangeSlider({
		min: 1,
		max: 100,
		grid: false,
		onChange: function (data) {
			$('.calc-range__info__val span').text(data.from);
		}
	});
	// range-slider === end

	//show search panel
	$('.header__search .icon').click(function () {
		event.stopPropagation();
		$('.header__phone').toggle();
		$('.header__search-panel').toggle();
		$('.header__search').toggleClass('header__search--show');
	});
	$('.header__search-panel').on("click", function (event) {
		event.stopPropagation();
	});
	$(document).on("click", function () {
		$('.header__phone').show();
		$('.header__search-panel').hide();
		$('.header__search').removeClass('header__search--show');
	});
	//show search panel===end


	//mobile menu

	//Фиксируем скрол
	$('.head-toggle--open').click(function () {
		$('body').css({
			overflow: '',
			position: '',
			top: ''
		})
	});

	$('.head-toggle').click(function (event) {
		event.stopPropagation();
		$('.head-wrap').toggleClass('head--up');
		$(this).toggleClass('head-toggle--open');
		$('.slide-menu').toggleClass('slide-menu--open');
		$('body').toggleClass('body-fix')
	});

	$('.slide-menu').on("click", function (event) {
		event.stopPropagation();
	});

	$(document).on("click", function () {
		$('.head-wrap').removeClass('head--up');
		$('.head-toggle').removeClass('head-toggle--open');
		$('.slide-menu').removeClass('slide-menu--open');
		if (modalState.isModalShow == false) {
			$('body').removeClass('body-fix')
		}
	});
	//mobile menu===end


	//mobile slider
	var currentSize = $(window).width();
	var sliderMobile = function () {
		if (currentSize < 641) {
			$('.slider').not('.slick-initialized').slick({
				customPaging: function (slider, i) {
					console.log(slider);
					var slideNumber = (i + 1),
						totalSlides = slider.slideCount;

				},
				responsive: [
					{
						breakpoint: 9999,
						settings: "unslick"
					},
					{
						breakpoint: 640,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							infinite: false,
							prevArrow: false,
							nextArrow: false,
						}
					}
				]
			});
		}

		var changeSlider = function(el){
			$(el).on("afterChange", function () {
				$(this).closest('.slider-wrap').find('.slider-val__current').text($(el).slick('slickCurrentSlide') + 1);
			});
			var sizeCurrentSlides = $(el).find('.slick-slide').length;
			$(el).closest('.slider-wrap').find('.slider-val__total').text(sizeCurrentSlides);
		};
		changeSlider('.template');
		changeSlider('.solution');
	};


	var carousel = function () {
		if (currentSize < 769) {
			$('.carousel').not('.slick-initialized').slick({
				responsive: [
					{
						breakpoint: 9999,
						settings: "unslick"
					},
					{
						breakpoint: 786,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
							infinite: true,
							prevArrow: false,
							nextArrow: false,
							centerMode: true,
							centerPadding: '20px'
						}
					},
					{
						breakpoint: 640,
						settings: {
							slidesToShow: 1,
							centerMode: true,
							centerPadding: '20px'
						}
					}
				]
			});
		}
	};

	sliderMobile();
	carousel();

	$(window).resize(function () {
		currentSize = $(window).width();
		sliderMobile();
		carousel();
		return currentSize;
	});

	//mobile slider===end

	//slider control mobile
	$('.slider-control--right').click(function () {
		$(this).closest(".slider-wrap").find(".slider").slick('slickNext');
	});

	$('.slider-control--left').click(function () {
		$(this).closest(".slider-wrap").find(".slider").slick('slickPrev');
	});


	//slider control mobile===end

	//modal
	var modalState = {
		"isModalShow": false, //state show modal
		"scrollPos": 0
	};
	$('.modal-content').click(function (event) {
		event.stopPropagation();
	});

	var openModal = function () {
		if (!$('.modal-layer').hasClass('modal-layer-show')) {
			$('.modal-layer').addClass('modal-layer-show');
			modalState.scrollPos = $(window).scrollTop();
			$('body').css({
				overflow: 'hidden',
				position: 'fixed',
				overflowY: 'scroll',
				top: -modalState.scrollPos,
				width: '100%'
			});
		}
		modalState.isModalShow = true;
	};

	var closeModal = function () {
		$('.modal-layer').removeClass('modal-layer-show');
		$('body').css({
			overflow: '',
			position: '',
			top: modalState.scrollPos
		});
		$(window).scrollTop(modalState.scrollPos);
		$('.modal').removeClass('modal__show');
		modalState.isModalShow = false;
	};

	var initModal = function (el) {
		openModal();
		$('.modal').each(function () {
			if ($(this).data('modal') === el) {
				$(this).addClass('modal__show')
			} else {
				$(this).removeClass('modal__show')
			}
		});
		var modalHeightCont = $(window).height();
		$('.modal-filter').height(modalHeightCont);

	};

	$('.modal-get').click(function () {
		var currentModal = $(this).data("modal");
		initModal(currentModal);
	});

	$('.modal-layer , .modal-close').click(function () {
		closeModal();
	});

	//modals===end

	function detectIE() {
		var ua = window.navigator.userAgent;

		var msie = ua.indexOf('MSIE ');
		if (msie > 0) {
			// IE 10 or older => return version number
			return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		}

		var trident = ua.indexOf('Trident/');
		if (trident > 0) {
			// IE 11 => return version number
			var rv = ua.indexOf('rv:');
			return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
		}

		var edge = ua.indexOf('Edge/');
		if (edge > 0) {
			// Edge (IE 12+) => return version number
			return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
		}

		// other browser
		return false;
	}

	if (detectIE() <= 14 && detectIE()) {
		$('body').empty();
		$('body').prepend('' +
			'<div class="old-browser">' +
			'<div class="old-browser-text"> Сайт не поддерживае Браузер Internet Explorer</div><br>' +
			'<div class="old-browser-text"> Установите <br><br> Chrome Firefox Opera </div><br>' +
			'</div>');
	}
	//for init SVG

	// ==== clear storage =====
	localStorage.clear();
	sessionStorage.clear();
	$(window).unload(function () {
		localStorage.clear();
	});
	// ==== clear storage end =====


	/* ###### For SlideToggle Elements  ######*/
	/*var hideToggle = function(targetClick,toggleEl) {
		$(targetClick).click(function(event){
				event.stopPropagation();
				$(toggleEl).slideToggle("fast");
		});
		$(toggleEl).on("click", function (event) {
			event.stopPropagation();
		});
		$(document).on("click", function () {
				$(toggleEl).hide();
		});
	}
	hideToggle('.icon-bars','.top-menu_link');*/

})

//cash SVG

;(function (window, document) {
	'use strict';

	var file = 'img/pack.html',
		revision = 1;

	if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect)
		return true;

	var isLocalStorage = 'localStorage' in window && window['localStorage'] !== null,
		request,
		data,
		insertIT = function () {
			document.body.insertAdjacentHTML('afterbegin', data);
		},
		insert = function () {
			if (document.body) insertIT();
			else document.addEventListener('DOMContentLoaded', insertIT);
		};

	if (isLocalStorage && localStorage.getItem('inlineSVGrev') == revision) {
		data = localStorage.getItem('inlineSVGdata');
		if (data) {
			insert();
			return true;
		}
	}

	try {
		request = new XMLHttpRequest();
		request.open('GET', file, true);
		request.onload = function () {
			if (request.status >= 200 && request.status < 400) {
				data = request.responseText;
				insert();
				if (isLocalStorage) {
					localStorage.setItem('inlineSVGdata', data);
					localStorage.setItem('inlineSVGrev', revision);
				}
			}
		}
		request.send();
	}
	catch (e) {
	}

}(window, document));