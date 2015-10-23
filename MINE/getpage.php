<?php
if(!isset($_POST)) exit;

$page = intval($_POST["page"]);
if($page == 0) exit;

require_once dirname(__FILE__).'/connectdb.php';

$offset = ($page-1)*10;
$resource = mysql_query("select * from qa order by questionDT DESC, id ASC limit $offset, 10");
if(!$resource)exit;
$a = array();
while($row = mysql_fetch_array($resource, MYSQL_ASSOC)){
  $a[] = $row;
}
$resultjson = json_encode($a);
header("Content-type: application/json");
echo $resultjson;
exit;

