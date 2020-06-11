<?php 

require_once('mysqlcredentials.php');

$db = mysqli_connect($credentials['host'],$credentials['username'],$credentials['password'],$credentials['database'],$credentials['port']);

?>