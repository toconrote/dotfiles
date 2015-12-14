$(function(){
  //ブラウザ判定(ffflg:ファイアフォックスかどうか)
  ffflg = getBrowser();

  canvas = document.getElementById('c');
  ctx = canvas.getContext('2d');
  if(!ctx) return;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  buffers = [];
  MAXHIST = -1;
  ind = 0;
  mx = 0;
  my = 0;
  choverflg = false;

  //イベント関連
  $("body").mousedown(function(eo){if(eo.which=="1")drawStart()});
  $("body").mouseup(function(){
    if(choverflg){
      ind++;
      saveCtx();
      choverflg = false;
    }
  })
  $("body").mousemove(function(eo){
    var mb = 0;
    if(ffflg){
      if(eo.buttons == 1){
        mb = "1";
      }
    } else {
      mb = eo.which;
    }
    mousepos(eo.pageX, eo.pageY, mb)
  });
  $("#clear").click(function(){
    if(window.confirm("クリアしてよろしいですか？"))clear();
  });
  $("#prev").click(prevHist);
  $("#next").click(nextHist);
  $("#hist").click(clearHist);
  clear();

  //カラーパレット生成
  makePalletes();
});

function drawStart(){
  ctx.beginPath();
  ctx.moveTo(mx, my);
}
function mousepos(x, y, mb) {
  mx = x - canvas.offsetLeft;
  my = y - canvas.offsetTop;
  //  $("#debug").html("mx:"+mx+" my:"+my);
  if(mb == "1"){
    line(mx+0.5, my+0.5);
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
  buffers = null; //メモリ開放
  buffers = [];
  saveCtx();
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

function saveCtx(){
  if(ind==MAXHIST){
    buffers.shift();
    ind = MAXHIST-1;
  }
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

function makePalletes(){
  var tar = $("#palletes");
  var palletNo = 26;
  var r,g,b,rn,gn,bn;
  var color;
  for(i=0;i<palletNo;i++){
    switch(i){
      case palletNo-1:
        r = "00";
        b = "00";
        g = "00";
        break;
      case palletNo-2:
        r = "FF";
        b = "FF";
        g = "FF";
        break;
      default:
        rn = Math.floor(Math.random()*256);
        gn = Math.floor(Math.random()*256);
        bn = Math.floor(Math.random()*256);
        r = ("00"+rn.toString(16)).slice(-2);
        g = ("00"+gn.toString(16)).slice(-2);
        b = ("00"+bn.toString(16)).slice(-2);
        break;
    }
    color = 'black';
    tar.append('<div class="pallete" style="background-color:#'+r+g+b+';"></div>').children(":last").click(function(){
      ctx.fillStyle = $(this).css("background-color");
      ctx.strokeStyle = $(this).css("background-color");
      $("#palletes").children().each(function(){
        $(this).children(":first").removeClass("selected");
      })
      $(this).children(":first").addClass("selected");
    }).append('<div style="border:2px solid '+color+'"></div>');
  }
}

function getBrowser(){
  var ua = window.navigator.userAgent.toLowerCase();
  if(ua.indexOf('msie')!=-1){
    alert('IEは非対応です');
    return false;
  }
  if(ua.indexOf('chrome')!=-1){
    return false;
  }
  if(ua.indexOf('firefox')!=-1){
    return true;
  }
  alert('推奨環境はGoogle ChromeとFirefoxの最新verです。\nあと、IEだと絶対に動きません。');
  return false;
}
