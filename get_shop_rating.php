<?php

include("conn.php");

$shopid=$_GET['sid'];

$myArray = array();
if ($result = $conn->query("SELECT * FROM comm_rating WHERE shopid=".$shopid)) {
    $tempArray = array();
    while($row = $result->fetch_object()) {
        $tempArray = $row;
        array_push($myArray, $tempArray);
    }
    echo json_encode($myArray);
}
$result->close();
$conn->close();
?>