<?php
session_start();
    $process=$_GET['process'];
    
    if($process == 'check'){
        if(isset($_SESSION['id'])){
            $id = $_SESSION['id'];
            $username = $_SESSION['username'];
            $myArray = array('id' => $id, 'username' => $username);
            echo json_encode($myArray);
        }else{
            echo "no data";
        }
    }

    if($process == 'set'){
        $_SESSION['id']=$_GET['id'];
        $_SESSION['username']=$_GET['username'];
        echo $_SESSION['username'];
    }

    if($process == 'logout'){
        session_destroy();
        echo "logout";
    }
?>