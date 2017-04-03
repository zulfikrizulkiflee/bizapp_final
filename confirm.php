<?php

include("conn.php");

$confirm_code=$_GET['code'];
$sql = "UPDATE comm_user SET active = REPLACE(active, '0', '1') WHERE INSTR(confirm_code, '".$confirm_code."') > 0";

if ($conn->query($sql) === TRUE) {
    echo "Your BizApp account has been successfully created.";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
?>