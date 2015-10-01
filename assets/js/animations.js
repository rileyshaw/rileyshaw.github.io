var projects = [
{projectName: "project1",linkToProject: "rileyshaw.net/project1.html"},
{projectName: "project2",linkToProject: "rileyshaw.net/project2.html"},
{projectName: "project3",linkToProject: "rileyshaw.net/project3.html"}
]
var canvas, context;
var curpage = 0;
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

  var blue = '#2D5BE5';
  var red = '#F2555E';
  var yellow = '#FFD15E';
  var green = '#1BB02E';


var balls = [];
for(var i = 0; i < 100; i++ ){
	balls.push(new Ball(Math.random()*window.innerWidth,Math.random()*window.innerHeight,2*(Math.random()-.5),0*(Math.random()-.5),red));
	balls.push(new Ball(Math.random()*window.innerWidth,Math.random()*window.innerHeight,2*(Math.random()-.5),0*(Math.random()-.5),blue));
	balls.push(new Ball(Math.random()*window.innerWidth,Math.random()*window.innerHeight,2*(Math.random()-.5),0*(Math.random()-.5),green));
	balls.push(new Ball(Math.random()*window.innerWidth,Math.random()*window.innerHeight,2*(Math.random()-.5),0*(Math.random()-.5),yellow));
}

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
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	context = canvas.getContext("2d");
	
	var time = new Date().getTime();
	animate(time);


	$(".down_button").click(function(){
		$( 'html, body').animate({scrollTop: $(".main-projects").offset().top},400);
	});
	$(".up_button").click(function(){
		$( 'html, body').animate({scrollTop: $(".main-header").offset().top},400);
	});

});

function Ball(x, y, vx, vy, color) {
  this.radius = Math.random()*14+5;
  this.x = x;
  this.y = y;
 // this.vx = vx;
 // this.vy = vy;
  if(Math.random() > .5){
  	this.vx = this.radius*.04;
  }else{
  	this.vx = this.radius*(-0.04);
  }
  
  this.vy = vy;
  this.color = color;
  this.origX = x;
  this.origY = y;
}

window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || 
      window.webkitRequestAnimationFrame || 
      window.mozRequestAnimationFrame || 
      window.msRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000/60);
      };
 })();
function nextMove(deltaTime){
	var speed = 0.005 * deltaTime;
	for(var i = 0; i < balls.length; i++){
		balls[i].y += balls[i].vy;
		balls[i].x += balls[i].vx;
		if(balls[i].y > (canvas.height+200 - balls[i].radius)){
			balls[i].y = canvas.height+200 - balls[i].radius - 2;
			balls[i].vy = -balls[i].vy;
		}
	    if(balls[i].y < (balls[i].radius)-200){
	    	balls[i].y = balls[i].radius-200 + 2;
	    	balls[i].vy = -balls[i].vy;
	    }
	    if(balls[i].x > (canvas.width+200 - balls[i].radius)) {
	    	balls[i].x = canvas.width+200 - balls[i].radius - 2;
	    	balls[i].vx = -balls[i].vx;
	    }
	    if(balls[i].x < (balls[i].radius)-200) {
	    	balls[i].x = balls[i].radius-200 + 2;
	    	balls[i].vx = -balls[i].vx;
	    }
	     	
			
	}

}
function animate(lastUpdateTime){
	var time = new Date().getTime();
	var deltaTime = time - lastUpdateTime;
	nextMove(deltaTime);
	lastUpdateTime = time;
	context.clearRect(0,0,canvas.width,canvas.height);
	for(var i = 0; i < balls.length; i++){

		context.beginPath();
		context.globalAlpha = 0.6;
		context.arc(balls[i].x,balls[i].y,balls[i].radius,0,2*Math.PI,true);
		context.fillStyle = balls[i].color;
		context.closePath();
		context.fill();
	}
	requestAnimFrame(function() {
    animate(lastUpdateTime);
  	});

}






