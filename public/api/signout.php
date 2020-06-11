<?php 

session_start();
require_once('../../config/setup.php');
require_once('../../config/mysqlconnect.php');

session_unset();
session_destroy();

$output['success'] = true;
$output['login'] = false;


$json_output=json_encode($output);

print($json_output);

?>