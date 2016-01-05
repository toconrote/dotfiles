<?php
if(!isset($_POST['server']) || !isset($_POST['no'])){
  die;
}
$server = $_POST['server'];
$no = $_POST['no'];

require_once 'shm.php';

if(!addpoint($server, $no)){
  echo 'なんか追加失敗した';
  die;
}

flush();
ob_flush();

sleep(300);

deletepoint($server, $no);
