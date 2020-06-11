<?php
session_start();


$output = [
    'login' => false
];


if(isset($_SESSION['user_id'])){
    $output['login'] = true;
    $output['user_name'] =$_SESSION['user_name'];
}

$json_output = json_encode($output);


print_r($json_output);

?>