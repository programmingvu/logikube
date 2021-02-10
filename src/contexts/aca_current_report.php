<?php

ini_set("log_errors", "Off"); 
ini_set('display_errors', false); 

include_once('/var/ape/app/includes/inherits.php'); 

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/phpmailer/phpmailer/src/Exception.php';
require 'vendor/phpmailer/phpmailer/src/PHPMailer.php';
require 'vendor/phpmailer/phpmailer/src/SMTP.php';

function mailer($from, $subject,$body,$attachment) {

    $email 		= new PHPMailer(true);


        $email->setFrom($from);

        $email->addAddress("yellowteam@logikor.com");
        $email->addAddress("mcornwall@logikor.com");
        $email->addAddress("vnguyen@logikor.com");  
        $email->Subject = $subject;
        $email->Body = $body;
       

                $email->addAttachment($attachment);

        $email->Send();


}

function get_autoneum_add_current() 
{

    $userid = "ACA_add_current";
    $passwd = "MGL0g1kWeb2015!";
    $parg['userid'] = $userid;
    $parg['password'] = $passwd;

    $req = Date("Y-m-d-H-i", strtotime("Now"));

    $parg["request"] = "
    <service-request>
        <service-id>ListScreen</service-id>
        <request-id>$req</request-id>
        <data>
        <UserName>LOCEXTRACT</UserName>

        <listScreenType>Transport</listScreenType>
        <reportName>Autoneum Add Report - Current</reportName>
        </data>
    </service-request>
    ";

    $url 	= WEB_SERVICE_URL;
    $size = sizeof($parg);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_AUTOREFERER, true );    
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false ); 
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 1000 );  
    curl_setopt($ch, CURLOPT_TIMEOUT, 1000 );         
    curl_setopt($ch, CURLOPT_MAXREDIRS, 5 );
    curl_setopt($ch, CURLOPT_ENCODING, '');
    curl_setopt($ch, CURLOPT_HEADER, false );
    curl_setopt($ch, CURLOPT_URL,"$url");             
    curl_setopt($ch, CURLOPT_POST, $size); 
    curl_setopt($ch, CURLOPT_POSTFIELDS,   
        http_build_query($parg));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);   
    $server_output = curl_exec ($ch);
    $sxml = simplexml_load_string($server_output);
    $ret = (string) $sxml->data;

    $csv = base64_decode($ret);
    $csv_array = explode("\n", $csv);
    // $csv_row = $csv_array[1];
    unset($csv_array[0]);

    $load_array = array();
    foreach ($csv_array as $array) {
        $csv_cells = explode(",", $array);
        array_push($csv_cells,"add");
        array_push($load_array,$csv_cells);
    }

    return $load_array;
}

function get_autoneum_cancel_current() 
{


    $userid = "ACA_cancel_current";
    $passwd = "MGL0g1kWeb2015!";
    $parg['userid'] = $userid;
    $parg['password'] = $passwd;

    $req = Date("Y-m-d-H-i", strtotime("Now"));

    $parg["request"] = "
    <service-request>
        <service-id>ListScreen</service-id>
        <request-id>$req</request-id>
        <data>
        <UserName>LOCEXTRACT</UserName>

        <listScreenType>Transport</listScreenType>
        <reportName>Autoneum Cancel Report - Current</reportName>
        </data>
    </service-request>
    ";

    $url 	= WEB_SERVICE_URL;
    $size = sizeof($parg);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_AUTOREFERER, true );    
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false ); 
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 1000 );  
    curl_setopt($ch, CURLOPT_TIMEOUT, 1000 );         
    curl_setopt($ch, CURLOPT_MAXREDIRS, 5 );
    curl_setopt($ch, CURLOPT_ENCODING, '');
    curl_setopt($ch, CURLOPT_HEADER, false );
    curl_setopt($ch, CURLOPT_URL,"$url");             
    curl_setopt($ch, CURLOPT_POST, $size); 
    curl_setopt($ch, CURLOPT_POSTFIELDS,   
        http_build_query($parg));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);   
    $server_output = curl_exec ($ch);
    $sxml = simplexml_load_string($server_output);
    $ret = (string) $sxml->data;

    $csv = base64_decode($ret);
    $csv_array = explode("\n", $csv);
    // $csv_row = $csv_array[1];
    unset($csv_array[0]);

    $load_array = array();
    foreach ($csv_array as $array) {
        $csv_cells = explode(",", $array);
        array_push($csv_cells,"cancel");
        array_push($load_array,$csv_cells);
    }

    return $load_array;
}

