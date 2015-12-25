<?php
$db = new mysqli('127.0.0.1', 'root', '', 'test');
if($db->connect_error){
  die('Connect Error (' . $db->connect_errno . ') ' . $db->connect_error);
}
?>
