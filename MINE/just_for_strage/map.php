<!DOCTYPE html>
<html lang="ja">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>マランソマソ</title>
<script src="/jquery/jquery-1.11.3.min.js"></script>
<script src="map.js"></script>
<link href="map.css" rel="stylesheet">
</head>
<body>
<div class="left-box float">
  <div class="mapimg">
    <img src="map.png">
  </div>
  <div>
    <input type="number" id="server" value="1" min="1" max="40">
    <input type="button" value="鯖追加" onclick="addServer()">
  </div>
  <div>
    <table>
      <thead>
        <tr class="tr1">
          <td class="nocell"></td>
        </tr>
        <tr class="tr2">
          <th>鯖</th>
        </tr>
      </thead>
      <tbody id="main">
      </tbody>
    </table>
  </div>
</div>
<div class="right-box float">
  <div>
    <!-- <input type="button" value="報告順"> -->
    <!-- <input type="button" value="遠い順"> -->
    <input type="button" value="報告リセット" onclick="resetPoint()">
  </div>
  <div id="tanin">
  </div>
</div>
</body>
</html>
