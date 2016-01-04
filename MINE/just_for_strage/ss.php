<?php
header("Content-Type: text/event-stream\n\n");
$systemid = 864; // System ID for the shared memory segment
$mode = "c"; // Access mode
$permissions = 0755; // Permissions for the shared memory segment
$size = 1024; // Size, in bytes, of the segment

$shmid = shmop_open($systemid, $mode, $permissions, $size);

while (1) {

  $msgs = preg_replace('/\0/','',shmop_read($shmid, 0, 1024));
  if ($msgs != $buf) {
    echo "data:$msgs" . "\n\n";
    $buf = $msgs;
  }

  ob_flush();
  flush();
  sleep(1);
}
