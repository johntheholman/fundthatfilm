<?php
session_start();
header("Access-Control-Allow-Origin: *");

require_once('../../config/setup.php');
require_once('../../config/mysqlconnect.php');

$output = [
    'success'=> false
];

$bodyVars = [intval($_GET['id1']),intval($_GET['id2'])];


if($bodyVars[0] === 0 && $bodyVars[1] === 0){
    throw new Exception ('Expected two valid films, none were entered.');
}

if($bodyVars[0] === 0 || $bodyVars[1] === 0){
    throw new Exception ('Expected at least two valid films to calculate relevant financial data.');
}

$queryIDPiece='';

if($bodyVars){
    for($index=0;$index<count($bodyVars);$index++){
        if(is_numeric($bodyVars[$index])){
            $queryID=floatVal($bodyVars[$index]);
            $queryIDPiece.='c.`id`= '.$queryID;
            if($index<count($bodyVars)-1){
                $queryIDPiece.= ' OR ';
            }
        }else{
            exit();
        }
    }
}

$query = 'SELECT c.`id`,c.`title`,c.`us_gross_bo`,c.`intl_gross_bo`
            FROM `comparables` AS c
            WHERE '.$queryIDPiece.'';

$result = $db->query($query);

$us_gross=[];
$intl_gross=[];

