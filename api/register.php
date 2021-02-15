<?php
header("Access-Control-Allow-Origin: *");
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

// INCLUDING DATABASE AND MAKING OBJECT
require __DIR__.'/classes/Database.php';
$db_connection = new Database();
$conn = $db_connection->dbConnection();

// GET DATA FORM REQUEST
$data = json_decode(file_get_contents("php://input"));
$returnData = [];

// IF REQUEST METHOD IS NOT POST
if($_SERVER["REQUEST_METHOD"] != "POST"):
    $returnData = msg(0,404,'Page Not Found!');

// CHECKING EMPTY FIELDS
elseif(!isset($data->first_name)
    || !isset($data->last_name)
    || !isset($data->email) 
    || !isset($data->password)
    || empty(trim($data->first_name))
    || empty(trim($data->last_name))
    || empty(trim($data->email))
    || empty(trim($data->password))
    ):

    $fields = ['fields' => ['first_name','last_name','email','password']];
    $returnData = msg(0,422,'Please Fill in all Required Fields!',$fields);

// IF THERE ARE NO EMPTY FIELDS THEN-
else:
    
    $first_name = trim($data->first_name);
    $last_name = trim($data->last_name);
    $email = trim($data->email);
    $password = trim($data->password);
    $company = trim($data->company);
    $location = trim($data->location);

    if(!filter_var($email, FILTER_VALIDATE_EMAIL)):
        $returnData = msg(0,422,'Invalid Email Address!');
    
    elseif(strlen($password) < 8):
        $returnData = msg(0,422,'Your password must be at least 8 characters long!');

    elseif(strlen($first_name) < 2):
        $returnData = msg(0,422,'Your first name must be at least 2 characters long!');
    
    elseif(strlen($last_name) < 2):
        $returnData = msg(0,422,'Your last name must be at least 2 characters long!');

    else:
        try{

            $check_email = "SELECT `email` FROM `users` WHERE `email`=:email";
            $check_email_stmt = $conn->prepare($check_email);
            $check_email_stmt->bindValue(':email', $email,PDO::PARAM_STR);
            $check_email_stmt->execute();

            if($check_email_stmt->rowCount()):
                $returnData = msg(0,422, 'This E-mail already in use!');
            
            else:
                $yes = "yes";
                $no = "no";
                $insert_query = "INSERT INTO `users`(`first_name`, `last_name`,`email`,`password`,`active`,`admin`,`company`,`location`) VALUES(:first_name,:last_name,:email,:password,:active,:admin,:company,:location)";

                $insert_stmt = $conn->prepare($insert_query);

                // DATA BINDING
                $insert_stmt->bindValue(':first_name', htmlspecialchars(strip_tags($first_name)),PDO::PARAM_STR);
                $insert_stmt->bindValue(':last_name', htmlspecialchars(strip_tags($last_name)),PDO::PARAM_STR);
                $insert_stmt->bindValue(':email', $email,PDO::PARAM_STR);
                $insert_stmt->bindValue(':password', password_hash($password, PASSWORD_DEFAULT),PDO::PARAM_STR);
                $insert_stmt->bindValue(':active', "Active",PDO::PARAM_STR);
                $insert_stmt->bindValue(':admin', "No",PDO::PARAM_STR);
                $insert_stmt->bindValue(':company', htmlspecialchars(strip_tags($company)),PDO::PARAM_STR);
                $insert_stmt->bindValue(':location', htmlspecialchars(strip_tags($location)),PDO::PARAM_STR);
                $insert_stmt->execute();

                $returnData = msg(1,201,'You have successfully registered.');

            endif;

        }
        catch(PDOException $e){
            $returnData = msg(0,500,$e->getMessage());
        }
    endif;
    
endif;

echo json_encode($returnData);