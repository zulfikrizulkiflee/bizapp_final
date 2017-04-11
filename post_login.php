<?php
   include("conn.php");
   session_start();

    if (isset($_GET['login'])) {
//        echo "login data";
       $username = stripslashes($_GET['username']);
       $username = mysqli_real_escape_string($conn,$username);
       $password = stripslashes($_GET['pw']);
       $password = mysqli_real_escape_string($conn,$password);
       $myArray = array();
        
       if ($result = $conn->query("SELECT id,username FROM comm_user WHERE username='$username' AND password='".md5($password)."' AND active=1 LIMIT 1")) {
           $tempArray = array();
           $typeArray = array('usertype'=>'user');
           while($row = $result->fetch_object()) {
               $tempArray = $row;
//               array_push($tempArray,'type:user');
               array_push($myArray, $tempArray);
               $myArray = (object)array_merge((array)$row, $typeArray);
           }      
       }
        
        if ($result = $conn->query("SELECT pid AS id,penggunaid AS username FROM track_user WHERE penggunaid='$username' AND katalaluan='$password' AND roleid NOT IN (0) LIMIT 1")) {
            $tempArray = array();
            $typeArray = array('usertype'=>'shop');
            while($row = $result->fetch_object()) {
                $tempArray = $row;
                array_push($myArray, $tempArray);
                $myArray = (object)array_merge((array)$row, $typeArray);
            }  
        }
        echo json_encode(array($myArray));
        $result->close();
    }  

    if (isset($_GET['register'])) {
//        echo "register data";
        $name = mysqli_real_escape_string($conn,$_GET['name']);
        $phone_num = mysqli_real_escape_string($conn,$_GET['phone_num']); 
        $email = mysqli_real_escape_string($conn,$_GET['email']);
        $address = mysqli_real_escape_string($conn,$_GET['address']);
        $username = mysqli_real_escape_string($conn,$_GET['username']);
        $password = mysqli_real_escape_string($conn,$_GET['password']);
        $confirm_code = md5(uniqid(rand()));
        
        if(!empty($email))  { 
                $sql_check = "SELECT * FROM comm_user WHERE email = '$email'"; 
                $check = $conn->query($sql_check);
                if ($check->num_rows <= 0) {
                    $query = "INSERT INTO comm_user (name,phone_num,email,address,username,password,confirm_code) VALUES ('".$name."','".$phone_num."','".$email."','".$address."','".$username."','".md5($password)."','".$confirm_code."')"; 
                    $data = $conn->query($query);
                    if($data) { 
                        // send e-mail to ...
                        $to=$email;

                        // Your subject
                        $subject="Your confirmation link here";

                        // From
                        $header="from: BizApp <no_reply@bizapp.com>";

                        // Your message
                        $message="Your Comfirmation link \r\n";
                        $message.="Click on this link to activate your account \r\n";
                        $message.="http://localhost/Project%20BizApp/bizapp/confirm.php?code=".$confirm_code;

                        // send email
                        mail($to,$subject,$message,$header);
                        echo "Registration Complete, ";
                        echo "Please check your email";
                    } 
                } else { 
                     echo "Your Email Address Already Being Used, ";
                     echo "Please login to continue";
                } 
            }
        
    }  
   
//   if (isset($_POST['login'])) {
//        // removes backslashes
//       $username = stripslashes($_POST['username']);
//        //escapes special characters in a string
//       $username = mysqli_real_escape_string($conn,$username);
//       $password = stripslashes($_POST['pw']);
//       $password = mysqli_real_escape_string($conn,$password);
//       $myArray = array();
//	   //Checking is user existing in the database or not
//       if ($result = $conn->query("SELECT id,username FROM comm_user WHERE username='$username' and password='".md5($password)."' LIMIT 1")) {
//           $tempArray = array();
//           while($row = $result->fetch_object()) {
//                $tempArray = $row;
//                array_push($myArray, $tempArray);
//           }
//           echo json_encode($myArray);
//       }
//    }
//
//    if (isset($_POST['register'])) {
//        $name = mysqli_real_escape_string($conn,$_POST['name']);
////        $phone_num = mysqli_real_escape_string($conn,$_POST['phone_num']); 
//        $email = mysqli_real_escape_string($conn,$_POST['email']);
////        $address = mysqli_real_escape_string($conn,$_POST['address']);
//        $username = mysqli_real_escape_string($conn,$_POST['username']);
//        $password = mysqli_real_escape_string($conn,$_POST['password']); 
////        $register_date = date("Y-m-d h:i:sa");
//        
//        echo $name;
//
////            if(!empty($email))  { 
////                $sql_check = "SELECT * FROM comm_user WHERE email = '$_POST[email]'"; 
////                $check = $conn->query($sql_check);
////                if ($check->num_rows <= 0) {
////                    $query = "INSERT INTO comm_user (name,phone_num,email,address,username,password,date_register) VALUES ('','".$name."','".$phone_num."','".$email."','".$address."','".$username."','".md5($password)."','".$register_date."')"; 
////                    $data = $conn->query($query);
////                    if($data) { 
////                        $success_register="YOUR REGISTRATION IS COMPLETED..."; 
////                    } 
////                } else { 
////                     $registered_msg="SORRY...YOU ARE ALREADY REGISTERED USER...";
////                } 
////            }
//        
//    }  

?>