function get_autoneum_route_current()
{



    $userid = "ACA_route_current";
    $passwd = "MGL0g1kWeb2015!";
    $parg['userid'] = $userid;
    $parg['password'] = $passwd;

    $req = Date("Y-m-d-H-i", strtotime("Now"));

    $parg["request"] = "
    <service-request>
        <service-id>ListScreen</service-id>
        <request-id>$req</request-id>
        <data>
        <UserName>LOCEXTRACT</UserName>

        <listScreenType>Transport</listScreenType>
        <reportName>Autoneum Route Report - Current</reportName>
        </data>
    </service-request>
    ";

    $url 	= WEB_SERVICE_URL;
    $size = sizeof($parg);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_AUTOREFERER, true );    
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false ); 
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 1000 );  
    curl_setopt($ch, CURLOPT_TIMEOUT, 1000 );         
    curl_setopt($ch, CURLOPT_MAXREDIRS, 5 );
    curl_setopt($ch, CURLOPT_ENCODING, '');
    curl_setopt($ch, CURLOPT_HEADER, false );
    curl_setopt($ch, CURLOPT_URL,"$url");             
    curl_setopt($ch, CURLOPT_POST, $size); 
    curl_setopt($ch, CURLOPT_POSTFIELDS,   
        http_build_query($parg));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);   
    $server_output = curl_exec ($ch);
    $sxml = simplexml_load_string($server_output);
    $ret = (string) $sxml->data;

    $csv = base64_decode($ret);
    $csv_array = explode("\n", $csv);
    // $csv_row = $csv_array[1];
    unset($csv_array[0]);

    $load_array = array();
    foreach ($csv_array as $array) {
        $csv_cells = explode(",", $array);
        array_push($csv_cells,"route");
        array_push($load_array,$csv_cells);
    }

    return $load_array;
}
function get_suppliers($load) {
    $path = "/var/api/data/transport/";

    $dw_file = $path . $load . ".xml";

    if (file_exists($dw_file)) {
        $supplier_array = array();
        $contents = file_get_contents($dw_file);
        $item = simplexml_load_string($contents);

        $xml = $item->MasterBillOfLading;
        $events = $xml->Plan->Events->Event;

        foreach ($events as $event) {
            $event_type = (string) $event['type'];
            if ($event_type == "Pickup") {
                $name = (string) $event->Address->Name;
                if (strpos($name, "Yard") == false || strpos($name, "YARD") == false || strpos($name, "BRIDGE") == false || strpos($name, "BORDER") == false) {
                    array_push($supplier_array, $name);
                } 
            }
        }

        return $supplier_array;
    }


}

function get_consignees($load) {
    $path = "/var/api/data/transport/";

    $dw_file = $path . $load . ".xml";

    if (file_exists($dw_file)) {
        $consignee_array = array();
        $contents = file_get_contents($dw_file);
        $item = simplexml_load_string($contents);

        $xml = $item->MasterBillOfLading;
        $events = $xml->Plan->Events->Event;

        foreach ($events as $event) {
            $event_type = (string) $event['type'];
            if ($event_type == "Drop") {
                $name = (string) $event->Address->Name;
                array_push($consignee_array, $name);
            }
        }

        return $consignee_array;
    }


}

function get_reasons($load) {
    $path = "/var/api/data/transport/";
    
    $dw_file = $path . $load . ".xml";
    
    if (file_exists($dw_file)) {
    
        $reason_array = array();
        $contents = file_get_contents($dw_file);
        $item = simplexml_load_string($contents);

        $xml = $item->MasterBillOfLading;
        
        $references = $xml->ReferenceNumbers->ReferenceNumber;
        
        foreach ($references as $reference) {
            $reference_type = (string) $reference['type'];
            // print_r($reference);
            if ($reference_type == "Change Reason") {
                $change_reason = (string) $reference;
                array_push($reason_array, $change_reason);
            }

            if ($reference_type == "Duplicate Reason") {
                $duplicate_reason = (string) $reference;
                array_push($reason_array, $duplicate_reason);
            }

            if ($reference_type == "Cancel Reason") {
                $cancel_reason = (string) $reference;
                array_push($reason_array, $cancel_reason);
            }

        }
        $reasons = implode(", ", $reason_array);

        return $reasons;
    }
}

function get_comments($load) {
    $path = "/var/api/data/transport/";
    
    $dw_file = $path . $load . ".xml";
    
    if (file_exists($dw_file)) {
    
        $comments_array = array();
        $contents = file_get_contents($dw_file);
        $item = simplexml_load_string($contents);

        $xml = $item->MasterBillOfLading;
        
        $references = $xml->ReferenceNumbers->ReferenceNumber;
        
        foreach ($references as $reference) {
            $reference_type = (string) $reference['type'];
            // print_r($reference);
            if ($reference_type == "Change Comments") {
                $change_comments = (string) $reference;
                array_push($comments_array, $change_comments);
            }

            if ($reference_type == "Duplicate Comments") {
                $duplicate_comments = (string) $reference;
                array_push($comments_array, $duplicate_comments);
            }

            if ($reference_type == "Cancel Comments") {
            $cancel_comments = (string) $reference;
                array_push($comments_array, $cancel_comments);
            }

        }

        $comments = implode(", ", $comments_array);


        return $comments;
    }
}

