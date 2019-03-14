<?php
header("Content-Type:application/json");
require("../init.php");
@$kw=$_REQUEST["term"];
$sql=" SELECT lid,title,sold_count FROM xz_laptop ";
if($kw){
$kws=explode(" ",$kw);
for($i=0;$i<count($kws);$i++){
$kws[$i]=" title like '%$kws[$i]%'";
}
$where=" WHERE ".implode(" and ",$kws);
$sql.=$where;
}
$sql.=" ORDER BY sold_count DESC LIMIT 10";
$result=mysqli_query($conn,$sql);
echo json_encode(mysqli_fetch_all($result ,1));
