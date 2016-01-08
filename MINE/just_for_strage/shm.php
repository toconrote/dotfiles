<?php
$pid = connect(1386, 100000);
$lid = connect(9948, 10);
$autodeltime = 300;

function addpoint($server, $no){
  changepoint($server, $no, true);
}

function deletepoint($server, $no){
  changepoint($server, $no, false);
}

function changepoint($server, $no, $stat){
  global $autodeltime;
  waitlock();

  $points = shm_get_points();
  $points[$server][$no]['stat'] = $stat;
  $points[$server][$no]['time'] = $stat ? time() + $autodeltime : 0;
  shm_put_points($points);

  unlock();
  return;
}

function loadpoint(){
  return shm_get_points();
}

function resetpoint(){
  shm_put_points(makepoints());
  return;
}

function waitlock(){
  while(shm_get_lock()){
    usleep(10000);
  }
  shm_put_lock(true);
  return;
}

function unlock(){
  shm_put_lock(false);
  return;
}

function connect($shm_key, $size){
  return shmop_open($shm_key, "c", 0644, $size);
}
function shm_put_lock($var){
  global $lid;
  $data = $var ? '1' : '0';
  shmop_write($lid, $data, 0);
  return;
}
function shm_put_points($var){
  global $pid;
  //内容の削除
  $len = shmop_size($pid);
  $clear = '';
  for($i=0;$i<$len;$i++){
    $clear .= '00';
  }
  $clearstr = hex2bin($clear);
  shmop_write($pid, $clearstr, 0);
  //書き込み
  shmop_write($pid, json_encode($var), 0);
  return;
}
function shm_get_lock(){
  global $lid;
  $flg = shmop_read($lid, 0, 1);
  return $flg == 1 ? true : false;
}
function shm_get_points(){
  global $pid;
  $data = shmop_read($pid, 0, 100000);
  $points = json_decode(preg_replace('/\0/','',$data), true);
  if(empty($points)){
    $points = makepoints();
  }
  return $points;
}

//$points[server][no]['stat'or'time']を作成
function makepoints(){
  $fill = array_fill(0, 41, array('stat' => false, 'time' => 0));
  $points = array_fill(0, 41, $fill);
  return $points;
}
