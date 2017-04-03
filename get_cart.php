<?php
include("conn.php");

$action_get  = $_GET['action_get'];

$user_id = $_GET['userid'];
//$action_get  = "insert";
//
//$user_id = 14;


if($action_get =="insert"){
//    $prod_id = 9411;
//    $quantity = 2;
//    $seller_id = 4920;
    $prod_id = $_GET['id'];
    $quantity = $_GET['quantity'];
    $seller_id = $_GET['sellerid'];
//    $checkin_date = date("Y-m-d h:i:sa");

    $sql_price = "SELECT price FROM track_product WHERE id=".$prod_id." LIMIT 1";
    $result = mysqli_query($conn, $sql_price);
    $row = mysqli_fetch_assoc($result);

    $price_per = $row['price'];
    $price_sum = (float)$price_per * (int)$quantity;
    
    $query_row = mysqli_query($conn, "SELECT user_id,prod_id FROM comm_cart WHERE user_id=".$user_id." AND prod_id=".$prod_id);

    if(mysqli_num_rows($query_row) > 0){
        $sql = "UPDATE comm_cart SET quantity=quantity+".$quantity.",price_sum=price_sum+".$price_per." WHERE user_id=".$user_id." AND prod_id=".$prod_id; 
        $data = $conn->query($sql);
    }else{  
        $sql = "INSERT INTO comm_cart (user_id,seller_id,prod_id,quantity,price_sum,checkout) VALUES ('".$user_id."','".$seller_id."','".$prod_id."','".$quantity."','".$price_sum."','0')"; 
        $data = $conn->query($sql); 
    }
    $myArray = array();
    if ($result = $conn->query("SELECT * FROM comm_cart WHERE user_id='".$user_id."' AND checkout=0 ORDER BY checkin_date DESC")) {
        $tempArray = array();
        while($row = $result->fetch_object()) {
            $tempArray = $row;
            array_push($myArray, $tempArray);
        }
        echo json_encode($myArray);
    }
    $result->close();
}

if($action_get =="delete"){
    $prod_id = $_GET['id'];
    $sql = "DELETE FROM comm_cart WHERE prod_id=".$prod_id." AND checkout=0"; 
    $data = $conn->query($sql);
}

else if($action_get =="clear"){
    $sql = "DELETE FROM comm_cart WHERE user_id=".$user_id." AND checkout=0"; 
    $data = $conn->query($sql);
}

else if($action_get =="display"){
    $myArray = array();
    if ($result = $conn->query("SELECT * FROM comm_cart WHERE user_id='".$user_id."' AND checkout=0 ORDER BY checkin_date DESC")) {
        $tempArray = array();
        while($row = $result->fetch_object()) {
            $tempArray = $row;
            array_push($myArray, $tempArray);
        }
        echo json_encode($myArray);
    }
    $result->close();
}

$conn->close();
?>