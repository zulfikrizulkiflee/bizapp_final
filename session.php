<?php
   include('conn.php');
   session_start();

   $user_check = "";
    $user_id;
   
   if(isset($_SESSION['login_user'])){
       $user_check = $_SESSION['login_user'];
   }else{
       $user_id=15;
   }
   
   $ses_sql = mysqli_query($conn,"select * from comm_user where username = '$user_check' ");
   
   $row = mysqli_fetch_array($ses_sql,MYSQLI_ASSOC);
   
   $login_session = $row['username'];

   $user_id = $row['id'];

   $profile_pic = $row['profile_pic'];

   $user_name = $row['name'];

   $email = $row['email'];

   $date_register = $row['date_register'];
?>