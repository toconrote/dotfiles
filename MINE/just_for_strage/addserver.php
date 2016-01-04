<?php
if(!isset($_POST["val"])){
  die;
}

$systemid = 864; // System ID for the shared memory segment
$mode = "c"; // Access mode
$permissions = '0755'; // Permissions for the shared memory segment
$size = 1024; // Size, in bytes, of the segment
$shmid = shmop_open($systemid, $mode, $permissions, $size);

$read = shmop_read($shmid, 0, shmop_size($shmid));
$read = preg_replace('/\0/','',$read);
$server_data = json_decode($read, true);
if(empty($server_data)){
  $server_data = new array();
  $server_data[0] = {
    'server' => $_POST["val"],
    'a1' => false,
    'a2' => false
  };
} else {
  for($i=9;$i>=1;$i--){
    $server_data['msg'.$i] = $server_data['msg'.($i-1)];
  }
  $server_data['msg0'] = $_POST["msg"];
}

//メモリクリア
$clear = '';
for($i=0;$i<1024;$i++){
  $clear .= '00';
}
$clearstr = hex2bin($clear);
shmop_write($shmid, $clearstr, 0);

//書き込み
$write = json_encode($server_data);
shmop_write($shmid, $write, 0);

//閉じる
shmop_close($shmid);
