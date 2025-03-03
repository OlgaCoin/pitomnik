$(document).ready(function () {

	// sticky menu + toTop
	let menuElem = $('.header__bottom'), // Элемент который будет прилепать
		menuFixed = 60, // кол-во пикселей от границы, когда меню "прилипнет" к краю экрана.
		menuStatus = false; // Некая оптимизация.


	$(window).on('scroll', function () {
		if ($(this).scrollTop() >= menuFixed && menuStatus === false) {
			menuStatus = true;
			menuElem.addClass('fixed').animate({ 'top': '0%' }, 600, 'linear');
		} else if ($(this).scrollTop() < menuFixed && menuStatus === true) {
			menuStatus = false;
			menuElem.animate({ 'top': '-100%' }, 0, 'linear', function () {
				menuElem.removeAttr('style').removeClass('fixed');
			});
		}
	});

	// $(window).scroll(function () {

	// 	if ($(this).scrollTop() >= 60) {
	// 		$('.header__bottom').addClass('fixed');
	// 	} else {
	// 		$('.header__bottom').removeClass('fixed');
	// 	}

	// 	if ($(this).scrollTop() >= 3000) {
	// 		$('.toTop').addClass('show');
	// 	} else {
	// 		$('.toTop').removeClass('show');
	// 	}
	// });


	// popup

	$(".click-here").on('click', function () {
		$(".custom-model-main").addClass('model-open');
	});
	$(".close-btn, .bg-overlay").click(function () {
		$(".custom-model-main").removeClass('model-open');
	});

	// slick

	$('.top-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		// dots: true,
		fade: true,
		// autoplay: true,
		// autoplaySpeed: 6000,
		// appendDots: $(".top-slider .check"),
		prevArrow: $(".top-slider__prev"),
		nextArrow: $(".top-slider__next"),
		speed: 1500,
		pauseOnFocus: false,
		pauseOnHover: false,
	});

	// $('.top-slider__dots .top-slider__dots-item').click(function () {
	// 	var $this = $(this);
	// 	$('.top-slider--for').slick('slickGoTo', $this.data('index'))
	// });


	$('.trends__slider').slick({
		speed: 800,
		slidesToShow: 4,
		slidesToScroll: 1,
		// autoplay: true,
		prevArrow: $('.t-prev'),
		nextArrow: $('.t-next'),
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	$('.sale__slider').slick({
		speed: 800,
		slidesToShow: 4,
		slidesToScroll: 1,
		// autoplay: true,
		prevArrow: $('.s-prev'),
		nextArrow: $('.s-next'),
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 480,
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


	var mh = 0;
	$(".section-gallery__item").each(function () {
		var h_block = parseInt($(this).height());
		if (h_block > mh) {
			mh = h_block;
		};
	});
	$(".section-gallery__item").height(mh);


});



