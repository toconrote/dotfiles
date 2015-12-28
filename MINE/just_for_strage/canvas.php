<?php
/*
include_once 'connectdb.php';
if($result = $db->query('select islock from odai where id = 1;')){
$row = $result->fetch_assoc();
if($row['islock'] == 1){
die('他の誰かがお絵かき中です');
}
$db->query('update odai set islock = 1 where id = 1');
}
*/
?>
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta content="width=device-width, maximum-scale=1.0, minimum-scale=0.5,user-scalable=yes,initial-scale=1.0" name="viewport">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Cache-Control" content="no-cache">
<meta http-equiv="Expires" content="0">
<link href="canvas.css" rel="stylesheet" type="text/css">
<script src="/jquery/jquery-1.11.3.min.js"></script>
<script src="canvas.js"></script>

<title>canvas</title>
</head>

<body style="background-color:aliceblue">
<div class="content_center">
  <div class="clearfix">
    <p style="font:30px bold">お題：○○○</p>
    <div style="float:left;padding-left:70px;"> 
      <canvas id="c" width="640" height="480">
      </canvas>
    </div>
    <div id="palletes" class="float-box"></div>
    <div class="float-box" style="text-align:left;margin-top:10px;font-weight:bold;">
      <div>
        線の太さ
        <input id="linewidth" type="number" value="3" min="1" max="334" style="width:50px" class="notLine"></input>
      </div>
      <div style="margin-left:10px">
        透明度
        <input id="alpha" type="number" value="1" max="1" min="0.1" step="0.1" style="width:50px" class="notLine"></input>
      </div>
    </div>
  </div>

  <div id="debug" class="debug"></div>
  <input id="clear" type="button" value="clear" class="notLine">
  <input id="prev" type="button" value="元に戻す(Ctrl+Z)" class="notLine">
  <input id="next" type="button" value="やり直し(Ctrl+R)" class="notLine">
  <input id="hist" type="button" value="履歴消去" class="notLine debug">
  <input id="send" type="button" value="完成(送信)" class="notLine debug">
</div>
</body>
</html>
