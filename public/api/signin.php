<?php 

session_start();
require_once('../../config/setup.php');
require_once('../../config/mysqlconnect.php');


$output=[
    'success'=>false,
    'user'=>[
        'name'=>'',
        'projects'=>[]
    ]
    ];

if(isset($_SESSION['user_id'])){ 

    $output['success']=true; 
    $output['login']=true;
    $output['check-signin']=true;
    $json_output=json_encode($output);
}else{
    $output['login'] = false;

    $data = json_decode( file_get_contents( 'php://input'),true);

    if(!$data){
        throw new Exception('no data was sent');
    }

    $login=$data['login'];

    if(empty($login['email'])){
        throw new Exception('email is a required field');
    }

    if(!filter_var($login['email'], FILTER_VALIDATE_EMAIL)){
        throw new Exception('Not a valid email');
    }

    if(empty($login['password'])){
        throw new Exception('password is a required field');
    }

    $password = sha1($data['login']['password']);
    unset($data['login']['password']);

    $query ="SELECT `id` 
                FROM  `users` AS u
                WHERE  u.`password`='{$password}'
                AND u.`email`= '{$login['email']}' ";


    $result = $db->query($query);

    if($result){
        if($result->num_rows===1){
            while($row=$result->fetch_assoc()){
                $_SESSION['user_id']=$row['id'];
            }
            $output['success']=true;
            $output['login']=true;   
        }else{
            throw new Exception('Invalid email or password');
        } 
    }else{
        throw new Exception('SQL Error');
    }  
}

    $proj_id_query = "SELECT u.`id`, u.`name`,up.`projects_id`, pc.`comparables_id`,c.`title`
                        FROM `users` AS u
                        JOIN `users_projects` AS up ON up.`users_id`=u.`id`
                        JOIN `projects_comparables` AS pc ON pc.`projects_id` = up.`projects_id`
                        JOIN `comparables` AS c ON c.`id`= pc.`comparables_id`
                        WHERE u.`id`='{$_SESSION["user_id"]}' ";

        $proj_id_result = $db->query($proj_id_query);

        while($row=$proj_id_result->fetch_assoc()){
            $output['user']['name']=$row['name'];
            $_SESSION['user_name']=$row['name'];

            if(!array_key_exists($row['projects_id'],$output['user']['projects'])){
                $output['user']['projects'][$row['projects_id']]=[];
                $output['user']['projects'][$row['projects_id']][]=['id'=>$row['comparables_id'],'title'=>$row['title']];

            }else{                
                $output['user']['projects'][$row['projects_id']][]=['id'=>$row['comparables_id'],'title'=>$row['title']];
            } 
            
        }


    $_SESSION['projects'] = $output['user']['projects'];
   
        
    $json_output=json_encode($output);
    print_r($json_output);

?>