<?php
session_start();
header("Access-Control-Allow-Origin: *");
/* 
this file is the endpoint that the client will reach when they submit their project details provided by the user
if the titles are not found in the database then we make a call the the api The Movie Database to retrieve the information about the films
*/

require_once('../../config/setup.php');
require_once('../../config/mysqlconnect.php');
require_once('../../config/tmdbcredentials.php');
require_once('../../config/omdbcredentials.php');

$output = [
    'success' => false
];

foreach($_GET AS $key => $value){
    $_GET[$key] = addslashes($value);
}

$bodyVars = ['title1' => $_GET['title1'], 'title2' => $_GET['title2']];


if(!$bodyVars){
    exit(500);
}

if(intval($bodyVars['title1']) !==0 || intval($bodyVars['title2']) !==0){
    throw new Exception('Can not have an integer as a movie title...for now.');
}

if($bodyVars['title1'] === '' || $bodyVars['title2'] === ''){
    throw new Exception('Missing film title');
}

if($bodyVars['title1'] === $bodyVars['title2']){
    throw new Exception('The comparables are the same. Choose two different films!');
}

if(strlen($bodyVars['title1']) > 100 || strlen($bodyVars['title2']) > 100){
    throw new Exception('The name of the comparables films are too long. Choose others.');
}

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

$id_array = [];
while($row_id =$id_result -> fetch_assoc()){
    $id_array[] = $row_id['id'];
    $incoming_title[] = $row_id['title'];
}


if($id_result -> num_rows === 2 && isset($_SESSION['project_id'])){
    for($indexIDS=0;$indexIDS<count($id_array);$indexIDS++){
        $output['user']['projects'][$_SESSION['project_id']][]=['id'=>$id_array[$indexIDS], 'title'=>$incoming_title[$indexIDS]];
    }
    $_SESSION['projects'][$_SESSION['project_id']] =  $output['user']['projects'][$_SESSION['project_id']];
}

