$(document).ready(function () {

	//Tabs
	$('.contacts ul.section-contacts__tabs').on('click', 'li:not(.active)', function () {
		$(this)
			.addClass('active').siblings().removeClass('active')
			.closest('div.container').find('div.section-contacts__item').removeClass('active').eq($(this).index()).addClass('active');
	});

	//contacts slider
	const $mainSlider2 = $(".contacts__slider").slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		speed: 800,
		dots: false,
		appendDots: $(".portfolio__dots"),
		arrows: true,
		prevArrow: $('.cont-prev'),
		nextArrow: $('.cont-next'),
		asNavFor: ".modal-slider2",
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

	const $modalSlider2 = $(".modal-slider2").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		asNavFor: ".contacts__slider",
		prevArrow: $(".modal-slider2__prev"),
		nextArrow: $(".modal-slider2__next"),
	});

	const modal2 = document.getElementById("sliderModal2");
	const closeModal2 = document.querySelector(".close-modal2");
	const mainSlider2 = document.querySelector(".contacts__slider");

	$(mainSlider2).on('click', '.slick-slide', function (e) {
		e.preventDefault();
		const slideIndex = $(this).data('slick-index');
		modal2.classList.add("active");

		$('.modal-slider2').slick('slickSetOption', 'speed', 0, true);
		$('.modal-slider2').slick('slickGoTo', slideIndex);
		$(".modal-slider2").slick("setPosition");

		setTimeout(() => {
			$('.modal-slider2').slick('slickSetOption', 'speed', 300, true);
		}, 100);
	});

	closeModal2.addEventListener("click", () => {
		modal2.classList.remove("active");
	});

	modal2.addEventListener("click", (e) => {
		if (e.target === modal2) {
			modal2.classList.remove("active");
		}
	});

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && modal2.classList.contains("active")) {
			modal2.classList.remove("active");
		}
	});

});



