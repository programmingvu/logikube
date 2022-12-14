<?php
// header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

function msg($success,$status,$message,$extra = []){
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ],$extra);
}



require __DIR__.'/classes/Database.php';
require __DIR__.'/middlewares/Auth.php';

$date = date("Y-m-d H:i:s");

$allHeaders = getallheaders();
$db_connection = new Database();
$conn = $db_connection->dbConnection();
$auth = new Auth($conn,$allHeaders);
$data = json_decode(file_get_contents("php://input"));

$returnData = [];

$value = $data->value;
// $returnData = [
//     "success" => 0,
//     "status" => 401,
//     "message" => "Unauthorized"
// ];

// if($auth->isAuth()){

    switch ($value) {
        case "vendor":

            $fetch_vendor_name = "SELECT DISTINCT `$value` FROM `parts` ORDER BY `$value` ASC";
    $query_stmt = $conn->prepare($fetch_vendor_name);
    // $query_stmt->bindValue(':email', $email,PDO::PARAM_STR);
    $query_stmt->execute();

    

    // if($query_stmt->rowCount()):
        $row = $query_stmt->fetchAll(PDO::FETCH_ASSOC);
        $returnData = $row;

        // $returnData = [
        //     "success" => 1,
        //     "message" => $row
        // ];
        // $check_password = password_verify($password, $row['password']);

        // VERIFYING THE PASSWORD (IS CORRECT OR NOT?)
        // IF PASSWORD IS CORRECT THEN SEND THE LOGIN TOKEN
        // if($check_password):


            // $returnData = [
            //     'success' => 1,
            //     'message' => 'Success.',
            //     // 'token' => $token
            // ];

        // IF INVALID PASSWORD
        // else:
        //     $returnData = msg(0,422,'Invalid Password!');
        // endif;

    // IF THE USER IS NOT FOUNDED BY EMAIL THEN SHOW THE FOLLOWING ERROR
    // else:
    //     $returnData = msg(0,422,'error');
    // endif;
    // $returnData = msg(0,422,'error1');

        break;
        case "vendor_number":
            // echo $value;
        $fetch_vendor_number = "SELECT DISTINCT `$value` FROM `parts` ORDER BY `$value` ASC";
        $query_stmt = $conn->prepare($fetch_vendor_number);
        // $query_stmt->bindValue(':email', $email,PDO::PARAM_STR);
        $query_stmt->execute();
    
        
    
        // if($query_stmt->rowCount()):
            $row = $query_stmt->fetchAll(PDO::FETCH_ASSOC);
            $returnData = $row;
    
        // else:
        //     $returnData = msg(0,422,'error');
        // endif;
        // $returnData = msg(0,422,'error1');
    break;
        case "part_number":
            $fetch_part_number = "SELECT DISTINCT `$value` FROM `parts` ORDER BY `$value` ASC";
            $query_stmt = $conn->prepare($fetch_part_number);
            $query_stmt->execute();

            $row = $query_stmt->fetchAll(PDO::FETCH_ASSOC);
            $returnData = $row;
        break;

        case "container_number":
            $fetch_container_number = "SELECT DISTINCT `$value` FROM `parts` ORDER BY `$value` ASC";
            $query_stmt = $conn->prepare($fetch_container_number);
            $query_stmt->execute();

            $row = $query_stmt->fetchAll(PDO::FETCH_ASSOC);
            $returnData = $row;
        break;
        case "parts":
            // $fetch_parts = "SELECT `active`, `date_modified`, `modified_by`,`vendor`,`vendor_number`,`part_number` AS `id`,`description`,`weight`,`weigh_uom`,`containers_per_truck`,`reusable`,`container_type`,`container_number`,`length`,`width`,`height`,`container_uom`,`stackable` FROM `parts`";
            $fetch_parts = "SELECT * FROM `parts`";

            $query_stmt = $conn->prepare($fetch_parts);
            $query_stmt->execute();

            $row = $query_stmt->fetchAll(PDO::FETCH_ASSOC);
            $returnData = $row;
        break;
        case "part_search":
            // $vendor_name = $data->vendor;
            // $vendor_number = $data->vendor_number;
            // $part_number = $data->part_number;
            // $container_number = $data->container_number;

            // $returnData = $vendor_name;
            // $fetch_part = "SELECT * FROM `parts` WHERE `vendor` = '$vendor_name'";
            // $query_stmt = $conn->prepare($fetch_part);
            // $query_stmt->execute();
            // $array = (array) $data;
            // $row = $query_stmt->fetchAll(PDO::FETCH_ASSOC);
            $search_array = array();
            // foreach ($data as $key=>$value) {}
            foreach ($data as $key=>$value) {
                if ($value != "") {
                    $search_array[$key] = $value;
                //    $returnData = $data;
                }
            }
            array_shift($search_array);

            // foreach ($)
            $keys = array_keys($search_array);
            
            $first_value = $search_array[$keys[0]];
            $second_value = $search_array[$keys[1]];
            $third_value = $search_array[$keys[2]];
            $fourth_value = $search_array[$keys[3]];

            $count = count($search_array);

            switch($count) {
                case 0:
                    $returnData = "yes";
                break;
                case 1:
                    $fetch_part = "SELECT * FROM `parts` WHERE `$keys[0]` = '$first_value'";
                    $query_stmt = $conn->prepare($fetch_part);
                    $query_stmt->execute();
                    $row = $query_stmt->fetchAll(PDO::FETCH_ASSOC);
                    $returnData = $row;
                break;
                case 2:
                    $fetch_part = "SELECT * FROM `parts` WHERE `$keys[0]` = '$first_value' AND `$keys[1]` = '$second_value'";
                    $query_stmt = $conn->prepare($fetch_part);
                    $query_stmt->execute();
                    $row = $query_stmt->fetchAll(PDO::FETCH_ASSOC);
                    $returnData = $row;

                break;
                case 3:
                    $fetch_part = "SELECT * FROM `parts` WHERE `$keys[0]` = '$first_value' AND `$keys[1]` = '$second_value' AND `$keys[2]` = '$third_value'";
                    $query_stmt = $conn->prepare($fetch_part);
                    $query_stmt->execute();
                    $row = $query_stmt->fetchAll(PDO::FETCH_ASSOC);
                    $returnData = $row;
                break;
                case 4:
                    $fetch_part = "SELECT * FROM `parts` WHERE `$keys[0]` = '$first_value' AND `$keys[1]` = '$second_value' AND `$keys[2]` = '$third_value' AND `$keys[3]` = '$fourth_value'";
                    $query_stmt = $conn->prepare($fetch_part);
                    $query_stmt->execute();
                    $row = $query_stmt->fetchAll(PDO::FETCH_ASSOC);
                    $returnData = $row;
                break;
            }
            // $returnData = $count;
            
            // $where = "FROM `parts` ";
            // if (!empty($vendor_n))
        break;
        case "part":
            $fetch_part = "SELECT * FROM `parts` WHERE `part_number` = `$value`";
            $query_stmt = $conn->prepare($fetch_part);
            $query_stmt->execute();

            $row = $query_stmt->fetchAll(PDO::FETCH_ASSOC);
            $returnData = $row;
        break;
        case "users":
            $fetch_part = "SELECT * FROM `users`";
            $query_stmt = $conn->prepare($fetch_part);
            $query_stmt->execute();
            
            $row = $query_stmt->fetchAll(PDO::FETCH_ASSOC);
            $returnData = $row;
        break;
        case "update":
            $vendor_name = $data->vendorName;
            $vendor_number = $data->vendorNumber;
            $part_number = $data->partNumber;
            $part_description = $data->partDescription;
            $weight = $data->weight;
            $weight_uom = $data->weightUOM;
            $quantity = $data->quantity;
            $reusable = $data->reusable;
            $container_type = $data->containerType;
            $container_number = $data->containerNumber;
            $length = $data->length;
            $width = $data->width;
            $height = $data->height;
            $container_uom = $data->containerUOM;
            $stackable = $data->stackable;
            $active = $data->active;
            $user = $data->user;
            $program = $data->program;
            $program_yearly = $data->programYearly;
            $program_daily = $data->programDaily;

            $items = array("part_number"=>$part_number, "description"=>$part_description, "vendor"=>$vendor_name, "vendor_number"=>$vendor_number, "length"=>$length, "width"=>$width, "height"=>$height, "standard_pack"=>$quantity, "weight"=>$weight, "weigh_uom"=>$weight_uom, "reusable"=>$reusable, "stackable"=>$stackable, "container_type"=>$container_type, "container_number"=>$container_number, "container_uom"=>$container_uom, "active"=>$active, "date_modified"=>$date, "modified_by"=>$user,"program"=>$program, "program_yealy"=>$program_yearly, "program_daily"=>$program_daily);


            $datetime = date("Y-m-d H:i:s");

            // select all items for current part
            $query = "SELECT * FROM `parts` WHERE `part_number` = '$part_number'";
            $query_stmt = $conn->prepare($query);
            $query_stmt->execute();

            $row = $query_stmt->fetchAll(PDO::FETCH_ASSOC);

    
            // compare current with new values and get different
            $compare_array = array("part_number"=>$row[0]['part_number'], "description"=>$row[0]['description'], "vendor"=>$row[0]['vendor'], "vendor_number"=>$row[0]['vendor_number'], "length"=>$row[0]['length'], "width"=>$row[0]['width'], "height"=>$row[0]['height'], "standard_pack"=>$row[0]['standard_pack'], "weight"=>$row[0]['weight'], "weigh_uom"=>$row[0]['weigh_uom'], "reusable"=>$row[0]['reusable'], "stackable"=>$row[0]['stackable'], "container_type"=>$row[0]['container_type'], "container_number"=>$row[0]['container_number'], "container_uom"=>$row[0]['container_uom'], "active"=>$row[0]['active'], "date_modified"=>$row[0]['date_modified'], "modified_by"=>$row[0]['modified_by'], "program"=>$row[0]['program'], "program_yearly"=>$row[0]['program_yearly'], "program_daily"=>$row[0]['program_daily']);

            $array_diff = array_diff($items, $compare_array);
            // if different then only update those parts


            // update audit history with different

            $valueSets = array();

            foreach($array_diff as $key=>$value) {
                $valueSets[] = "`$key`" . " = '" . $value . "'";
            }

            $sql = "UPDATE `parts` SET ". join(",", $valueSets) . " WHERE `part_number` = '$part_number'";
            $conn->query($sql);

            // insert into audit table
            $columns = array_keys($array_diff);
            $values = array_values($array_diff);

            $columns = implode(",", $columns);
            $columns = str_replace("weigh", "weight", $columns);
            $audit = array($user, $part_number, $datetime, "updated $columns");
            $insert_audit = $conn->prepare("INSERT INTO `audit_history` (`user_id`, `part_number`, `date`, `action`) VALUES (?,?,?,?)"); // change this to insert
            $insert_audit->execute($audit);


            // $update_part = $conn->prepare("UPDATE `parts` SET `part_number`=?, `description`=?, `vendor` =?,`vendor_number`=?,`length`=?,`width`=?,`height`=?,`standard_pack`=?,`weight`=?,`reusable`=?,`stackable`=?,`container_type`=?,`container_number`=?,`date_modified`=?,`modified_by`=? WHERE `part_number`= '$part_number'");

            // $update_part->execute($items);

            // $audit = array($user, $part_number, $datetime, "update");
            // $insert_audit = $conn->prepare("INSERT INTO `audit_history` (`user_id`, `part_number`, `date`, `action`) VALUES (?,?,?,?)"); // change this to insert
            // $insert_audit->execute($audit);
            
            $returnData = $items;
            // $returnData = $array_diff;
        break;

        case "update_user":
            $id = $data->id;
            $first_name = $data->firstName;
            $last_name = $data->lastName;
            $email = $data->email;
            $active = $data->active;
            $admin = $data->admin;

            // $items = array($first_name, $last_name, $email);

            // $update = $conn->prepare("UPDATE `users` SET `first_name`=?, `last_name`=?, `email`=? WHERE `id` = '$id'");
            // $update->execute($items);

            $items = array("first_name"=>$first_name, "last_name"=>$last_name, "email"=>$email, "active"=>$active, "admin"=>$admin);

            // $datetime = date("Y-m-d H:i:s");

            // // select all items for current part
            $query = "SELECT * FROM `users` WHERE `id` = '$id'";
            $query_stmt = $conn->prepare($query);
            $query_stmt->execute();

            $row = $query_stmt->fetchAll(PDO::FETCH_ASSOC);

    
            // // compare current with new values and get different
            $compare_array = array("first_name"=>$row[0]['first_name'], "last_name"=>$row[0]['last_name'], "email"=>$row[0]['email'], "active"=>$row[0]['active'], "admin"=>$row[0]['admin']);

            $array_diff = array_diff($items, $compare_array);
            // // if different then only update those parts


            // // update audit history with different

            $valueSets = array();

            foreach($array_diff as $key=>$value) {
                $valueSets[] = "`$key`" . " = '" . $value . "'";
            }

            $sql = "UPDATE `users` SET ". join(",", $valueSets) . " WHERE `id` = '$id'";
            $conn->query($sql);

            $returnData = $items;


        break;

        case "add_part":

            $vendor_name = $data->vendorName;
            $vendor_number = $data->vendorNumber;
            $part_number = $data->partNumber;
            $part_description = $data->partDescription;
            $weight = $data->weight;
            $weight_uom = $data->weightUOM;
            $quantity = $data->quantity;
            $reusable = $data->reusable;
            $container_type = $data->containerType;
            $container_number = $data->containerNumber;
            $length = $data->length;
            $width = $data->width;
            $height = $data->height;
            $container_uom = $data->containerUOM;
            $stackable = $data->stackable;
            $active = $data->active;
            $user = $data->user;
            $program = $data->program;
            $program_yearly = $data->programYearly;
            $program_daily = $data->programDaily;

            $part = array($part_number,$part_description,$vendor_name,$vendor_number,$length, $width, $height, $quantity, $weight, $weight_uom, $reusable, $stackable, $container_type, $container_uom,  $container_number, $active, $date, $user, $program, $program_yearly, $program_daily);
            $insert_part = $conn->prepare("INSERT INTO `parts` (`part_number`, `description`, `vendor`, `vendor_number`, `length`, `width`, `height`, `standard_pack`, `weight`, `weigh_uom`, `reusable`, `stackable`, `container_type`, `container_uom`, `container_number`, `active`, `date_modified`, `modified_by`, `program`, `program_yearly`, `program_daily`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
            $insert_part->execute($part);

            $audit = array($user, $part_number, $date, "Added part");
            $insert_audit = $conn->prepare("INSERT INTO `audit_history` (`user_id`,`part_number`,`date`.`action`) VALUES (?,?,?,?)");
            $insert_audit->execute($audit);

            $returnData = $part;

        break;
        case "audit":
            $part_number = $data->partNumber;

            $fetch_part = "SELECT * FROM `audit_history` WHERE `part_number` = '$part_number'";
            
            $query_stmt = $conn->prepare($fetch_part);
            $query_stmt->execute();

            $row = $query_stmt->fetchAll(PDO::FETCH_ASSOC);
            $returnData = $row;
        break;
        
        case "active":

            $parts = $data->parts;

            foreach ($parts as $part) {

                $items = array($part);
                $update_part = $conn->prepare("UPDATE `parts` ");
            }

        break;

        default;
    }

    // if ($value == "vendor") {
            // $fetch_user_by_email = "SELECT ``vendor`,`supplier_id`,`part_number`,`container_number`` FROM `parts`";
    // $fetch_user_by_email = "SELECT DISTINCT `$value` FROM `parts`";
    // $query_stmt = $conn->prepare($fetch_user_by_email);
    // $query_stmt->bindValue(':email', $email,PDO::PARAM_STR);
    // $query_stmt->execute();

    

    // if($query_stmt->rowCount()):
        // $row = $query_stmt->fetchAll(PDO::FETCH_ASSOC);
        // $returnData = $row;

        // $returnData = [
        //     "success" => 1,
        //     "message" => $row
        // ];
        // $check_password = password_verify($password, $row['password']);

        // VERIFYING THE PASSWORD (IS CORRECT OR NOT?)
        // IF PASSWORD IS CORRECT THEN SEND THE LOGIN TOKEN
        // if($check_password):


            // $returnData = [
            //     'success' => 1,
            //     'message' => 'Success.',
            //     // 'token' => $token
            // ];

        // IF INVALID PASSWORD
        // else:
        //     $returnData = msg(0,422,'Invalid Password!');
        // endif;

    // IF THE USER IS NOT FOUNDED BY EMAIL THEN SHOW THE FOLLOWING ERROR
    // else:
        // $returnData = msg(0,422,'error');
    // endif;
    // $returnData = msg(0,422,'error1');
// }

    // }
    

echo json_encode($returnData);