function get_carrier_name($load) {
    $path = "/var/api/data/transport/";
    
    $dw_file = $path . $load . ".xml";
    
    if (file_exists($dw_file)) {
    
        $comments_array = array();
        $contents = file_get_contents($dw_file);
        $item = simplexml_load_string($contents);

        $xml = $item->MasterBillOfLading;
        $carrier_name = (string) $xml->Carriers->Carrier->CarrierName;

        return $carrier_name;
    }

}

function write_excel($map)
{
        
    include_once('/var/ape/app/includes/PHPspreadsheet/Classes/PHPspreadsheet.php');
    include_once('/var/ape/app/includes/PHPspreadsheet/Classes/PHPspreadsheet/Writer/Excel2007.php');

    $objPHPspreadsheet 						= new PHPspreadsheet();

    $objPHPspreadsheet->getProperties()->setCreator("Logikor Inc.");
    $objPHPspreadsheet->getProperties()->setLastModifiedBy("Logikor Inc.");
    $objPHPspreadsheet->getProperties()->setTitle("Historical Report Extract");
    $objPHPspreadsheet->getProperties()->setSubject("Historical Report Extract");
    $objPHPspreadsheet->getProperties()->setDescription("Historical Report Extract");

    $col 								= array('A','B','C','D','E','F','G','H','I','J','K', 'L','M','N','O','P','Q','R','S','T','U','V','W','X ','Y','Z');

    $objPHPspreadsheet->SetActiveSheetIndex(0); 
    
    $objDrawing 						= new PHPspreadsheet_Worksheet_Drawing();
    $objDrawing->setName('Logo');
    $objDrawing->setDescription('Logo');
    $logo								= '/var/ape/www/images/logo_large.png'; // Provide path to your logo file
    $objDrawing->setPath($logo);
    $objDrawing->setCoordinates('A1');
    $objDrawing->setHeight(200);
    $objDrawing->setWorksheet($objPHPspreadsheet->getActiveSheet());           
       
    $x	 								= 0;
    $y 									= 3;   

    $objPHPspreadsheet->getActiveSheet()->SetCellValue('A2', "ACA Current Report"); 
    $objPHPspreadsheet->getActiveSheet()->getStyle("A2")->getFont()->setBold(true)
                                  ->setName('Verdana')
                                  ->setSize(14);

    foreach ($map as $row)
    {
        $x 								= 0; 
        
        foreach ($row as $c)
        {
            $cell 						= $col[$x] . $y;           
            $objPHPspreadsheet->GetActiveSheet()->SetCellValue($cell, "" . trim($c) . ""); 
            $x++;  
        }

        $objPHPspreadsheet->GetActiveSheet()->getColumnDimension('F')->setWidth(85);          
        $objPHPspreadsheet->GetActiveSheet()->getStyle('B')->getAlignment()->setWrapText(true);          
        $objPHPspreadsheet->GetActiveSheet()->getStyle($cell)
                    ->getBorders()
                    ->getTop()
                    ->setBorderStyle(PHPspreadsheet_Style_Border::BORDER_THIN);
        $objPHPspreadsheet->GetActiveSheet()->getStyle($cell)
                    ->getBorders()
                    ->getBottom()
                    ->setBorderStyle(PHPspreadsheet_Style_Border::BORDER_THIN);
        $objPHPspreadsheet->GetActiveSheet()->getStyle($cell)
                    ->getBorders()
                    ->getLeft()
                    ->setBorderStyle(PHPspreadsheet_Style_Border::BORDER_THIN);
        $objPHPspreadsheet->GetActiveSheet()->getStyle($cell)
                    ->getBorders()
                    ->getRight()
                    ->setBorderStyle(PHPspreadsheet_Style_Border::BORDER_THIN);
        $y++; 
     
    }

    

    $objPHPspreadsheet->getActiveSheet()->getStyle("A3:N$y")->applyFromArray(array(
        'borders' => array(
            'allborders' => array(
                'style' => PHPspreadsheet_Style_Border::BORDER_THIN
            )
        )
    ));

    for($x = 'A'; $x !== 'O'; $x++) {
        if ($x == "K") { 
            // $objPHPspreadsheet->getActiveSheet()->getColumnDimension($x)->setWidth(85);    
            $objPHPspreadsheet->getActiveSheet()->getStyle($x)->getNumberFormat()->setFormatCode(PHPspreadsheet_Style_NumberFormat::FORMAT_CURRENCY_USD_SIMPLE);
        } else {
            $objPHPspreadsheet->getActiveSheet()
                        ->getColumnDimension($x)
                        ->setAutoSize(true);
        }        
    }     

    for ($s=3;$s<=$y;$s++) { 
        $objPHPspreadsheet->getActiveSheet()->getRowDimension($s)->setRowHeight(-1); 
    }

    $objPHPspreadsheet->getActiveSheet()->getRowDimension(1)->setRowHeight(150);

    $objWriter 			= new PHPspreadsheet_Writer_Excel2007($objPHPspreadsheet);
   
    $objWriter->save( "/var/ape/www/documents/current.xlsx" );
    echo "<br /><a style='font-size:19px;' style='color: black;' href='./historical.xlsx' download><b>Download Now!</b></a>"; 

}

