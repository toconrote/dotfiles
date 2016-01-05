<?php
require_once 'shm.php';

$points = loadpoint();
if(empty($points)){
  $points = new array{40};
  shm_put_var($id, $points, $pointskey);
}

$points_json = json_encode($points);
echo $points_json;
