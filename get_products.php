<?php

include("conn.php");

$myArray = array();
if ($result = $conn->query("SELECT * FROM track_product WHERE attachment IS NOT NULL AND productname IS NOT NULL AND price IS NOT NULL AND status=1 ORDER BY RAND() LIMIT 6")) {
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