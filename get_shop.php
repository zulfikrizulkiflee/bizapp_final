<?php

include("conn.php");

$page=$_GET['page'];

if($page == "shop"){
    $shopid=$_GET['sid'];
//    $search_str=$_GET['search_str'];

    $myArray = array();
    if ($result = $conn->query("SELECT * FROM track_product,track_user WHERE track_product.pid=track_user.pid AND (track_user.roleid=1 OR track_user.roleid=2 OR track_user.roleid=3) AND (track_product.attachment IS NOT NULL AND track_product.attachment<>'') AND track_product.productname IS NOT NULL AND track_product.price IS NOT NULL AND track_product.status=1 AND track_product.pid=".$shopid)) {
        $tempArray = array();
        while($row = $result->fetch_object()) {
            $tempArray = $row;
            array_push($myArray, $tempArray);
        }
        echo json_encode($myArray);
    }
}else if($page == "category"){
    $code=$_GET['code'];

    $myArray = array();
    if ($result = $conn->query("SELECT * FROM track_product,track_user WHERE track_product.pid=track_user.pid AND (track_user.roleid=1 OR track_user.roleid=2 OR track_user.roleid=3) AND (track_product.attachment IS NOT NULL AND track_product.attachment<>'') AND track_product.productname IS NOT NULL AND track_product.price IS NOT NULL AND track_product.status=1 AND track_product.productcategorycode=".$code)) {
        $tempArray = array();
        while($row = $result->fetch_object()) {
            $tempArray = $row;
            array_push($myArray, $tempArray);
        }
        echo json_encode($myArray);
    }
}

$result->close();
$conn->close();
?>