$(document).ready(function () {

	// sticky menu + toTop

	$(window).scroll(function () {

		if ($(this).scrollTop() >= 220) {
			$('.header__bottom').addClass('fixed');
		} else {
			$('.header__bottom').removeClass('fixed');
		}

		// if ($(this).scrollTop() >= 3000) {
		// 	$('.toTop').addClass('show');
		// } else {
		// 	$('.toTop').removeClass('show');
		// }
	});


	// popup

	$(".click-here").on('click', function () {
		$(".custom-model-main").addClass('model-open');
	});
	$(".close-btn, .bg-overlay").click(function () {
		$(".custom-model-main").removeClass('model-open');
	});


});



