MAX_X = 32;
MAX_Y = 32;

$(function(){
  canvas = document.getElementById("c");
  ctx = canvas.getContext("2d");

  canvas.width = MAX_X*10;
  canvas.height = MAX_Y*10;

  direction = 3;//下
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
      moveHead();
      redraw();
    }, 100);
  });

  $("body").keydown(function(eo){
    getDirection(eo.which);
  });
});

function getDirection(dir) {
  if(dir==32){
    if(!timer){
      $("#start").click();
    }
    return;
  }
  direction = dir - 37;
  $("#debug").html(dirLetter[direction]);
}

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
}

function redraw(){
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0,0,MAX_X*10,MAX_Y*10);
  ctx.putImageData(dot, x*10, y*10);
}
