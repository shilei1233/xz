<?php
header("Content-Type:application/json");
require("../init.php");
@$iid=$_REQUEST["iid"];
@$is_checked=$_REQUEST["is_checked"];
$sql="update xz_shoppingcart_item set is_checked=$is_checked where iid=$iid";
mysqli_query($conn,$sql);