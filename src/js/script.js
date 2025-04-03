$(document).ready(function () {

	// sticky menu + toTop

	$(window).scroll(function () {

		if ($(this).scrollTop() >= 60) {
			$('.header__bottom').addClass('fixed');
		} else {
			$('.header__bottom').removeClass('fixed');
		}

		if ($(this).scrollTop() >= 4000) {
			$('.to-top').addClass('show');
		} else {
			$('.to-top').removeClass('show');
		}
	});

	$('.to-top').on('click', function () {
		$('html').animate({ scrollTop: 0 }, 2000);
	});


	//Mobile menu

	// Variable declaration...
	var left, width, newLeft;

	// Add the "top-menu" class to the top level ul...
	$('.nav').children('ul').addClass('top-menu');

	// Add buttons to items that have submenus...
	$('.drop-down').append('<button class="arrow"><i class="icon-chevron-right"></i></button>');

	// Mobile menu toggle functionality
	$('.burger').on('click', function () {
		$(this).toggleClass("active");

		// Detect whether the mobile menu is being displayed...
		display = $('.nav').css("display");

		if (display === 'none') {

			// Display the menu...
			$('.nav').css("display", "block");

		} else {

			// Hide the mobile menu...
			$('.nav').css("display", "none");

			// and reset the mobile menu...
			$('.current-menu').removeClass('current-menu');
			$('.top-menu').css("left", "0");
			$('.back-button').css("display", "none");
		}
	});

	// Functionality to reveal the submenus...
	$('.arrow').on('click', function () {

		// The .current-menu will no longer be current, so remove that class...
		$('.current-menu').removeClass('current-menu');

		// Turn on the display property of the child menu
		$(this).siblings('ul').css("display", "block").addClass('current-menu');

		left = parseFloat($('.top-menu').css("left"));
		width = Math.round($('.nav').width());
		newLeft = left - width;

		// Slide the new menu leftwards (into the .mobile viewport)...
		$('.top-menu').css("left", newLeft);

		// Also display the "back button" (if it is hidden)...
		if ($('.back-button').css("display") === "none") {
			$('.back-button').css("display", "flex");
		}
	});

	// Functionality to return to parent menus...
	$('.back-button').on('click', function () {

		// Hide the back button (if the current menu is the top menu)...
		if ($('.current-menu').parent().parent().hasClass('top-menu')) {
			$('.back-button').css("display", "none");
		}

		left = parseFloat($('.top-menu').css("left"));
		width = Math.round($('.nav').width());
		newLeft = left + width;

		// Slide the new menu leftwards (into the .mobile viewport)...
		$('.top-menu').css("left", newLeft);

		// Allow 0.25 seconds for the css transition to finish...
		window.setTimeout(function () {

			// Hide the out-going .current-menu...
			$('.current-menu').css("display", "none");

			// Add the .current-menu to the new current menu...
			$('.current-menu').parent().parent().addClass('current-menu');

			// Remove the .current-menu class from the out-going submenu...
			$('.current-menu .current-menu').removeClass('current-menu');

		}, 250);

	});

	// popup

	$(".click-here").on('click', function () {
		$(".modal-main").addClass('model-open');
	});
	$(".close-btn, .bg-overlay").click(function () {
		$(".modal-main").removeClass('model-open');
	});

	// top-slider

	jQuery(function () {
		// Основной элемент слайдера
		const $topSlider = $(".top-slider");
		// Контейнер для точек навигации
		const $topSliderDots = $(".top-slider__dots");
		// Скорость анимации перехода между слайдами (миллисекунды)
		const ANIMATION_SPEED = 1500;
		// Интервал автоматического переключения слайдов (миллисекунды)
		const AUTOPLAY_SPEED = 6000;

		/**
		 * @type {import("slick-carousel")}
		 * Инициализация slick-слайдера с параметрами
		 */
		$topSlider.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			dots: true,
			fade: true,
			autoplay: true,
			autoplaySpeed: AUTOPLAY_SPEED,
			appendDots: $topSliderDots,
			prevArrow: $(".top-slider__prev"),
			nextArrow: $(".top-slider__next"),
			speed: ANIMATION_SPEED,
			pauseOnFocus: false,
			pauseOnHover: false,
			responsive: [
				{
					breakpoint: 575,
					settings: {
						dots: false
					}
				}
			]
		});

		// Класс CSS для активного элемента
		const activeClass = "slick-active";
		// ARIA-атрибут для управления видимостью для скринридеров
		const ariaAttribute = "aria-hidden";

		/**
		 * SVG-разметка для индикатора прогресса
		 * Отображает круговой таймер, показывающий время до следующего слайда
		 */
		const PROGRESS_SVG = `
		<svg class="progress-svg" width="56" height="56">
			<g transform="translate(28,28)">
				<circle class="circle-go" r="26" cx="0" cy="0"></circle>
			</g>
		</svg>
		`;

		/**
		 * Обновляет состояние точек навигации слайдера
		 * @param {number} currentSlide - Номер текущего активного слайда (по умолчанию 0)
		 *
		 * Функция выполняет три действия:
		 * 1. Очищает SVG-индикаторы со всех точек
		 * 2. Обновляет классы активности и ARIA-атрибуты
		 * 3. Добавляет SVG-индикатор прогресса на активную точку
		 */
		const updateSliderDots = (currentSlide = 0) => {
			// Сначала удаляем все SVG из кнопок
			$topSliderDots.find("button").html("");

			// Обновляем активное состояние, если указан номер слайда
			if (currentSlide !== undefined) {
				const $dots = $(".top-slider .slick-dots");
				$dots.find("li").removeClass(activeClass).attr(ariaAttribute, true);

				// Устанавливаем активный класс для текущей точки
				$dots
					.find(`li:eq(${currentSlide})`)
					.addClass(activeClass)
					.attr(ariaAttribute, false);
			}

			// Добавляем SVG-индикатор на активную точку
			$topSliderDots.find(".slick-active button").html(PROGRESS_SVG);
		};
		/**
		 * Привязка обработчиков событий к слайдеру
		 */
		$topSlider
			// При инициализации слайдера
			.on("init", function () {
				// Активируем первую точку
				$(".top-slider .slick-dots li:first-of-type")
					.addClass(activeClass)
					.attr(ariaAttribute, false);
				updateSliderDots();
			})
			// Перед сменой слайда
			.on("beforeChange", function () {
				// Удаляем все индикаторы прогресса
				$topSliderDots.find("button").html("");
			})
			// После смены слайда
			.on("afterChange", function (event, slick, currentSlide) {
				// Обновляем состояние всех точек и добавляем индикатор
				updateSliderDots(currentSlide);
			});

		// Вручную запускаем событие инициализации для корректного отображения при первой загрузке
		$topSlider.trigger("init");
	});

	// trend slider
	$('.trends__slider').slick({
		speed: 800,
		slidesToShow: 4,
		slidesToScroll: 1,
		infinite: false,
		// autoplay: true,
		prevArrow: $('.t-prev'),
		nextArrow: $('.t-next'),
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	//sale slider
	$('.sale__slider').slick({
		speed: 800,
		slidesToShow: 4,
		slidesToScroll: 1,
		// autoplay: true,
		prevArrow: $('.s-prev'),
		nextArrow: $('.s-next'),
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	//gallery__slider

	$(window).on('load', () => {
		const element = $('.gallery__slider');
		const mediaQuery = window.matchMedia('(max-width: 991px)');

		const handleSwitchSlick = ((e) => {
			if (e.matches) {
				element.slick({
					slidesToShow: 2,
					slidesToScroll: 2,
					arrows: false,
					speed: 1000,
					dots: true,
					appendDots: $(".gal__dots"),
					mobileFirst: true
				});
			} else if (element.hasClass('slick-initialized')) {
				element.slick('unslick');
			}
		});

		mediaQuery.addListener(handleSwitchSlick);
		handleSwitchSlick(mediaQuery);
	});

	//decor slider
	var helpers = {
		addZeros: function (n) {
			return (n < 10) ? '0' + n : '' + n;
		}
	};

	function sliderInit() {
		var $slider = $('.decor__slider');
		$slider.each(function () {
			var $sliderParent = $(this).parent();
			$(this).slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: false,
				infinite: true,
				fade: true,
				prevArrow: $('.d-prev'),
				nextArrow: $('.d-next'),
				appendDots: $(".decor__dots"),
				responsive: [
					{
						breakpoint: 992,
						settings: {
							adaptiveHeight: true,
							dots: true,
							fade: false
						}
					},
					{
						breakpoint: 768,
						settings: {
							adaptiveHeight: true,
							dots: true,
							fade: false
						}
					}
				]
			});

			if ($(this).find('.item').length > 1) {
				$(this).siblings('.slides-numbers--d').show();
			}

			$(this).on('afterChange', function (event, slick, currentSlide) {
				$sliderParent.find('.slides-numbers--d .active').html(helpers.addZeros(currentSlide + 1));
			});

			var sliderItemsNum = $(this).find('.slick-slide').not('.slick-cloned').length;
			$sliderParent.find('.slides-numbers--d .total').html(helpers.addZeros(sliderItemsNum));

		});

		//feedback slider

		function sliderInit() {
			var $slider = $('.feedback__slider');
			$slider.each(function () {
				var $sliderParent = $(this).parent();
				$(this).slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: false,
					appendDots: $(".feedback__dots"),
					infinite: true,
					fade: true,
					prevArrow: $('.f-prev'),
					nextArrow: $('.f-next'),
					responsive: [
						{
							breakpoint: 992,
							settings: {
								adaptiveHeight: true,
								slidesToShow: 1,
								slidesToScroll: 1,
								dots: true,
								fade: false
							}
						},
						{
							breakpoint: 768,
							settings: {
								adaptiveHeight: true,
								dots: true
							}
						},
						{
							breakpoint: 576,
							settings: {
								adaptiveHeight: true,
								dots: true
							}
						}
					]
				});

				if ($(this).find('.item').length > 1) {
					$(this).siblings('.slides-numbers--f').show();
				}

				$(this).on('afterChange', function (event, slick, currentSlide) {
					$sliderParent.find('.slides-numbers--f .active').html(helpers.addZeros(currentSlide + 1));
				});

				var sliderItemsNum = $(this).find('.slick-slide').not('.slick-cloned').length;
				$sliderParent.find('.slides-numbers--f .total').html(helpers.addZeros(sliderItemsNum));
			});
		};

		sliderInit();

	};

	sliderInit();

	//set the overflow to hidden to make scrollbars disappear
	$('.card-areas__header').hover(function () {
		$(".card-areas__header").css("overflow", "hidden");
	}, function () {
		$(".card-areas__content").css("overflow", "auto");
	});

	//areas slider
	$('.areas__slider').slick({
		speed: 800,
		slidesToShow: 4,
		slidesToScroll: 1,
		dots: false,
		// autoplay: true,
		prevArrow: $('.a-prev'),
		nextArrow: $('.a-next'),
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	//projects slider

	const $mainSlider = $(".projects__slider").slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		speed: 800,
		dots: false,
		arrows: true,
		prevArrow: $('.p-prev'),
		nextArrow: $('.p-next'),
		asNavFor: ".modal-slider",
		appendDots: $(".projects__dots"),
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 992,
				settings: {
					adaptiveHeight: true,
					slidesToShow: 3,
					slidesToScroll: 1,
					dots: true
				}
			},
			{
				breakpoint: 768,
				settings: {
					adaptiveHeight: true,
					slidesToShow: 2,
					slidesToScroll: 1,
					dots: true
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: true
				}
			}
		]
	});

	const $modalSlider = $(".modal-slider").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		asNavFor: ".projects__slider",
		prevArrow: $(".modal-slider__prev"),
		nextArrow: $(".modal-slider__next"),
	});

	const modal = document.getElementById("sliderModal");
	const closeModal = document.querySelector(".close-modal");
	const mainSlider = document.querySelector(".projects__slider");

	$(mainSlider).on('click', '.slick-slide', function (e) {
		e.preventDefault();
		const slideIndex = $(this).data('slick-index');
		modal.classList.add("active");

		$('.modal-slider').slick('slickSetOption', 'speed', 0, true);
		$('.modal-slider').slick('slickGoTo', slideIndex);
		$(".modal-slider").slick("setPosition");

		setTimeout(() => {
			$('.modal-slider').slick('slickSetOption', 'speed', 300, true);
		}, 100);
	});

	closeModal.addEventListener("click", () => {
		modal.classList.remove("active");
	});

	modal.addEventListener("click", (e) => {
		if (e.target === modal) {
			modal.classList.remove("active");
		}
	});

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && modal.classList.contains("active")) {
			modal.classList.remove("active");
		}
	});

	//portfolio slider

	const $mainSlider1 = $(".portfolio__slider").slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		speed: 800,
		dots: false,
		appendDots: $(".portfolio__dots"),
		arrows: true,
		prevArrow: $('.por-prev'),
		nextArrow: $('.por-next'),
		asNavFor: ".modal-slider1",
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 992,
				settings: {
					adaptiveHeight: true,
					slidesToShow: 3,
					slidesToScroll: 1,
					dots: true
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					dots: true
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: true,
					autoplay: false
				}
			}
		]
	});

	const $modalSlider1 = $(".modal-slider1").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		asNavFor: ".portfolio__slider",
		prevArrow: $(".modal-slider1__prev"),
		nextArrow: $(".modal-slider1__next"),
	});

	const modal1 = document.getElementById("sliderModal1");
	const closeModal1 = document.querySelector(".close-modal1");
	const mainSlider1 = document.querySelector(".portfolio__slider");

	$(mainSlider1).on('click', '.slick-slide', function (e) {
		e.preventDefault();
		const slideIndex = $(this).data('slick-index');
		modal1.classList.add("active");

		$('.modal-slider1').slick('slickSetOption', 'speed', 0, true);
		$('.modal-slider1').slick('slickGoTo', slideIndex);
		$(".modal-slider1").slick("setPosition");

		setTimeout(() => {
			$('.modal-slider1').slick('slickSetOption', 'speed', 300, true);
		}, 100);
	});

	closeModal1.addEventListener("click", () => {
		modal1.classList.remove("active");
	});

	modal1.addEventListener("click", (e) => {
		if (e.target === modal1) {
			modal1.classList.remove("active");
		}
	});

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && modal1.classList.contains("active")) {
			modal1.classList.remove("active");
		}
	});

	// catalogs slider
	$('.catalogs__slider').slick({
		speed: 800,
		slidesToShow: 4,
		slidesToScroll: 1,
		// autoplay: true,
		prevArrow: $('.c-prev'),
		nextArrow: $('.c-next'),
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	// product counter
	function inputNumber(e) {

		var el = e;
		el.each(function () {
			el = $(this);

			var min = el.attr('min') || false;
			var max = el.attr('max') || false;

			var els = {};

			els.dec = el.parents(".counter").find(".minus");
			els.inc = el.parents(".counter").find(".plus");

			el.each(function () {
				init($(this));
			});

			function init(el) {

				els.dec.on('click', decrement);
				els.inc.on('click', increment);

				function decrement() {
					var value = el[0].value;
					value--;
					if (!min || value >= min) {
						el[0].value = value;
					}
				}

				function increment() {
					var value = el[0].value;
					value++;
					if (!max || value <= max) {
						el[0].value = value++;
					}
				}
			}
		})
	}
	inputNumber($('.counter__input'));

	//высота блоков в gallery
	var mh = 0;
	$(".section-gallery__item").each(function () {
		var h_block = parseInt($(this).height());
		if (h_block > mh) {
			mh = h_block;
		};
	});
	$(".section-gallery__item").height(mh);

	//play button
	document.getElementById('play_button').addEventListener('click', function () {
		document.getElementById('video').play();
		document.getElementById('play_button').style.display = 'none';
	});
	document.getElementById('video').onended = function () {
		document.getElementById('play_button').style.display = 'block';
	}

	document.getElementById('play_button1').addEventListener('click', function () {
		document.getElementById('video1').play();
		document.getElementById('play_button1').style.display = 'none';
	});
	document.getElementById('video1').onended = function () {
		document.getElementById('play_button1').style.display = 'block';
	}

	document.getElementById('play_button2').addEventListener('click', function () {
		document.getElementById('video2').play();
		document.getElementById('play_button1').style.display = 'none';
	});
	document.getElementById('video2').onended = function () {
		document.getElementById('play_button1').style.display = 'block';
	}

	//Tabs

	$('ul.section-contacts__tabs').on('click', 'li:not(.active)', function () {
		$(this)
			.addClass('active').siblings().removeClass('active')
			.closest('div.container').find('div.section-contacts__item').removeClass('active').eq($(this).index()).addClass('active');
	});

});