if ($result){
    if ($result -> num_rows === 1){
        throw new Exception ('Could not find all films in the database. We need at least two valid films to calculate relevant financial data.');
    }
    
    if ($result -> num_rows > 0) {
        $data=[
            [
                "north america"=>[
                    "theatrical"=> [
                        "gross"=> 0,
                        "film rental"=> 0,
                        "distribution fee"=> 0,
                        "direct distribution expenses"=> 0,
                        "distributor's net"=> 0
                    ],
                    "home entertainment"=> [
                        "gross"=> 0,
                        "expenses"=> 0,
                        "distribution fee"=> 0,
                        "distributor's net"=>0
                    ],
                    "theatrical and home"=> [
                        "sales agent fee"=> 0,
                        "distributor's net"=> 0
                    ],
                    "pay per view"=> [
                        "gross"=> 0,
                        "distribution fee"=> 0,
                        "direct distribution expenses"=> 0,
                        "sales agent fee"=> 0,
                        "distributor's net"=> 0
                    ],
                    "premium cable"=>[
                        "gross"=> 0,
                        "distribution fee"=> 0,
                        "direct distribution expenses"=>0,
                        "sales agent fee"=> 0,
                        "distributor's net"=>0
                    ],
                    "free tv premiere"=>[
                        "gross"=> 0,
                        "distribution fee"=> 0,
                        "direct distribution expenses"=> 0,
                        "sales agent fee"=> 0,
                        "distributor's net"=> 0
                    ],
                    "cable and syndicated tv"=> [
                        "gross"=> 0,
                        "distribution fee"=> 0,
                        "direct distribution expenses"=> 0,
                        "sales agent fee"=> 0,
                        "distributor's net"=> 0
                    ],
                    "total net earnings"=> 0
                ],
                "international"=>[
                    "theatrical, home, tv gross"=> 0,
                    "sales agent fee"=> 0,
                    "total net earnings"=> 0
                ],
                "global consumer products"=>[
                    "royalties gross"=> 0,
                    "merchandising distribution fee"=> 0,
                    "sales agent fee"=> 0,
                    "distributor's net"=> 0
                ],
                "total distributor's net"=>0,
                "global brand tie-in fees"=> 0,
                "production financing expense"=> 0,
                "negative cost"=> 0,
                "studio burden"=> 0,
                "talent residuals"=> 0,
                "sales agent direct sales expenses"=> 0,
                "producer's gross"=> 0,
                "talent participation"=> 0,
                "producer's net"=> 0,
                "studio's share"=> 0,
                "producer's share"=> 0,
                "distributor's net earning to cost ratio"=> '',
                "expenses after distributor's net"=> 0
            ]
        ];

        $output = [
            'success'=> true
        ];
        while($row = $result->fetch_assoc()){
                $us_gross[]=$row['us_gross_bo'];
                $intl_gross[]=$row['intl_gross_bo'];
        }

        $avg = array_sum($us_gross)/count($us_gross);
        $na_theatrical_gross_bo = floor($avg*0.60); 
        $na_theatrical_film_rental = floor($na_theatrical_gross_bo*0.50);
        $na_theatrical_distribution_fee = floor($na_theatrical_film_rental*0.25);
        $na_theatrical_distribution_expense = floor($na_theatrical_gross_bo*0.86);
        $na_theatrical_distributor_net = floor($na_theatrical_gross_bo - $na_theatrical_film_rental - $na_theatrical_distribution_fee - $na_theatrical_distribution_expense); 

        $data[0]['north america']['theatrical']['gross'] = $na_theatrical_gross_bo;
        $data[0]['north america']['theatrical']['film rental'] = $na_theatrical_film_rental;
        $data[0]['north america']['theatrical']['distribution fee'] = $na_theatrical_distribution_fee;
        $data[0]['north america']['theatrical']['direct distribution expenses'] = $na_theatrical_distribution_expense;
        $data[0]['north america']['theatrical']["distributor's net"] = $na_theatrical_distributor_net;

        $na_home_ent_sales_gross = floor($na_theatrical_gross_bo*1.80);
        $na_home_ent_sales_expenses = floor(3000000+(($na_home_ent_sales_gross*0.47)/10*1)+(($na_home_ent_sales_gross*0.47)/300*1));
        $na_home_ent_sales_distribution_fee = floor(($na_home_ent_sales_gross - $na_home_ent_sales_expenses)*0.25);
        $na_home_ent_sales_distributor_net = floor( $na_home_ent_sales_gross - $na_home_ent_sales_expenses - $na_home_ent_sales_distribution_fee);

        $data[0]['north america']['home entertainment']['gross'] = $na_home_ent_sales_gross;
        $data[0]['north america']['home entertainment']['expenses'] = $na_home_ent_sales_expenses;
        $data[0]['north america']['home entertainment']['distribution fee'] = $na_home_ent_sales_distribution_fee;
        $data[0]['north america']['home entertainment']["distributor's net"] = $na_home_ent_sales_distributor_net;

        $na_theatrical_home_sales_agent_fee = floor( ($na_theatrical_distributor_net + $na_home_ent_sales_distributor_net)*0.05);
        $na_theatrical_home_sales_distributor_net = floor( ($na_theatrical_distributor_net + $na_home_ent_sales_distributor_net) - $na_theatrical_home_sales_agent_fee);

        $data[0]['north america']['theatrical and home']['sales agent fee'] = $na_theatrical_home_sales_agent_fee;
        $data[0]['north america']['theatrical and home']["distributor's net"] = $na_theatrical_home_sales_distributor_net;

        $na_ppv_gross = floor($na_theatrical_gross_bo * 0.055);
        $na_ppv_distribution_fee = 0;
        $na_ppv_expenses = 150000;
        $na_ppv_sales_agent_fee = floor($na_ppv_gross * 0.15);
        $na_ppv_distributor_net = floor($na_ppv_gross - $na_ppv_distribution_fee - $na_ppv_expenses - $na_ppv_sales_agent_fee);

        $data[0]['north america']['pay per view']['gross'] = $na_ppv_gross;
        $data[0]['north america']['pay per view']['distribution fee'] = $na_ppv_distribution_fee;
        $data[0]['north america']['pay per view']['direct distribution expenses'] = $na_ppv_expenses;
        $data[0]['north america']['pay per view']['sales agent fee'] = $na_ppv_sales_agent_fee;
        $data[0]['north america']['pay per view']["distributor's net"] = $na_ppv_distributor_net;

        $na_premium_cable_gross =floor($na_theatrical_gross_bo * 0.10) ;
        $na_premium_cable_distribution_fee = 0;
        $na_premium_cable_expenses = 150000; 
        $na_premium_cable_sales_agent_fee = floor(($na_premium_cable_gross - $na_premium_cable_distribution_fee - $na_premium_cable_expenses) * 0.15);
        $na_premium_cable_distributor_net = floor( $na_premium_cable_gross - $na_premium_cable_distribution_fee - $na_premium_cable_expenses - $na_premium_cable_sales_agent_fee);

        $data[0]['north america']['premium cable']['gross'] = $na_premium_cable_gross;
        $data[0]['north america']['premium cable']['distribution fee'] = $na_premium_cable_distribution_fee;
        $data[0]['north america']['premium cable']['direct distribution expenses'] = $na_premium_cable_expenses;
        $data[0]['north america']['premium cable']['sales agent fee'] = $na_premium_cable_sales_agent_fee;
        $data[0]['north america']['premium cable']["distributor's net"] = $na_premium_cable_distributor_net;

        $na_free_tv_gross = floor($na_theatrical_gross_bo * 0.075) ;
        $na_free_tv_distribution_fee = 0;
        $na_free_tv_expenses = 200000;
        $na_free_tv_sales_agent_fee = floor(($na_free_tv_gross - $na_free_tv_distribution_fee - $na_free_tv_expenses) * 0.15) ;
        $na_free_tv_distributor_net = floor($na_free_tv_gross - $na_free_tv_distribution_fee - $na_free_tv_expenses - $na_free_tv_sales_agent_fee) ;

        $data[0]['north america']['free tv premiere']['gross'] = $na_free_tv_gross;
        $data[0]['north america']['free tv premiere']['distribution fee'] = $na_free_tv_distribution_fee;
        $data[0]['north america']['free tv premiere']['direct distribution expenses'] = $na_free_tv_expenses;
        $data[0]['north america']['free tv premiere']['sales agent fee'] = $na_free_tv_sales_agent_fee;
        $data[0]['north america']['free tv premiere']["distributor's net"] = $na_free_tv_distributor_net;

        $na_cable_syndicated_tv_gross = floor($na_theatrical_gross_bo * 0.05);
        $na_cable_syndicated_tv_distribution_fee = 0;
        $na_cable_syndicated_tv_expenses = 200000;
        $na_cable_syndicated_tv_sales_agent_fee = floor(($na_cable_syndicated_tv_gross - $na_cable_syndicated_tv_distribution_fee - $na_cable_syndicated_tv_expenses) * 0.05);
        $na_cable_syndicated_tv_distributor_net = floor($na_cable_syndicated_tv_gross - $na_cable_syndicated_tv_distribution_fee - $na_cable_syndicated_tv_expenses - $na_cable_syndicated_tv_sales_agent_fee);

        $data[0]['north america']['cable and syndicated tv']['gross'] = $na_cable_syndicated_tv_gross;
        $data[0]['north america']['cable and syndicated tv']['distribution fee'] = $na_cable_syndicated_tv_distribution_fee;
        $data[0]['north america']['cable and syndicated tv']['direct distribution expenses'] = $na_cable_syndicated_tv_expenses;
        $data[0]['north america']['cable and syndicated tv']['sales agent fee'] = $na_cable_syndicated_tv_sales_agent_fee;
        $data[0]['north america']['cable and syndicated tv']["distributor's net"] = $na_cable_syndicated_tv_distributor_net;

        $na_total_net_earnings = floor(($na_theatrical_home_sales_distributor_net + $na_ppv_distributor_net + $na_premium_cable_distributor_net + $na_free_tv_distributor_net + $na_cable_syndicated_tv_distributor_net));

        $data[0]['north america']['total net earnings'] = $na_total_net_earnings;

        $intl_avg = array_sum($intl_gross)/count($intl_gross);
        $intl_total_sales_gross = floor($intl_avg*0.70);
        $intl_sales_agent_fee = floor($intl_total_sales_gross * 0.20);
        $intl_total_net_earnings = floor( $intl_total_sales_gross - $intl_sales_agent_fee);

        $data[0]['international']['theatrical, home, tv gross'] = $intl_total_sales_gross;
        $data[0]['international']['sales agent fee'] = $intl_sales_agent_fee;
        $data[0]['international']['total net earnings'] = $intl_total_net_earnings;

        $global_products_royalties_gross = floor(($na_theatrical_gross_bo + $intl_total_net_earnings) * 0.016);
        $global_products_merch_distribution_fee = 0;
        $global_products_sales_agent_fee = floor($global_products_royalties_gross * 0.15);
        $global_products_distributor_net = floor($global_products_royalties_gross - $global_products_merch_distribution_fee - $global_products_sales_agent_fee);

        $data[0]['global consumer products']['royalties gross'] = $global_products_royalties_gross;
        $data[0]['global consumer products']['merchandising distribution fee'] = $global_products_merch_distribution_fee;
        $data[0]['global consumer products']['sales agent fee'] = $global_products_sales_agent_fee;
        $data[0]['global consumer products']["distributor's net"] = $global_products_distributor_net;

        $total_distributor_net = floor(($na_total_net_earnings + $intl_total_net_earnings + $global_products_distributor_net)) ;
        $total_global_brand_tiein_fees = 0;
        $total_negative_cost = 45000000;
        $total_production_financing_expense = floor($total_negative_cost * (0.06 * 1.5));
        $total_studio_burden = 0;
        $total_talent_residuals = floor(($na_home_ent_sales_distributor_net * 0.045)+(($na_ppv_distributor_net + $na_premium_cable_distributor_net + $na_free_tv_distributor_net + $na_cable_syndicated_tv_distributor_net) * 0.036));
        $total_sales_agent_direct_expenses = 500000;
        $total_producers_gross = floor(($total_distributor_net + $total_global_brand_tiein_fees) - ($total_production_financing_expense + $total_negative_cost + $total_studio_burden + $total_talent_residuals + $total_sales_agent_direct_expenses));
        $total_talent_participation = floor($total_producers_gross * 0.07);
        $total_producers_net = floor($total_producers_gross - $total_talent_participation);
        $total_studios_share = 0;
        $total_producers_share = floor($total_producers_net - $total_studios_share);
        $total_distributor_net_earning_to_cost_ratio = floor(($total_distributor_net + $total_global_brand_tiein_fees)/($total_sales_agent_direct_expenses + $total_production_financing_expense + $total_negative_cost + $total_talent_residuals));
        $total_ratio_rounded = floor($total_distributor_net_earning_to_cost_ratio) ;
        $total_expenses_after_distributor_net = floor($total_production_financing_expense + $total_negative_cost + $total_studio_burden + $total_talent_residuals + $total_sales_agent_direct_expenses + $total_talent_participation);

        $data[0]["total distributor's net"] = $total_distributor_net;
        $data[0]['global brand tie-in fees'] = $total_global_brand_tiein_fees;
        $data[0]['production financing expense'] = $total_production_financing_expense;
        $data[0]['negative cost'] = $total_negative_cost;
        $data[0]['studio burden'] = $total_studio_burden;
        $data[0]['talent residuals'] = $total_talent_residuals;
        $data[0]['sales agent direct sales expenses'] = $total_sales_agent_direct_expenses;
        $data[0]["producer's gross"] = $total_producers_gross;
        $data[0]['talent participation'] = $total_talent_participation;
        $data[0]["producer's net"] = $total_producers_net;
        $data[0]["studio's share"] = $total_studios_share;
        $data[0]["producer's share"] = $total_producers_share;
        $data[0]["distributor's net earning to cost ratio"] = $total_ratio_rounded.':1';
        $data[0]["expenses after distributor's net"] = $total_expenses_after_distributor_net;

        $output['data']=$data;
    } 
} else {
    throw new Exception('SQL Error');
}

$json_data =json_encode($output);
print($json_data);

?>