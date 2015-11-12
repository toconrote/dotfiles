<?php
if(empty($_POST["msg"])){
  die;
}

$systemid = 864; // System ID for the shared memory segment
$mode = "c"; // Access mode
$permissions = 0755; // Permissions for the shared memory segment
$size = 1024; // Size, in bytes, of the segment

$shmid = shmop_open($systemid, $mode, $permissions, $size);

$read = shmop_read($shmid, 0, shmop_size($shmid));
$read = preg_replace('/\0/','',$read);
$msg_data = json_decode($read, true);
if(empty($msg_data)){
  for($i=0;$i<10;$i++){
    $msg_data['msg'.$i] = '';
  }
}

for($i=9;$i>=1;$i--){
  $msg_data['msg'.$i] = $msg_data['msg'.($i-1)];
}
$msg_data['msg0'] = $_POST["msg"];
$clear = '';
for($i=0;$i<1024;$i++){
  $clear .= '00';
}
$clearstr = hex2bin($clear);
shmop_write($shmid, $clearstr, 0);

$write = json_encode($msg_data);
shmop_write($shmid, $write, 0);

shmop_close($shmid);