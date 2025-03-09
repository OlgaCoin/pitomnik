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
		$(".modal-main").addClass('model-open');
	});
	$(".close-btn, .bg-overlay").click(function () {
		$(".modal-main").removeClass('model-open');
	});


	// slick

	var time = 5;
	var reset,
		$slick,
		isPause,
		tick,
		percentTime;

	var $cirleProcess = "<div class=\"progress-round__wrap\">\n" +
		"        <svg class=\"progress-round\">\n" +
		"            <circle r=\"26\" cx=\"28\" cy=\"28\"/>\n" +
		"        </svg>\n" +
		"    </div>";

	// $('.top-slider').slick({
	$slick = $('.top-slider')
	$slick.slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: true,
		// fade: true,
		infinite: true,
		speed: 300,
		pauseOnDotsHover: true,
		// autoplay: true,
		// autoplaySpeed: 6000,
		appendDots: $(".top-slider__dots"),
		prevArrow: $(".top-slider__prev"),
		nextArrow: $(".top-slider__next"),
		// speed: 1500,
		// pauseOnFocus: false,
		// pauseOnHover: false,

	});

	$barRound = $('.progress-round');

	$slick.on({
		mouseenter: function () {
			isPause = true;
		},
		mouseleave: function () {
			isPause = false;
		}
	});

	// On before slide change
	$slick.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		console.log(nextSlide);
	});

	function startProgressbar() {

		resetProgressbar();
		percentTime = 0;
		isPause = false;
		tick = setInterval(interval, 10);
		// console.log('start process');
	}
	var $rbar = $('.progress-round circle');
	var rlen = 2 * Math.PI * $rbar.attr('r');
	reset = 1;

	function interval() {
		var $rbar = $('.progress-round circle');

		$('.slick-dots li').each(function () {

			if ($(this).hasClass('slick-active')) {

				// on reset
				if (reset) {
					// $(this).append($cirleProcess);
					$($cirleProcess).hide().appendTo(this).fadeIn(1000);
					// console.log('append process');
					reset = 0;
				}
			}
		});

		percentTime += 1 / (time + 0.1);

		$rbar.css({
			'stroke-dasharray': rlen,
			'stroke-dashoffset': rlen * (1 - percentTime / 100)
		});

		if (percentTime >= 90) {
			$('.progress-round__wrap').fadeOut(1000, function () {
				$(this).remove();
			});
		}

		if (percentTime >= 100) {
			$slick.slick('slickNext');
			startProgressbar();
			reset = 1;

			// console.log('reset');
		}
	}

	function resetProgressbar() {
		clearTimeout(tick);
	}

	startProgressbar();

	$('.slick-dots li').on('click', function () {
		$('.slick-dots li:not(.slick-active)').find('.progress-round__wrap').remove();
		$($cirleProcess).hide().appendTo(this).fadeIn(1000);
		startProgressbar();
		reset = 0;
	});

	// $('.top-slider__dots .top-slider__dots-item').click(function () {
	// 	var $this = $(this);
	// 	$('.top-slider--for').slick('slickGoTo', $this.data('index'))
	// });


	// trend slider
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
				responsive: [
					{
						breakpoint: 767,
						settings: {
							adaptiveHeight: true
						}
					}
				]
			});

			if ($(this).find('.item').length > 1) {
				$(this).siblings('.slides-numbers').show();
			}

			$(this).on('afterChange', function (event, slick, currentSlide) {
				$sliderParent.find('.slides-numbers .active').html(helpers.addZeros(currentSlide + 1));
			});

			var sliderItemsNum = $(this).find('.slick-slide').not('.slick-cloned').length;
			$sliderParent.find('.slides-numbers .total').html(helpers.addZeros(sliderItemsNum));

		});

		//   $('.slick-next').on('click', function () {
		//     console.log('test');
		//     $('.slider-holder').slick('slickGoTo', 5);
		// });
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
		// fade: true,
		// autoplay: true,
		prevArrow: $('.a-prev'),
		nextArrow: $('.a-next'),
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
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1
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

	// $(mainSlider).on('click', '.slick-slide', function (e) {
	// 	e.preventDefault();
	// 	const slideIndex = $(this).data('slick-index');
	// 	modal.classList.add("active");
	// 	$('.modal-slider').slick('slickGoTo', slideIndex);
	// 	$(".modal-slider").slick("setPosition");
	// });

	// closeModal.addEventListener("click", () => {
	// 	modal.classList.remove("active");
	// });

	// modal.addEventListener("click", (e) => {
	// 	if (e.target === modal) {
	// 		modal.classList.remove("active");
	// 	}
	// });

	// document.addEventListener("keydown", (e) => {
	// 	if (e.key === "Escape" && modal.classList.contains("active")) {
	// 		modal.classList.remove("active");
	// 	}
	// });

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




});



