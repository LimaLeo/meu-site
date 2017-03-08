$(function(){

  $(".hamburger-icon").on("click", function(event){
    event.preventDefault();
    $(this).toggleClass('active');
    $("header nav").toggleClass('active');
  });

	var nav = $('header');   
	$(window).scroll(function () { 
		if ($(this).scrollTop() >= 80) { 
			nav.addClass("fixed");
		} else{ 
			nav.removeClass("fixed");
		} 
	});  
  
  $(".element").typed({
    strings: ["Web", "Front-End."],
    typeSpeed: 200
  });
});

var sections = $('section')
  , nav = $('nav')
  , nav_height = nav.outerHeight();

$(window).on('scroll', function () {
  var cur_pos = $(this).scrollTop();
  
  sections.each(function() {
    var top = $(this).offset().top - nav_height,
        bottom = top + $(this).outerHeight();
    
    if (cur_pos >= top && cur_pos <= bottom) {
      nav.find('a').removeClass('active');
      sections.removeClass('active');
      
      $(this).addClass('active');
      nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
    }
  });
});

nav.find('a').on('click', function () {
  var $el = $(this)
    , id = $el.attr('href');
  
  $('html, body').animate({
    scrollTop: $(id).offset().top - nav_height
  }, 500);
  
  return false;
});