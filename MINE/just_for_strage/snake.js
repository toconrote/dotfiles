MAX_X = 32;
MAX_Y = 32;
FPS = 60;
SPEED = 15;
chaos = true;

$(function(){
  canvas = document.getElementById("c");
  ctx = canvas.getContext("2d");

  canvas.width = MAX_X*10;
  canvas.height = MAX_Y*10;

  esa = [];
  direction = 3;//下
  len = 0; //体の長さ
  x = Math.floor(MAX_X / 2);
  y = Math.floor(MAX_Y / 2);
  timer = null;
  dirLetter = ["←","↑","→","↓"];

  ctx.fillStyle = "#000000";
  ctx.fillRect(0,0,10,10);
  dot = ctx.getImageData(0,0,10,10);
  redraw();

  $("#start").click(function(){
    $(this).attr("disabled", "disabled");
    timer = setInterval(function(){
      if(chaos){
        deg = canvas.style.transform.match(/rotate\((.+)deg\)/)[1];
        deg = deg == '360' ? 1 : Number(deg)+1;
        canvas.style.transform = "rotate("+deg+"deg)"
      }
      moveHead();
    }, Math.floor(1000/SPEED));
  });
  setInterval(function(){
    redraw();
  }, Math.floor(1000/FPS));

  $("body").keydown(function(eo){
    getDirection(eo.which);
  });
});

//向きの変更
function getDirection(dir) {
  if(dir==32){
    if(!timer){
      $("#start").click();
    }
    return;
  }
  if(dir==37 || dir==38 || dir==39 || dir==40) {
    if(Math.abs(direction-(dir-37))==2)return;
    direction = dir - 37;
    $("#debug").html(dirLetter[direction]);
  }
}

//移動計算
function moveHead(){
  switch(direction) {
    case 0://←
      x--;
      break;
    case 1://↑
      y--;
      break;
    case 2://→
      x++;
      break;
    case 3://↓
      y++;
      break;
  }

  //gameover
  if(x==-1 || x==MAX_X || y==-1 || y==MAX_Y){
    clearInterval(timer);
    x = Math.floor(MAX_X / 2);
    y = Math.floor(MAX_Y / 2);
    timer = null;
    redraw();
    $("#start").removeAttr("disabled");
  }

  //体更新
  for(var i=0;i<len;i++) {

  }
}

//canvas再描画
function redraw(){
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0,0,MAX_X*10,MAX_Y*10);
  ctx.putImageData(dot, x*10, y*10);
}
