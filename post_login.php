<?php
   include("conn.php");
   session_start();

    $error = "";
    $success_register="";
    $registered_user="";
    $error_password="<div style='display:none;color:red;text-align:center'></div>";

    $login=$_POST['login'];

   
   if (isset($_POST['login'])) {
        // removes backslashes
       $username = stripslashes($_POST['username']);
        //escapes special characters in a string
       $username = mysqli_real_escape_string($conn,$username);
       $password = stripslashes($_POST['pw']);
       $password = mysqli_real_escape_string($conn,$password);
	   //Checking is user existing in the database or not
       $query = "SELECT id FROM comm_user WHERE username='$username' and password='".md5($password)."'";
       $result = mysqli_query($conn,$query) or die(mysql_error());
       $rows = mysqli_num_rows($result);
       if($rows==1){
//           $_SESSION['login_user'] = $username;
//            // Redirect user to index.php
//           header("Location: ". $_SESSION['current_page']);
           echo $username;
       }
    }

    if (isset($_POST['register'])) {
        $name = mysqli_real_escape_string($conn,$_POST['name']);
        $phone_num = mysqli_real_escape_string($conn,$_POST['phone_num']); 
        $email = mysqli_real_escape_string($conn,$_POST['email']);
        $address = mysqli_real_escape_string($conn,$_POST['address']);
        $username = mysqli_real_escape_string($conn,$_POST['username']);
        $password = mysqli_real_escape_string($conn,$_POST['password']); 
        $register_date = date("Y-m-d h:i:sa");

            if(!empty($email))  { 
                $sql_check = "SELECT * FROM comm_user WHERE email = '$_POST[email]'"; 
                $check = $conn->query($sql_check);
                if ($check->num_rows <= 0) {
                    $query = "INSERT INTO comm_user (id,name,phone_num,email,address,username,password,date_register) VALUES ('','".$name."','".$phone_num."','".$email."','".$address."','".$username."','".md5($password)."','".$register_date."')"; 
                    $data = $conn->query($query);
                    if($data) { 
                        $success_register="YOUR REGISTRATION IS COMPLETED..."; 
                    } 
                } else { 
                     $registered_msg="SORRY...YOU ARE ALREADY REGISTERED USER...";
                } 
            }
        
    }  

?>