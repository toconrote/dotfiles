$(function(){
  canvas = document.getElementById('c');
  ctx = canvas.getContext('2d');
  pageX = 0;
  pageY = 0;
  $("#c").mousedown(function(eo){drawStart(eo.pageX, eo.pageY)});
  $("body").mouseup(drawEnd);
  $("#clear").click(clear);
});

function drawStart(x, y){
  pageX = x;
  pageY = y;
  timer = setInterval(dot(), 66);
}
function dot(){
  mousex = pageX - c.offsetLeft;
  mousey = pageY - c.offsetTop;
  ctx.rect(mousex,mousey,1,1);
  ctx.fill();
}

function drawEnd(){
  clearInterval(timer);
}

function clear(){
  ctx.clearRect(0,0,640,480);
}
