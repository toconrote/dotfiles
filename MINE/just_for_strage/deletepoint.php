<?php
if(!isset($_POST['server']) || !isset($_POST['no'])){
  die;
}
$server = $_POST['server'];
$no = $_POST['no'];

require_once 'shm.php';

deletepoint($server, $no);
