<?php

header("Access-Control-Allow-Origin: *");

require_once('../../config/setup.php');
require_once('../../config/mysqlconnect.php');

foreach($_GET AS $key=>$value){
    $_GET[$key]=addslashes($value);
}

$token = $_GET[$key];

if(!$token){
    throw new Exception ('You must enter a valid sharable ID to access this link.');
}

$sharable_query = 'SELECT s.`id`, s.`comparables_id`
            FROM `sharable` AS s 
            WHERE s.`token` = "'.$token.'"';

$sharable_result = $db->query($sharable_query);

if(!$sharable_result){
    throw new Exception ('There is no sharable ID associated with what you have sent.');
}

$sharable_comps = [];

while($row_id=$sharable_result->fetch_assoc()){
    $sharable_comps[]=$row_id['comparables_id'];
}

$_GET = [
    'id1' => $sharable_comps[0],
    'id2' => $sharable_comps[1]
];

require_once('./financial.php');

?>