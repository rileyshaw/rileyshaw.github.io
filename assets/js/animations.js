var projects = [
{projectName: "project1",linkToProject: "rileyshaw.net/project1.html"},
{projectName: "project2",linkToProject: "rileyshaw.net/project2.html"},
{projectName: "project3",linkToProject: "rileyshaw.net/project3.html"}
]
var canvas, context;
var curpage = 0;
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
	jQuery('body').css('overflow','hidden'); 
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
}
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
	disableScroll();
	canvas = document.getElementById("canv");

	context = canvas.getContext("2d");
	spawnBubbles();
	$(".down_button").click(function(){
		$( 'html, body').animate({scrollTop: $(".main-projects").offset().top},400);
	});
	$(".up_button").click(function(){
		$( 'html, body').animate({scrollTop: $(".main-header").offset().top},400);
	});

});
function spawnBubbles(){
	context.fillStyle = 'blue';
	context.fillRect(100, 200, 2000, 1000);
}