<?php
include("conn.php");

$prod_id = $_GET['id'];
$user_id = $_GET['userid'];

if($prod_id!="abc"){
    $quantity = $_GET['quantity'];
    $seller_id = $_GET['sellerid'];
    $checkin_date = date("Y-m-d h:i:sa");

    $sql_price = "SELECT price FROM track_product WHERE id=".$prod_id." LIMIT 1";
    $result = mysqli_query($conn, $sql_price);
    $row = mysqli_fetch_assoc($result);

    $price_sum = $row['price'] * $quantity;

    $sql = "INSERT INTO comm_cart (id,user_id,seller_id,prod_id,quantity,price_sum,checkin_date,checkout,checkout_date) VALUES ('','".$user_id."','".$seller_id."','".$prod_id."','".$quantity."','".$price_sum."','".$checkin_date."','0','')"; 
    $data = $conn->query($sql);
}


$myArray = array();
if ($result = $conn->query("SELECT * FROM comm_cart WHERE user_id='".$user_id."' ORDER BY checkin_date DESC")) {
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