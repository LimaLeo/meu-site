$(function(){
	var nav = $('.fixed');   
	$(window).scroll(function () { 
		if ($(this).scrollTop() >= 80) { 
			nav.fadeIn("slow");
		} else{ 
			nav.stop().fadeOut("slow");
		} 
	});  

});