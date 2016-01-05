<?php //共有メモリ内に変更があればメモリデータ全てを送るssevent用phpファイル
header("Content-Type: text/event-stream\n\n");

require_once 'shm.php';

$buf = new array(40);
$points = new array(40)
while (1) {

  $points = shm_get_var($id, $pointskey);
  if ($points != $buf) {
    $data = [];
    for($i=0;$i<40;$i++){
      for($j=0;$j<40;$j++){
        if($points[$i][$j] != buf[$i][$j]){
          $data[] = [$i, $j, $points[$i][$j]];
        }
      }
    }
    $data = json_encode($data);
    echo "data:$data" . "\n\n";
    $buf = $points;
  }

  ob_flush();
  flush();
  sleep(1);
}
