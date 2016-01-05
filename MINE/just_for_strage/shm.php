<?php
$id = shm();
$pointskey = 1386;
$lockkey = 9948;

function shm(){
  $id = shm_attach(4600, 10000);
  return $id;
}

function addpoint($server, $no){
  waitlock();

  $points = shm_get_var($id, $pointskey);
  $points[$server][$no] = true;

  unlock();
  return shm_put_var($id, $pointskey, $points);
}

function deletepoint($server, $no){
  waitlock();

  $points = shm_get_var($id, $pointskey);
  $points[$server][$no] = false;

  unlock();
  return shm_put_var($id, $pointskey, $points);
}

function loadpoint(){
  return shm_get_var($id, $pointskey);
}

function waitlock(){
  while(shm_get_var($id, $lockkey)){
    sleep(1);
  }
  shm_put_var($id, $lockkey, true);
  return;
}

function unlock(){
  shm_put_var($id, $lockkey, false);
  return;
}
