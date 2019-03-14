<?php
header("Content-Type:application/json");
require("../init.php");
session_start();
$uid=$_SESSION["uid"];
$lid=$_REQUEST["lid"];
$count=$_REQUEST["count"];
$sql="select * from xz_shoppingcart_item where user_id=$uid and product_id=$lid";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_all($result,1);
if($row==null)
$sql="insert into xz_shoppingcart_item(iid,user_id,product_id,count,is_checked)
values (null,$uid,$lid,$count,0)";
else
$sql="update xz_shoppingcart_item set count=count+$count where user_id=$uid and
product_id=$lid";
$result=mysqli_query($conn,$sql);
