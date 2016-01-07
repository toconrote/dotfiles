<?php
if(!isset($_POST['server']) || !isset($_POST['no'])){
  die;
}
$server = $_POST['server'];
$no = $_POST['no'];

require_once 'shm.php';

addpoint($server, $no);

flush();
ob_flush();