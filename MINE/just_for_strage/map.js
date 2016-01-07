var EventSource = window.EventSource || window.MozEventSource;
var PNO = 36;//地点の数
var main;
var gottenNo = [];
var pointdata = [{
  "name":"聖塔",
    "points":[1,2,3,4,5,6]
},
{
  "name":"イ上",
  "points":[1,2,3,4]
},
{
  "name":"門",
  "points":[5,6,7,8,9,10,11]
},
{
  "name":"イ下",
  "points":[1,2,3,4,5,6,7,8,9]
},
{
  "name":"ア村",
  "points":[1,2,3,4,6,7]
},
{
  "name":"エ東",
  "points":[1,2,3,4]
}];
$(function(){
  initial();

  //th作成
  var len = pointdata.length;
  var count = 1;
  var tar1 = $("tr.tr1");
  var tar2 = $("tr.tr2");
  for(var i=0;i<len;i++){
    span = pointdata[i]["points"].length;
    tar1.append('<th colspan="'+span+'">'+pointdata[i]["name"]+'</th>');
    for(var j=0;j<span;j++){
      tar2.append('<th class="th'+count+'">'+pointdata[i]["points"][j]+'</th>');
      count++;
    }
  }

  $("#serverno").change(function(){
    var sno = $(this).val();
    if(sno<1)this.value='1';
    if(sno>40)this.value='40';
  });

  main = $("#main");
});

//ssevent初期設定
function initial() {
  if (!EventSource) {
    alert("EventSourceが利用できません。");
    return;
  }
  var source = new EventSource('ssmainloop.php');
  source.onmessage = function(event) {
    var sabun = JSON.parse(event.data);
    var len = sabun.length;
    for (var i=0;i<len;i++) {
      if(gottenNo.indexOf(sabun[i][1]) != -1)continue;
      if(sabun[i][2]){
        //取得報告のとき
        $("#tanin").append('<div class="'+sabun[i][0]+'-'+sabun[i][1]+'"><span>'+sabun[i][0]+'鯖</span><span>'+sabun[i][1]+'</span><input type="button" onclick="getPoint(this);" value="取得"><input type="button" onclick="vanish(this);" value="消失">');
      } else {
        //消失報告のとき
        vanishBy(sabun[i][0], sabun[i][1]);
      }
    }
    console.log(sabun);
  };
}
//サーバーの追加
function addServer(){
  var sno = $("#server").val();
  if(serverCheck(sno)){
    alert("その鯖はもう追加されてるようです");
    return;
  }
  //行と中身を追加
  main.append('<tr id="'+sno+'"></tr>');
  var tr = main.children(":last").append("<th>"+sno+"</th>");
  for(var i=1;i<PNO+1;i++){
    tr.append('<td><input type="checkbox" class="'+i+'"></td>');
  }
  //取得済みの地点をdisabled
  var len = gottenNo.length;
  for(var i=0;i<len;i++){
    $(tr.children()[gottenNo[i]]).find("input").attr("disabled", "disabled").parent().addClass("gotten");
  }
  //チェック時の処理を追加
  tr.children().each(function(){
    $(this).find("input").change(function(){
      var getNo = $(this).attr("class");
      var col = main.find("."+getNo);
      $("thead").find(".th"+getNo).toggleClass("gotten");
      col.each(function(){
        $(this).parent().toggleClass("gotten");
      });
      if($(this).prop("checked")){ //チェックを入れたとき
        col.attr("disabled", "disabled");
        $(this).removeAttr("disabled");
        //サーバーに取得報告送信
        addPoint(sno, getNo);
        gottenNo.push(Number(getNo));
      } else { //チェックを外したとき(取消)
        col.removeAttr("disabled");
        //サーバーに消失報告送信
        deletePoint(sno, getNo);
        gottenNo.splice(gottenNo.indexOf(Number(getNo)),1);
      }
    });
  });
  if(sno!=40)$("#server").val((Number(sno)+1).toString());
}
//サーバー重複チェック
function serverCheck(no){
  var dupflg = false;
  main.children().each(function(){
    if($(this).attr("id") == no){
      dupflg = true;
    }
  });
  return dupflg;
}

function addPoint(server, no){
  $.post("addpoint.php", {"server":server,"no":no}, function(data, status){
    if(data){alert(data)}
  });
}
function deletePoint(server, no){
  $.post("deletepoint.php", {"server":server,"no":no}, function(data, status){
    if(data){alert(data)}
  });
}

function getPoint(ele){
  var buf = $(ele).parent().attr("class").split('-');
  var no = buf[1];
  var col = main.find("."+no);
  $("thead").find(".th"+no).addClass("gotten");
  col.each(function(){
    $(this).parent().addClass("gotten");
  });
  col.attr("disabled", "disabled");
  deleteReport($(ele).parent());
  return;
}
//消失ボタン
function vanish(ele) {
  var buf = $(ele).parent().attr("class").split('-');
  var server = buf[0];
  var no = buf[1];
  deletePoint(server, no);
  deleteReport($(ele).parent());
  return;
}
//消失報告
function vanishBy(server, no){
  var ele = $("#tanin").find("div."+server+"-"+no).children(":last");
  if(ele){
    ele.parent().css("color", "red");
    setTimeout(function(){
      deleteReport(ele.parent());
    }, 7000);
  }
  return;
}
function deleteReport(ele){
  ele.remove();
  return;
}
