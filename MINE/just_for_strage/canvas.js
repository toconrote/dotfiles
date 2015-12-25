$(function(){
  //ブラウザ判定(ffflg:ファイアフォックスかどうか)
  ffflg = getBrowser();

  canvas = document.getElementById('c');
  ctx = canvas.getContext('2d');
  if(!ctx) return;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = 3;
  buffers = [{"pos":"","style":"","width":""}];
  alpha = 1.0;
  MAXHIST = -1;
  ind = 0;
  mx = 0;
  my = 0;
  choverflg = false;
  notLineFLg = false;

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
$("#send").click(sendImage);
$(".notLine").mousedown(function(){
  notLineFlg=true;
});

clear();

//カラーパレット生成
makePalletes();
});

function drawStart(){
  beginImage = ctx.getImageData(0,0,640,480);
  pathPos = null;
  pathPos = [{"x":mx,"y":my}];
  ctx.beginPath();
  ctx.moveTo(mx+0.5, my+0.5);
}
function mousepos(x, y, mb) {
  if(notLineFlg)return;
  mx = x - canvas.offsetLeft;
  my = y - canvas.offsetTop;
  // $("#debug").html("mx:"+mx+" my:"+my);
  if(mb == "1"){
    pathPos.push({"x":mx+0.5, "y":my+0.5});
    line();
    var w = ctx.lineWidth;
    if(mx>=0-w && mx<=640+w && my>=0-w && my<=480+w)choverflg=true;
  }
}
function line(){
  //ctx.lineTo(x,y);
  //if(alpha==1){
  ctx.putImageData(beginImage,0,0);
  ctx.beginPath();
  for(var i=0;i<pathPos.length;i++){
    if(i===0){
      ctx.moveTo(pathPos[i]["x"], pathPos[i]["y"]);
    } else {
      ctx.lineTo(pathPos[i]["x"], pathPos[i]["y"]);
    }
  }
  ctx.stroke();
  //}
}
function drawEnd(){
  //if(alpha!=1)ctx.stroke();
  if(choverflg){
    saveHist();
    ind++;
    choverflg = false;
    buttonReload();
  }
  notLineFlg=false;
}

function clear(){
  whiteRect();
  clearHist();
}
function whiteRect(){
  var buf_style = ctx.fillStyle;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0,0,640,480);
  ctx.fillStyle = buf_style;
}
function clearHist(){
  ind=0;
  buffers = null; //メモリ開放
  buffers = [];
  buttonReload();
}

function prevHist(){
  if(ind==0)return;
  ind--;
  loadHist(ind);
  buttonReload();
}
function nextHist(){
  if(ind==buffers.length)return;
  ind++;
  loadHist(ind);
  buttonReload();
}

function saveHist(){
  if(ind==MAXHIST){
    buffers.shift();
    ind = MAXHIST-1;
  }
  var buf = new Object();
  buf = {"pos":pathPos,"style":ctx.strokeStyle,"width":ctx.lineWidth};
  buffers[ind] = buf;
  if(buffers.length > ind+1){
    buffers.splice(ind+1, buffers.length-ind-1);
  }
}
function loadHist(ind){
  whiteRect();
  var buf_style = ctx.strokeStyle;
  var buf_width = ctx.lineWidth;
  for(var j=0;j<ind;j++){
    ctx.strokeStyle = buffers[j]["style"];
    ctx.lineWidth = buffers[j]["width"];
    ctx.beginPath();
    pathPos=buffers[j]["pos"];
    for(var i=0;i<pathPos.length;i++){
      if(i===0){
        ctx.moveTo(pathPos[i]["x"], pathPos[i]["y"]);
      } else {
        ctx.lineTo(pathPos[i]["x"], pathPos[i]["y"]);
      }
    }
    ctx.stroke();
  }
  ctx.strokeStyle = buf_style;
  ctx.lineWidth = buf_width;
}
function buttonReload(){
  if(ind==0){
    $("#prev").attr("disabled", "disabled");
  } else {
    $("#prev").removeAttr("disabled");
  }
  if(ind==buffers.length){
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
  tar.append('<div class="pallete" style="display:none;"><input type="color"></div>')
}
function colorGen(){ 
  var buf = Math.floor(Math.random()*16777215).toString(16);
  buf = ("000" + buf).slice(-6);
  return '#'+buf;
}
//16進数rgb形式の色文字列をrgbaに変換する
function changeAlpha(color){
  if(color[0]=='r'){
    return color.replace(/rgba?(\(\d+, \d+, \d+)(, \d\.\d+)?\)/,'rgba$1, '+alpha+')');
  }
  if(color[0]!='#')return color;
  var r = color.substr(1,2);
  var g = color.substr(3,2);
  var b = color.substr(5,2);
  r = parseInt(r,16);
  g = parseInt(g,16);
  b = parseInt(b,16);
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

      function sendImage(){
        if(!window.confirm('送信してよろしいですか？'))return;
        $("#send").attr("disabled");
        $.post('sendImage.php', {"id":"0","data":canvas.toDataURL()}, function(data, mystatus){
          if(data==='ok' && mystatus==='success'){
            location.href = 'sendOK.html';
          } else {
            alert('なんか送信に失敗したのでもう一度お願いします')
          $("#send").removeAttr("disabled");
          }
        });
      }