if($id_result -> num_rows === 1){
    if($incoming_title[0] == $bodyVars['title1']){
        $movies_url = 'https://api.themoviedb.org/3/search/movie?api_key='.urlencode($movie_key).'&query='.urlencode($bodyVars['title2']);
    } else {
        $movies_url = 'https://api.themoviedb.org/3/search/movie?api_key='.urlencode($movie_key).'&query='.urlencode($bodyVars['title1']);
    }

    $movies_title = file_get_contents($movies_url);
    $movies_title_data = json_decode($movies_title, true);

    if(count($movies_title_data['results']) > 0){
        for($titleIndex=0; $titleIndex < count($movies_title_data['results']); $titleIndex++){
            if($movies_title_data['results'][$titleIndex]['title'] === $bodyVars['title1'] || $movies_title_data['results'][$titleIndex]['title'] === $bodyVars['title2']){
                $movies_id = 'https://api.themoviedb.org/3/movie/'.intval($movies_title_data['results'][$titleIndex]['id']).'?api_key='.urlencode($movie_key);
                $movies_detail = file_get_contents($movies_id);
                $movies_detail_data = json_decode($movies_detail, true);

                $movies_mpaa_rating = 'https://api.themoviedb.org/3/movie/'.intval($movies_title_data['results'][$titleIndex]['id']).'/release_dates?api_key='.urlencode($movie_key);
                $movies_mpaa_detail = file_get_contents($movies_mpaa_rating);
                $movies_mpaa_data = json_decode($movies_mpaa_detail, true);

                $mpaa_certification = '';
                if(count($movies_mpaa_data['results']) > 0){
                    for($mpaaIndex=0; $mpaaIndex < count($movies_mpaa_data['results']); $mpaaIndex++){
                        if($movies_mpaa_data['results'][$mpaaIndex]['iso_3166_1'] === 'US'){
                            $mpaa_certification = $movies_mpaa_data['results'][$mpaaIndex]['release_dates'][0]['certification'];
                        }
                    }
                }

                $insert_us_gross_bo = floor($movies_detail_data["revenue"] * .6);
                $insert_intl_gross_bo = floor($movies_detail_data["revenue"] * .4);
                $insert_audience_satisfaction = $movies_detail_data["vote_average"] / 10;
                $Date = $movies_detail_data["release_date"];
                $insert_us_theatrical_end = date('Y-m-d', strtotime($Date. ' + 90 days'));

                $insert_comp_query = "INSERT INTO `comparables` SET `title`= '{$movies_detail_data["title"]}',
                    `us_theatrical_release`= '{$movies_detail_data["release_date"]}',
                    `us_gross_bo`= '{$insert_us_gross_bo}',
                    `intl_gross_bo`= '{$insert_intl_gross_bo}',
                    `budget`= '{$movies_detail_data["budget"]}',
                    `mpaa_rating`= '{$mpaa_certification}',
                    `audience_satisfaction`= '{$insert_audience_satisfaction}',
                    `us_theatrical_end`= '{$insert_us_theatrical_end}',
                    `genre`= '{$movies_detail_data["genres"][0]["name"]}'";

                $insert_comp_result = $db -> query($insert_comp_query);

                if($insert_comp_result){
                    $insert_comp_id = mysqli_insert_id($db);

                    $_SESSION['new_comparable'] = $insert_comp_id;

                    $insert_query = "INSERT INTO `projects_comparables` SET `projects_id`='{$_SESSION['project_id']}', `comparables_id`='{$insert_comp_id}'";
                    $insert_result=$db->query($insert_query);

                    $id_in_database=$_SESSION['comparable_in_database'];
                    $read_query = "SELECT `title` FROM `comparables` WHERE `id`= {$id_in_database}";
                    $read_result =$db->query($read_query);

                    while($row= $read_result->fetch_assoc()){
                        $missing_title=$row['title'];
                    };
                   $str_insert_comp_id =  ''.$insert_comp_id;

                   $output['user']['projects'][$_SESSION['project_id']][]=['id'=>$str_insert_comp_id,'title'=>$movies_detail_data["title"]];
                   $output['user']['projects'][$_SESSION['project_id']][]=['id'=>$_SESSION['comparable_in_database'],'title'=>$missing_title];
                   $_SESSION['projects'][] =$output['user']['projects'][$_SESSION['project_id']];
                } else {
                    throw new Exception('There was an error with the film that you are trying to enter.');
                }

                $insert_poster_query = "INSERT INTO `comparables_images`
                                            SET `comparables_id`= '{$insert_comp_id}',
                                            `image_url`= 'https://image.tmdb.org/t/p/w600_and_h900_bestv2{$movies_detail_data["poster_path"]}'";

                $insert_poster_result = $db -> query($insert_poster_query);

                if($insert_poster_result){
                    $insert_poster_id = mysqli_insert_id($db);
                } else {
                    throw new Exception('The poster you were trying to add was not added.');
                }

                $funding_id_array = [];

                for($fundingIndex=0; $fundingIndex < count($movies_detail_data['production_companies']); $fundingIndex++){
                    $select_funding_query = "SELECT fp.`id`, fp.`name`
                                                FROM `funding_partners` AS fp
                                                WHERE fp.`name` = '".$movies_detail_data['production_companies'][$fundingIndex]['name']."'";

                    $select_funding_result = $db -> query($select_funding_query);

                    if($select_funding_result -> num_rows === 1){
                        while($row_id = $select_funding_result -> fetch_assoc()){
                            $funding_id_array[] = $row_id['id'];
                        }
                    } else {
                        $insert_funding_query = "INSERT INTO `funding_partners` (`name`)
                                                    VALUES ('".$movies_detail_data['production_companies'][$fundingIndex]['name']."');";

                        $insert_funding_result = $db -> query($insert_funding_query);

                        if($insert_funding_result){
                            $funding_id_array[] = mysqli_insert_id($db);
                        } else {
                            throw new Exception('The funding partner you were trying to add was not added.');
                        }
                    }
                }

                $compFundPiece='';

                for($compFundIndex=0; $compFundIndex < count($funding_id_array); $compFundIndex++){
                    $compFundPiece.= '('.$insert_comp_id.', '.$funding_id_array[$compFundIndex].')';
                    if($compFundIndex < count($funding_id_array) - 1){
                        $compFundPiece.= ', ';
                    }
                }

                $insert_comp_fund_query = "INSERT INTO `comparables_funding` (`comparables_id`, `funding_partners_id`)
                                            VALUES ".$compFundPiece.";";

                $insert_comp_fund_result = $db -> query($insert_comp_fund_query);

                $distribution_title = '';

                $distribution_url = 'http://www.omdbapi.com/?i='.$movies_detail_data['imdb_id'].'&apikey='.$open_key;
                $distribution_company_name = file_get_contents($distribution_url);
                $distribution_company_data = json_decode($distribution_company_name, true);
                $distribution_title = $distribution_company_data['Production'];

                $select_distribution_query = "SELECT dc.`id`, dc.`name`
                                                FROM `distribution_companies` AS dc
                                                WHERE dc.`name` = '{$distribution_title}'";

                $select_distribution_query_result = $db -> query($select_distribution_query);

                if($select_distribution_query_result -> num_rows === 1){
                    while($row_id = $select_distribution_query_result -> fetch_assoc()){
                        $insert_distribution_id = $row_id['id'];
                    }
                } else {
                    $insert_distribution_query = "INSERT INTO `distribution_companies`
                                                    SET `name`= '{$distribution_title}'";

                    $insert_distribution_result = $db -> query($insert_distribution_query);

                    if($insert_distribution_result){
                        $insert_distribution_id = mysqli_insert_id($db);
                    } else {
                        throw new Exception('The distribution company you were trying to add was not added.');
                    }
                }

                $insert_comp_dist_query = "INSERT INTO `comparables_distribution` (`comparables_id`, `distribution_companies_id`)
                                            VALUES (".$insert_comp_id.", ".$insert_distribution_id.");";

                $insert_comp_dist_result = $db -> query($insert_comp_dist_query);

                $id_array[] = $insert_comp_id;
            }
        }
    } else {
        throw new Exception('There was no response from the API.');
    }

} elseif ($id_result -> num_rows === 0){
    $no_remp_movies = 0;

    $newTitles = [$_GET['title1'],$_GET['title2']];
    for($newTitleIndex = 0; $newTitleIndex < count($newTitles); $newTitleIndex++){
        $movies_url = 'https://api.themoviedb.org/3/search/movie?api_key='.urlencode($movie_key).'&query='.urlencode($newTitles[$newTitleIndex]);
        $movies_title = file_get_contents($movies_url);
        $movies_title_data = json_decode($movies_title, true);

        if(count($movies_title_data['results']) > 0){
            for($titleIndex=0; $titleIndex < count($movies_title_data['results']); $titleIndex++){
                if($movies_title_data['results'][$titleIndex]['title'] === $bodyVars['title1'] || $movies_title_data['results'][$titleIndex]['title'] === $bodyVars['title2']){
                    $movies_id = 'https://api.themoviedb.org/3/movie/'.intval($movies_title_data['results'][$titleIndex]['id']).'?api_key='.urlencode($movie_key);
                    $movies_detail = file_get_contents($movies_id);
                    $movies_detail_data = json_decode($movies_detail, true);

                    $movies_mpaa_rating = 'https://api.themoviedb.org/3/movie/'.intval($movies_title_data['results'][$titleIndex]['id']).'/release_dates?api_key='.urlencode($movie_key);
                    $movies_mpaa_detail = file_get_contents($movies_mpaa_rating);
                    $movies_mpaa_data = json_decode($movies_mpaa_detail, true);

                    $mpaa_certification = '';
                    if(count($movies_mpaa_data['results']) > 0){
                        for($mpaaIndex=0; $mpaaIndex < count($movies_mpaa_data['results']); $mpaaIndex++){
                            if($movies_mpaa_data['results'][$mpaaIndex]['iso_3166_1'] === 'US'){
                                $mpaa_certification = $movies_mpaa_data['results'][$mpaaIndex]['release_dates'][0]['certification'];
                            }
                        }
                    }

                    $insert_us_gross_bo = floor($movies_detail_data["revenue"] * .6);
                    $insert_intl_gross_bo = floor($movies_detail_data["revenue"] * .4);
                    $insert_audience_satisfaction = $movies_detail_data["vote_average"] / 10;
                    $Date = $movies_detail_data["release_date"];
                    $insert_us_theatrical_end = date('Y-m-d', strtotime($Date. ' + 90 days'));

                    $insert_comp_query = "INSERT INTO `comparables` SET `title`= '{$movies_detail_data["title"]}', 
                        `us_theatrical_release`= '{$movies_detail_data["release_date"]}', 
                        `us_gross_bo`= '{$insert_us_gross_bo}', 
                        `intl_gross_bo`= '{$insert_intl_gross_bo}',
                        `budget`= '{$movies_detail_data["budget"]}',
                        `mpaa_rating`= '{$mpaa_certification}',
                        `audience_satisfaction`= '{$insert_audience_satisfaction}',
                        `us_theatrical_end`= '{$insert_us_theatrical_end}',
                        `genre`= '{$movies_detail_data["genres"][0]["name"]}'";

                    $insert_comp_result = $db -> query($insert_comp_query);
                    $no_remp_movies++;
                    if($insert_comp_result){
                        $insert_comp_id = mysqli_insert_id($db);

                        $str_insert_comp_id=''.$insert_comp_id;

                        $insert_query = "INSERT INTO `projects_comparables` SET `projects_id`='{$_SESSION['project_id']}', `comparables_id`='{$insert_comp_id}'";
                        $insert_result=$db->query($insert_query);
                        $output['user']['projects'][$_SESSION['project_id']][]=['id'=>$str_insert_comp_id,'title'=>$movies_detail_data["title"]];
                        if($no_remp_movies===2){
                            $_SESSION['projects'][$_SESSION['project_id']] = $output['user']['projects'][$_SESSION['project_id']];
                        }
                    } else {
                        throw new Exception('There was an error with the film that you are trying to enter.');
                    }

                    $insert_poster_query = "INSERT INTO `comparables_images`
                                                SET `comparables_id`= '{$insert_comp_id}',
                                                `image_url`= 'https://image.tmdb.org/t/p/w600_and_h900_bestv2{$movies_detail_data["poster_path"]}'";
                    $insert_poster_result = $db -> query($insert_poster_query);

                    if($insert_poster_result){
                        $insert_poster_id = mysqli_insert_id($db);
                    } else {
                        throw new Exception('The poster you were trying to add was not added.');
                    }

                    $funding_id_array = [];

                    for($fundingIndex=0; $fundingIndex < count($movies_detail_data['production_companies']); $fundingIndex++){
                        $select_funding_query = "SELECT fp.`id`, fp.`name`
                                                    FROM `funding_partners` AS fp
                                                    WHERE fp.`name` = '".$movies_detail_data['production_companies'][$fundingIndex]['name']."'";

                        $select_funding_result = $db -> query($select_funding_query);

                        if($select_funding_result -> num_rows === 1){
                            while($row_id = $select_funding_result -> fetch_assoc()){
                                $funding_id_array[] = $row_id['id'];
                            }
                        } else {
                            $insert_funding_query = "INSERT INTO `funding_partners` (`name`)
                                                        VALUES ('".$movies_detail_data['production_companies'][$fundingIndex]['name']."');";

                            $insert_funding_result = $db -> query($insert_funding_query);

                            if($insert_funding_result){
                                $funding_id_array[] = mysqli_insert_id($db);
                            } else {
                                throw new Exception('The funding partner you were trying to add was not added.');
                            }
                        }
                    }

                    $compFundPiece='';

                    for($compFundIndex=0; $compFundIndex < count($funding_id_array); $compFundIndex++){
                        $compFundPiece.= '('.$insert_comp_id.', '.$funding_id_array[$compFundIndex].')';
                        if($compFundIndex < count($funding_id_array) - 1){
                            $compFundPiece.= ', ';
                        }
                    }

                    $insert_comp_fund_query = "INSERT INTO `comparables_funding` (`comparables_id`, `funding_partners_id`)
                                                VALUES ".$compFundPiece.";";

                    $insert_comp_fund_result = $db -> query($insert_comp_fund_query);

                    $distribution_title = '';

                    $distribution_url = 'http://www.omdbapi.com/?i='.$movies_detail_data['imdb_id'].'&apikey='.$open_key;
                    $distribution_company_name = file_get_contents($distribution_url);
                    $distribution_company_data = json_decode($distribution_company_name, true);
                    $distribution_title = $distribution_company_data['Production'];

                    $select_distribution_query = "SELECT dc.`id`, dc.`name`
                                                    FROM `distribution_companies` AS dc
                                                    WHERE dc.`name` = '{$distribution_title}'";

                    $select_distribution_query_result = $db -> query($select_distribution_query);

                    if($select_distribution_query_result -> num_rows === 1){
                        while($row_id = $select_distribution_query_result -> fetch_assoc()){
                            $insert_distribution_id = $row_id['id'];
                        }
                    } else {
                        $insert_distribution_query = "INSERT INTO `distribution_companies`
                                                        SET `name`= '{$distribution_title}'";

                        $insert_distribution_result = $db -> query($insert_distribution_query);

                        if($insert_distribution_result){
                            $insert_distribution_id = mysqli_insert_id($db);
                        } else {
                            throw new Exception('The distribution company you were trying to add was not added.');
                        }
                    }

                    $insert_comp_dist_query = "INSERT INTO `comparables_distribution` (`comparables_id`, `distribution_companies_id`)
                                                VALUES (".$insert_comp_id.", ".$insert_distribution_id.");";

                    $insert_comp_dist_result = $db -> query($insert_comp_dist_query);

                    $id_array[] = $insert_comp_id;
                }
            }
        } else {
            throw new Exception('There was no response from the API.');
        }
    }
}




