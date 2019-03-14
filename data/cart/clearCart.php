<?php
header("Content-Type:application/json");
require("../init.php");
session_start();
@$uid=$_SESSION["uid"];
$sql="delete from xz_shoppingcart_item where user_id=$uid";
$result=mysqli_query($conn,$sql);
