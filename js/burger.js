$(document).ready(function() {
	$('.c-burger').click(function() {
			$('.c-burger').toggleClass('c-open-burger');
			$('.c-header__navigation').toggleClass('c-open-burger');
	});
});
$(function() {
  // при нажатии на кнопку scroll
  $('.c-scroll__btn').click(function() {
    // переместиться в верхнюю часть страницы
    $("html, body").animate({
      scrollTop:0
    },1000);
  })
})
