<?php
$systemid = 864; // System ID for the shared memory segment
$mode = "c"; // Access mode
$permissions = 0755; // Permissions for the shared memory segment
$size = 1024; // Size, in bytes, of the segment

$shmid = shmop_open($systemid, $mode, $permissions, $size);

$readstr = shmop_read($shmid, 0, 11);
//$readstr = '';
if(bin2hex($readstr[0])==='00')$readstr='';
if(empty($readstr)){
  shmop_write($shmid, "Hello, World!", 0);
  echo "ハロワ書き込んだよ";
} else {
  shmop_delete($shmid);
}
shmop_close($shmid);
?>
<!DOCTYPE html>
<html lang="ja">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>タイトル</title>
<style>
h1 { font-size: 14pt; padding: 1px 10px;
  border-style: solid; border-width: 0px 0px 2px 7px; border-color:green; }
body { background: #EEFFEE; }
article { background: white; margin: 10px 0px;  padding: 10px; }
</style>
</head>
<body>
<header>
  <h1>Sample</h1>
</header>
<article>
  <ol id="msgs"><?php echo $readstr ?></ol>
</article>
</body>
</html>
