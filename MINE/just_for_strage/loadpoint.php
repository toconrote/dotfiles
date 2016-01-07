<?php
require_once 'shm.php';

$points = loadpoint();

$points_json = json_encode($points);
echo $points_json;
