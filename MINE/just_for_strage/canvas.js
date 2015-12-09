$(function(){
  canvas = document.getElementById('c');
  ctx = canvas.getContext('2d');
  ctx.lineCap = "round";
  mx = 0;
  my = 0;
  $("body").mousedown(function(eo){if(eo.which=="1")drawStart()});
  $("body").mousemove(function(eo){
    mousepos(eo.pageX, eo.pageY, eo.which)
  });
  $("#clear").click(clear);
});

function drawStart(){
  ctx.beginPath();
  ctx.moveTo(mx, my);
}
function draw() {
  line(mx, my);
}
function mousepos(x, y, mb) {
  mx = x - canvas.offsetLeft;
  my = y - canvas.offsetTop;
  $("#debug").html("mx:"+mx+" my:"+my);
  if(mb == "1")line(mx, my);
}
function line(x, y){
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

function clear(){
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0,0,640,480);
  ctx.fillStyle = "black"
}
