<?php

include("conn.php");

$process=$_GET['get_process'];
$userid=$_GET['userid'];

//$process='display';
//$userid=14;

    //$user_id=14;
if($process == "display"){
    $myArray = array();
    if ($result = $conn->query("SELECT * FROM comm_user_address WHERE user_id=".$userid)) {
        $tempArray = array();
        while($row = $result->fetch_object()) {
            $tempArray = $row;
            array_push($myArray, $tempArray);
        }
        echo json_encode($myArray);
    }
    $result->close();
}
if($process == "set"){
    $cartid = $_GET['cart_id'];
    
    $sql = "UPDATE comm_user_address SET default_address = REPLACE(default_address, '1', '0') WHERE INSTR(user_id, '".$userid."') > 0";

    if ($conn->query($sql) === TRUE) {
        echo "Your BizApp account has been successfully created.";
    } else {
        echo "Error updating record: " . $conn->error;
    }
    
    $sql2 = "UPDATE comm_user_address SET default_address = REPLACE(default_address, '0', '1') WHERE INSTR(id, '".$cartid."') > 0";

    if ($conn->query($sql2) === TRUE) {
        echo "Your BizApp account has been successfully created.";
    } else {
        echo "Error updating record: " . $conn->error;
    }
}

$conn->close();
?>