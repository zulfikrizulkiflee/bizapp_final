<?php

include("conn.php");

$id=$_GET['id'];

$myArray = array();
if ($result = $conn->query("SELECT track_user.nama AS sellername,track_user.pid,track_product.id,track_product.pid,track_product.productname,track_product.productdesc,track_product.price,track_product.attachment,track_product.attachmentweb1,track_product.attachmentweb2,track_product.attachmentweb3,track_product.status,track_product.statusstok,track_product.bilstok FROM track_product,track_user WHERE track_user.pid = track_product.pid AND track_product.id=".$id." AND track_product.attachment IS NOT NULL AND track_product.productname IS NOT NULL AND track_product.price IS NOT NULL AND track_product.status=1 LIMIT 1")) {
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