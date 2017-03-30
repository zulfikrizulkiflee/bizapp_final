<?php

include("conn.php");

$myArray = array();
if ($result = $conn->query("SELECT * FROM track_user WHERE (roleid=1 OR roleid=2 OR roleid=3) AND (attachmentphoto IS NOT NULL AND attachmentphoto<>'') AND nama IS NOT NULL ORDER BY RAND() LIMIT 4")) {
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