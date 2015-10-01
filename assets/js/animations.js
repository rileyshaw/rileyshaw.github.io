var projects = [
{projectName: "project1",linkToProject: "rileyshaw.net/project1.html"},
{projectName: "project2",linkToProject: "rileyshaw.net/project2.html"},
{projectName: "project3",linkToProject: "rileyshaw.net/project3.html"}
]
var curpage = 0;
function nextPage(){
	if(curpage+1 >= projects.length){
		curpage = 0;
	}else{
		curpage++;
	}
}
function prevPage(){
	if(curpage == 0){
		curpage = projects.length - 1;
	}else{
		curpage--;
	}
}
$(document).ready(function() {
	$(".down_button").click(function(){
		$( ".mainbody" ).toggle("slide", { direction: "up" }, 500);
	});
	$(".up_button").click(function(){
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