$queryPiece='';

for($index=0; $index < count($id_array); $index++){
    $queryPiece.= 'c.`id`= '.$id_array[$index];
    if($index < count($id_array) - 1){
        $queryPiece.= ' OR ';
    }
}

$query = 'SELECT c.*, fp.`name` AS fp_name, dc.`id` AS dc_id, dc.`name` AS dc_name, GROUP_CONCAT(fp.`id`) AS funding_partners_ids, GROUP_CONCAT(fp.`name`)  AS funding_partners_names, ci.`image_url`
            FROM `comparables` AS c
            JOIN `comparables_funding` AS cf ON cf.`comparables_id` = c.`id`
            JOIN `funding_partners` AS fp ON fp.`id` = cf.`funding_partners_id`
            JOIN `comparables_distribution` AS cd ON cd.`comparables_id` = c.`id`
            JOIN `distribution_companies` AS dc ON dc.`id` = cd.`distribution_companies_id`
            JOIN `comparables_images` AS ci ON ci.`comparables_id` = c.`id`
            WHERE '.$queryPiece.'
            GROUP BY cf.`comparables_id`';

$result = $db -> query($query);
$data=[];

if ($result){
    if($result -> num_rows === 1){
        throw new Exception('One of the comparables does not exist in our database.');
    }

    if ($result -> num_rows > 0) {
        $output['success'] = true;

        while($row = $result -> fetch_assoc()){
            $row['distribution_companies_info'] = [
                [
                'id' => $row['dc_id'],
                'name' => $row['dc_name']
                ]
            ];

            $row['funding_partners_info'] = [];

            if(strlen($row['funding_partners_ids']) == 1){
                $row['funding_partners_info'][] = [
                    'id' => $row['funding_partners_ids'],
                    'name' => $row['funding_partners_names']
                ];
            } elseif (strlen($row['funding_partners_ids']) > 1){
                $id = explode(',',$row['funding_partners_ids']);
                $name = explode(',',$row['funding_partners_names']);
                for($index=0; $index < count($id); $index++){
                    $row['funding_partners_info'][] = [
                        'id' => $id[$index],
                        'name' => $name[$index]
                    ];
                }
            }

            unset($row['funding_partners_ids']);
            unset($row['funding_partners_names']);

            $row['year'] = explode('-',$row['us_theatrical_release'])[0];

            unset($row['fp_id']);
            unset($row['fp_name']);
            unset($row['dc_id']);
            unset($row['dc_name']);

            $data[] = $row;
        }
    }
} else {
    throw new Exception('SQL Error');
}

$output['data']=$data;

$json_output =json_encode($output);

print($json_output);

?>