function get_reference($load) {
    $path = "/var/api/data/transport/";
    
    $dw_file = $path . $load . ".xml";
    
    if (file_exists($dw_file)) {
    
        $contents = file_get_contents($dw_file);
        $item = simplexml_load_string($contents);

        $xml = $item->MasterBillOfLading;
        
        $references = $xml->ReferenceNumbers->ReferenceNumber;

        foreach ($references as $reference) {
            $reference_type = (string) $reference['type'];
        }
    }

    return $reference_type;
}

function main() {

    $add_current = get_autoneum_add_current();
    $cancel_current = get_autoneum_cancel_current();
    $route_current = get_autoneum_route_current();
    $loads = array_merge($add_current, $cancel_current, $route_current);
    // print_r($loads);
    $map[] = array("Bill To", "Load", "Route", "Dispatch Date", "Delivery Date", "Service Level", "Suppliers", "Consignees", "Carrier", "Miles", "Carrier Rate", "Added/Cancelled?", "Reason", "Comments");
    foreach ($loads as $load) {
        
        $billto = $load[0];
        $l = str_replace(" (Trip)", "", $load[1]);
        $route = $load[2];
        $dispatch = $load[3];
        $delivery = $load[4];
        $service = $load[5];
        
        $carrier = get_carrier_name($l);
        $miles = round($load[6]);
        $rate = $load[7];
        $rate = "$" . $rate;
        $report = $load[10];
        
        $suppliers = implode(",",get_suppliers($l));
        $consignees = implode(",", get_consignees($l));

        $reasons = get_reasons($l);
        $comments = get_comments($l);

        $reference_type = get_reference($l);
       
        if ($report == "add" && $service != "MTS") {
            if ($reference_type == "Duplicate Reason") {
                $map[] = array($billto, $l, $route, $dispatch, $delivery, $service, $suppliers, $consignees, $carrier, $miles, $rate, "Added", $reasons, $comments);
            } elseif ($reference_type == "Change Reason") {
                $map[] = array($billto, $l, $route, $dispatch, $delivery, $service, $suppliers, $consignees, $carrier, $miles, $rate, "Changed", $reasons, $comments);
            } else {
                $map[] = array($billto, $l, $route, $dispatch, $delivery, $service, $suppliers, $consignees, $carrier, $miles, $rate, "Added", $reasons, $comments);
            }
            
            print_r($map);
        } elseif ($report == "cancel" && $service != "MTS") {
            // $miles = "-" . $miles;
            if ($reference_type == "Duplicate Reason") {
                $map[] = array($billto, $l, $route, $dispatch, $delivery, $service, $suppliers, $consignees, $carrier, $miles, $rate, "Added", $reasons, $comments);    
            } elseif ($reference_type == "Change Reason") {
                $map[] = array($billto, $l, $route, $dispatch, $delivery, $service, $suppliers, $consignees, $carrier, $miles, $rate, "Changed", $reasons, $comments);
            } else {
                $map[] = array($billto, $l, $route, $dispatch, $delivery, $service, $suppliers, $consignees, $carrier, $miles, $rate, "Cancelled", $reasons, $comments);
            }
            
            print_r($map);
        } elseif ($report == "route" && $service != "MTS") {
            if ($reference_type == "Duplicate Reason") {
                $map[] = array($billto, $l, $route, $dispatch, $delivery, $service, $suppliers, $consignees, $carrier, $miles, $rate, "Added", $reasons, $comments);    
            } elseif ($reference_type == "Change Reason") {
                $map[] = array($billto, $l, $route, $dispatch, $delivery, $service, $suppliers, $consignees, $carrier, $miles, $rate, "Changed", $reasons, $comments);
            } else {
                $map[] = array($billto, $l, $route, $dispatch, $delivery, $service, $suppliers, $consignees, $carrier, $miles, $rate, "", $reasons, $comments);
            }
            

        }
        
        
    }
    // print_r($loads);
    write_excel($map);
    
mailer("vnguyen@logikor.com", "ACA Current Report", "Please find attached this weeks current report." ,"/var/ape/www/documents/current.xlsx");
}

main();
