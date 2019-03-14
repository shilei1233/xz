<?php
header("Content-Type:applacation/json");
require_once("../init.php");
@$lid=$_REQUEST["lid"];
$output=[
  "product"=>null,
  "specs"=>[],
  "pics"=>[]
];
if($lid){
$sql="SELECT * FROM xz_laptop WHERE lid=$lid";
$result=mysqli_query($conn,$sql);
$product=mysqli_fetch_all($result,1)[0];
$output["product"]=$product;
$fid=$product["fid"];
$sql="SELECT lid,spec FROM xz_laptop WHERE fid=$fid";
$result=mysqli_query($conn,$sql);
$output["specs"]=mysqli_fetch_all($result,1);
$sql="SELECT * FROM xz_laptop_pic WHERE lid=$lid";
$result=mysqli_query($conn,$sql);
$output["imgs"]=mysqli_fetch_all($result,1);
}
echo json_encode($output);