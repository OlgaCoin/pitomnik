$(document).ready(function () {

	// product image-list
	const activeImage = document.querySelector(".product__image img.current");
	const productImages = document.querySelectorAll(".product__image-list img");

	function changeImage(e) {
		activeImage.src = e.target.src;
	}

	productImages.forEach(image => image.addEventListener("click", changeImage));

	$('.product__image-item').click(function () {
		$('.product__image-item').not(this).removeClass('active')
		$(this).toggleClass('active');
	});

	// product slider
	$(window).on('load', () => {
		const element = $('.product__slider');
		const mediaQuery = window.matchMedia('(max-width: 767px)');

		const handleSwitchSlick = ((e) => {
			if (e.matches) {
				element.slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					speed: 800,
					dots: true,
					appendDots: $(".product__dots"),
					arrows: false,
					mobileFirst: true
				});
			} else if (element.hasClass('slick-initialized')) {
				element.slick('unslick');
			}
		});

		mediaQuery.addListener(handleSwitchSlick);
		handleSwitchSlick(mediaQuery);
	});

	// popup
	$(".click-here--table").on('click', function () {
		$(".modal-table").addClass('model-table--open');
	});
	$(".modal-table .close-btn, .modal-table .bg-overlay").click(function () {
		$(".modal-table").removeClass('model-table--open');
	});

	// product counter
	function inputNumber(e) {

		var el = e;
		el.each(function () {
			el = $(this);

			var min = el.attr('min') || false;
			var max = el.attr('max') || false;

			var els = {};

			els.dec = el.parents(".product-counter").find(".minus");
			els.inc = el.parents(".product-counter").find(".plus");

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
	inputNumber($('.product-counter__input'));

	//add-to-cart button
	$('.btn--addtocart').click(function () {
		$(this).addClass("done");
		$(".btn--added").addClass("active");
	});

	//Tabs
	$('ul.product-descr__tabs').on('click', 'li:not(.active)', function () {
		$(this)
			.addClass('active').siblings().removeClass('active')
			.closest('div.container').find('div.product-descr__item').removeClass('active').eq($(this).index()).addClass('active');
	});
});