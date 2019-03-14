<?php
header("Content-Type:application/json");
require("../init.php");
@$iid=$_REQUEST["iid"];
$sql="delete from xz_shoppingcart_item where iid=$iid";
mysqli_query($conn,$sql);