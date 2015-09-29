$(document).ready(function() {
	$("#selector").disableScroll();
	$("#down_button").click(function(){
		$( ".main-header" ).toggle("slide", { direction: "up" }, 500);
	});

});
$.fn.disableScroll = function() {
    var oldScrollPos = $(window).scrollTop();

    $(window).on('scroll.scrolldisabler',function ( event ) {
       $(window).scrollTop( oldScrollPos );
       event.preventDefault();
    });
};
$.fn.enableScroll = function() {
    $(window).off('scroll.scrolldisabler');
};
