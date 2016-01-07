<?php
// 共有メモリ内に変更があれば差分をjsonで送る
header("Content-Type: text/event-stream\n\n");

require_once 'shm.php';

$buf = shm_get_points();
while ( 1 ) {

  $points = shm_get_points();
  $data = array();
  for($i = 1; $i < 41; $i++) {
    for($j = 1; $j < 41; $j++) {
      if ($points[$i][$j]['time'] != 0 && $points[$i][$j]['time'] < time()) { // 時間経過による削除
        $points[$i][$j]['stat'] = false;
        deletepoint($i, $j);
      }
      if ($points[$i][$j]['stat'] != $buf[$i][$j]['stat']) {
        $data[] = array(
            $i,
            $j,
            $points[$i][$j]['stat']
        );
      }
    }
  }
  if ($data) {
    $data = json_encode($data);
    echo "data:$data" . "\n\n";
  }
  $buf = shm_get_points();

  ob_flush();
  flush();
  sleep(1);
}
