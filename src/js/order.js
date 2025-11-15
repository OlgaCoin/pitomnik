$(document).ready(function () {

	// order counter
	function inputNumber(e) {

		var el = e;
		el.each(function () {
			el = $(this);

			var min = el.attr('min') || false;
			var max = el.attr('max') || false;

			var els = {};

			els.dec = el.parents(".order-list__counter .counter").find(".minus");
			els.inc = el.parents(".order-list__counter .counter").find(".plus");

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
	inputNumber($('.order-list__counter .counter__input'));

	//check button
	$('.btn--check').click(function () {
		$(this).addClass("done");
		$(".btn--checked").addClass("active");
	});

	//check popup
	$(".click-here--check").on('click', function () {
		$(".modal-check").addClass('modal-check--open');
	});
	$(".modal-check .close-btn, .modal-check .bg-overlay").click(function () {
		$(".modal-check").removeClass('modal-check--open');
	});

});