<!DOCTYPE html>
<html lang="ja">
<head>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">
  <meta name="keywords" content="test">
  <meta name="description" content="しつもんばこ">
  <meta name="viewport" content="width=device-width">
  <link rel="stylesheet" href="qa.css" type="text/css">
  <title>みてってよ</title>
  <script src="/jquery/jquery-1.11.3.min.js"></script>
  <script>
  var databank = new Array();
$(function(){
  $("#gj").click(function(){
    p = $("#p").val();
    if(!databank[p]){//取得済みでなければ取得
      $.post("getpage.php", {"page":p}, getfunc, "json");
    } else {
      pageChange(databank[p]);
    }
  });
});
function getfunc(data, status){
  if(status=="success"){
    pageChange(data);
    databank[$("#p").val()] = data;
  }
}
function pageChange(content){
  t = $("p.bottom").empty();
  for(n in content){
    t.append("<p>"+content[n].question+"</p>");
  }
}
  </script>
</head>
<body>
  <div class="background">
    <div id="content-box" class="center">
    </div>
    <input type="text" value="1" id="p"></input>
    <input type="button" value="取得" id="gj"></input>
    <div class="center">
      <p class="bottom"></p>
    </div>

  </div>
</body>
</html>
