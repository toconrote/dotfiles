<?php
require_once 'shm.php';

$points = loadpoint();
$data = array();
for($i=1;$i<41;$i++){
  for($j=1;$j<41;$j++){
    if($points[$i][$j]['stat']){
      $data[] = array($i, $j);
    }
  }
}

$data_json = json_encode($data);
echo $data_json;
