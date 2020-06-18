<?php
session_start();
require_once('../../config/setup.php');
require_once('../../config/mysqlconnect.php');
$output = [
    'success' => false
];
$incoming_request = json_decode( file_get_contents( 'php://input'),true);


$required_keys=['runtime','logline','title','releasedYear','genre','mpaa','developmentStage','synopsis','film1','film2'];
$input_keys_array=[];
$request = $incoming_request['newProject'];

foreach($request AS $key=>$value){
    $request[$key] = addslashes($value);
    $keys_array[]=$key;
};

foreach($required_keys AS $key){
    if(!array_key_exists($key,$request)){
        throw new Exception('missing the '.$key);
    };
};

$query = "INSERT INTO `projects` SET `runtime`= '{$request["runtime"]}',
            `logline`= '{$request["logline"]}',
            `title`= '{$request["title"]}',
            `year`= '{$request["releasedYear"]}',
            `genre`= '{$request["genre"]}',
            `mpaa_rating`= '{$request["mpaa"]}',
            `production_stage`= '{$request["developmentStage"]}',
            `synopsis`= '{$request["synopsis"]}'";
$result = $db -> query($query);
if($result){
    $output['success']=true;
    $output['project_id']=mysqli_insert_id($db);
    $_SESSION['project_id']=mysqli_insert_id($db);
}else{
    $output['error']=mysqli_error($db);
}
print_r($result);

$queryTitle=' ';
$title='';

if($bodyVars){
    foreach ($bodyVars as $key => $value) {
        $queryTitle.= 'c.`title`= "'.$value.'"';
        if($key === 'title1'){
            $queryTitle.= ' OR ';
        }
    }
} else {
    exit(500);
}


$id_query = 'SELECT c.`id`, c.`title`
                FROM `comparables` AS c
                WHERE '.$queryTitle.'';

$id_result = $db -> query($id_query);
$queryTitle=' c.`title`= '.json_encode($request['film1']).' OR  c.`title`= '.json_encode($request['film2']);
$id_query = 'SELECT c.`id`,c.`title`
                FROM `comparables` AS c
                WHERE '.$queryTitle.'';
$id_result=$db->query($id_query);
// Need to add new comparables if the result does not have 2 comparable pictures

print_r($id_result);
$insert_ids=[];
$comparables_ids=[];

while($row_id=$id_result->fetch_assoc()){
    $comparables_ids[]=$row_id['id'];
    $insert_query = "INSERT INTO `projects_comparables` SET `projects_id`='{$output["project_id"]}', `comparables_id`='{$row_id["id"]}'";
    $insert_result=$db->query($insert_query);
    $insert_ids[]= mysqli_insert_id($db);
}

$output['comparables_ids'] = $comparables_ids;

if(count( $comparables_ids) === 1){
    $_SESSION['comparable_in_database'] = $output['comparables_ids'][0];
    
}else{
    unset($_SESSION['comparable_in_database'] );
}


if(isset($_SESSION['user_id'])){
    $insert_users_projects_query = " INSERT INTO `users_projects` SET `users_id`='{$_SESSION["user_id"]}', `projects_id`='{$_SESSION["project_id"]}' ";
    $result_user_projects =$db->query($insert_users_projects_query);

    if($result_user_projects){
        $output['insert new project'] = true;
    }else{
        throw new Exception('failed to insert new project');
    };
}




$json_output = json_encode($output);
print($json_output);

?>
