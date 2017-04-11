<?php
session_start();
    $process=$_GET['process'];
    
    if($process == 'check'){
        if(isset($_SESSION['id'])){
            $id = $_SESSION['id'];
            $username = $_SESSION['username'];
            $usertype = $_SESSION['usertype'];
            $myArray = array('id' => $id, 'username' => $username, 'usertype' => $usertype);
            echo json_encode($myArray);
        }else{
            echo "no data";
        }
    }

    if($process == 'set'){
        $_SESSION['id']=$_GET['id'];
        $_SESSION['username']=$_GET['username'];
        $_SESSION['usertype']=$_GET['usertype'];
        echo $_SESSION['username'];
    }

    if($process == 'logout'){
        session_destroy();
        echo 'logout';
    }
?>