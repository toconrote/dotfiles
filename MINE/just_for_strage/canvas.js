$(function(){
  canvas = document.getElementById('c');
  ctx = canvas.getContext('2d');
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  buffers = [];
  ind = 0;
  mx = 0;
  my = 0;
  choverflg = false;
  $("body").mousedown(function(eo){if(eo.which=="1")drawStart()});
  $("body").mouseup(function(){
    if(choverflg){
      ind++;
      saveCtx(ind);
      choverflg = false;
    }
  })
  $("body").mousemove(function(eo){
    mousepos(eo.pageX, eo.pageY, eo.which)
  });
  $("#clear").click(function(){
    if(window.confirm("クリアしてよろしいですか？"))clear();
  });
  $("#prev").click(prevHist);
  $("#next").click(nextHist);
  $("#hist").click(clearHist);
  clear();
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
  if(mb == "1"){
    line(mx, my);
    if(mx>=0 && mx<=640 && my>=0 && my<=480)choverflg=true;
  }
}
function line(x, y){
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

function clear(){
  whiteRect();
  clearHist();
}
function whiteRect(){
  fillStyleBuf = ctx.fillStyle;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0,0,640,480);
  ctx.fillStyle = fillStyleBuf;
}
function clearHist(){
  ind=0;
  buffers = [];
  saveCtx(0);
}

function prevHist(){
  if(ind==0)return;
  ind--;
  loadCtx(ind);
}
function nextHist(){
  if(ind==buffers.length-1)return;
  ind++;
  loadCtx(ind);
}

function saveCtx(ind){
  buffers[ind] = ctx.getImageData(0, 0, 640, 480);
  if(buffers.length > ind+1){
    buffers.splice(ind+1, buffers.length-ind-1);
  }
  buttonReload();
}
function loadCtx(ind){
  whiteRect();
  ctx.putImageData(buffers[ind],0, 0);
  buttonReload();
}
function buttonReload(){
  if(ind==0){
    $("#prev").attr("disabled", "disabled");
  } else {
    $("#prev").removeAttr("disabled");
  }
  if(ind==buffers.length-1){
    $("#next").attr("disabled", "disabled");
  } else {
    $("#next").removeAttr("disabled");
  }
}
