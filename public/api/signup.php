<?php 

session_start();
require_once('../../config/setup.php');
require_once('../../config/mysqlconnect.php');


$output = [
    'success'=> false
];

$data = json_decode( file_get_contents( 'php://input'),true);


if(!$data){
    throw new Exception('No data was sent');
}

foreach ($data as $key => $value) {
    $data[$key] = addslashes($value);
}

if(empty($data['project_id'])){
    throw new Exception('need the project id to be sent');
}

if(empty($data['email'])){
    throw new Exception('email is a required field');
}

if(!filter_var($data['email'], FILTER_VALIDATE_EMAIL)){
    throw new Exception('Not a valid email');
}

if(empty($data['password'])){
    throw new Exception('password is a required field');
}



$password = sha1($data["password"]);
unset($data["password"]);
$email = $data["email"];
$dateJoined = date("y-m-d h:i:s");



$query_insert_user = "INSERT INTO `users` SET `name` = '{$data["name"]}',
            `last_login` = '{$dateJoined}',
            `email` = '{$email}',
            `password` = '{$password}' ";


$result_insert_user = $db->query($query_insert_user);
$user_id = mysqli_insert_id($db);



if($result_insert_user){
    $output['insert new user'] = true;
    $output['success'] = true;

    $_SESSION['user_id'] = $user_id;

    $insert_users_projects_query = " INSERT INTO `users_projects` SET `users_id`='{$user_id}', `projects_id`='{$data["project_id"]}' ";
    $result_user_projects =$db->query($insert_users_projects_query);

    if($result_user_projects){
    $output['insert new project'] = true;
    }else{
    throw new Exception('failed to insert new project');
    };

}else{
    throw new Exception('failed to add user');
};






$json_output = json_encode($output);
print_r($json_output);


?>