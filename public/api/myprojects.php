<?php 

session_start();
require_once('../../config/setup.php');
require_once('../../config/mysqlconnect.php');

$output=[
    'success'=>false
];
$data=[];

// if(!isset($_SESSION['user_id'])){
//     throw new Exception('Need to be signed in');
// }


$id_query ="SELECT `projects_id`
            FROM `users_projects`
            WHERE `users_id`={$_SESSION['user_id']}";


$id_result = $db->query($id_query);
$id_array=[];

if($id_result){
    
        while($row=$id_result->fetch_assoc()){
            $id_array[]=$row['projects_id'];
        };

        $idPiece='';

        for($index=0;$index<count($id_array);$index++){
            $idPiece.='`id`= '.$id_array[$index];
            if($index<count($id_array)-1){
                $idPiece.= ' OR ';
            }
        }

        $projs_query='SELECT *
                        FROM `projects`
                        WHERE '.$idPiece.'';
                        
        $projs_results = $db -> query($projs_query);

        while($row = $projs_results->fetch_assoc()){
            $data[]=$row;
        }

        $output['success'] = true;
        $output['data'] = $data;
        $output['projects'] = $_SESSION['projects'];

        $json_output =json_encode($output);

        print_r($json_output);

}else{
    throw new Exception('You have no projects in the sytem');
};


?>