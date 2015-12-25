<?php
include_once 'connectdb.php';
if($result = $db->query('select * from gallery order by id asc;')){
  $data = array();
  while($row = $result->fetch_assoc()){
    $data[] = $row;
  };
  $result->free();
  if($data){
    $data_json = json_encode($data);
  }
}
$db->close();
?>
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta content="width=device-width, maximum-scale=1.0, minimum-scale=0.5,user-scalable=yes,initial-scale=1.0" name="viewport">
<link href="gallery.css" rel="stylesheet" type="text/css">
<script>data = <?php echo $data_json ?>;</script>
<script src="/jquery/jquery-1.11.3.min.js"></script>
<script src="gallery.js"></script>
<title>gallery</title>
</head>
<body style="background-color:aliceblue">
<div class="centering">
  <div id="gallery">
  </div>
</div>
</body>
</html>
