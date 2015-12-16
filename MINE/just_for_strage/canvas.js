$(function(){
  //ブラウザ判定(ffflg:ファイアフォックスかどうか)
  ffflg = getBrowser();

  canvas = document.getElementById('c');
  ctx = canvas.getContext('2d');
  if(!ctx) return;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = 3;
  alpha = 1.0;
  buffers = [];
  MAXHIST = -1;
  ind = 0;
  mx = 0;
  my = 0;
  choverflg = false;

  //イベント関連
  $("body").mousedown(function(eo){if(eo.which=="1")drawStart()});
  $("body").mouseup(function(){drawEnd();})
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
$("#linewidth").change(function(){
  ctx.lineWidth = this.value;
})
$("#alpha").change(function(){
  alpha = (this.value / 0.1)*0.1;
  ctx.fillStyle = ctx.strokeStyle = changeAlpha(ctx.strokeStyle);
})
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
  //$("#debug").html("mx:"+mx+" my:"+my);
  if(mb == "1"){
    line(mx+0.5, my+0.5);
    if(mx>=0 && mx<=640 && my>=0 && my<=480)choverflg=true;
  }
}
function line(x, y){
  ctx.lineTo(x,y);
  if(alpha==1){
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }
}
function drawEnd(){
  if(alpha!=1)ctx.stroke();
  if(choverflg){
    ind++;
    saveCtx();
    choverflg = false;
  }
}

function clear(){
  whiteRect();
  clearHist();
}
function whiteRect(){
  var fillStyleBuf = ctx.fillStyle;
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
  var color;
  var selectcolor;
  for(i=0;i<palletNo;i++){
    switch(i){
      case palletNo-1:
        color = "#000000";
        break;
      case palletNo-2:
        color = "#FFFFFF";
        break;
      default:
        color = colorGen();
        break;
    }
    selectcolor = 'black';
    tar.append('<div class="pallete" style="background-color:'+color+';"></div>').children(":last").click(function(){
      var alphacolor = changeAlpha($(this).css("background-color"));
      ctx.fillStyle = ctx.strokeStyle = alphacolor;
      $("#palletes").children().each(function(){
        $(this).children(":first").removeClass("selected");
      })
      $(this).children(":first").addClass("selected");
    }).append('<div style="border:2px solid '+selectcolor+'"></div>');
  }
  tar.append('<div class="pallete"><input type="color"></div>')
}
function colorGen(){ 
  var buf = Math.floor(Math.random()*16777215).toString(16);
  buf = ("000" + buf).slice(-6);
  return '#'+buf;
}
//16進数rgb形式の色文字列をrgbaに変換する
function changeAlpha(color){
  if(color[0]=='r'){
    return color.replace(/\d\.\d+\)/,alpha+')');
  }
  var r = color.substr(1,2);
  var g = color.substr(3,2);
  var b = color.substr(5,2);
  r = parseInt(r,16);
  g = parseInt(r,16);
  b = parseInt(r,16);
  return 'rgba('+r+','+g+','+b+','+alpha.toString()+')'; 
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
