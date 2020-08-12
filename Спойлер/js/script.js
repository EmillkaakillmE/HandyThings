/*Основа*/
/*$(document).ready(function() {
	$('.block__title').click(function(event) {
		$(this).toggleClass('active').next().slideToggle(300);
	});
});*/

/*js для того, чтобы открыт был лишь один спойлер*/
$(document).ready(function() {
	$('.block__title').click(function(event) {
		if ($('.block').hasClass('one')) {
			$('.block__title').not($(this)).removeClass('active');
			$('.block__text').not($(this).next()).slideUp(300);
		}
		$(this).toggleClass('active').next().slideToggle(300);
	});
});
