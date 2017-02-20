$(function(){
	var nav = $('.fixed');   
	$(window).scroll(function () { 
		if ($(this).scrollTop() > 80) { 
			nav.addClass("ativo"); 
		} else { 
			nav.removeClass("ativo"); 
		} 
	});  
});