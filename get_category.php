<?php

include("conn.php");

$myArray = array();
if ($result = $conn->query("SELECT code,description_en FROM track_product_category")) {
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