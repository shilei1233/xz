<?php
header("Content-Type:applacation/json");
require("../init.php");
@$kw=$_REQUEST["kw"];
$kws=explode(" ",$kw);
for($i=0;$i<count($kws);$i++){
$kws[$i]=" title like '%$kws[$i]%'";
}
$where=implode(" and ",$kws);
$sql=" SELECT * FROM xz_laptop where $where";
//var_dump($sql);
$result=mysqli_query($conn, $sql);
$data=mysqli_fetch_all($result,1);
$count=count($data);
@$pageNo=$_REQUEST["pageNo"];
if($pageNo==null) $pageNo=1;
@$pageSize=$_REQUEST["pageSize"];
if($pageSize==null) $pageSize=9;
$sql.=" limit ".($pageNo-1)*$pageSize." ,$pageSize";
$result=mysqli_query($conn,$sql);
$data=mysqli_fetch_all($result,1);
$pageCount=ceil(($count/$pageSize));
$output=[
    "pageNo"=>$pageNo,
	"pageSize"=>$pageSize,
	"count"=>$count,
	"pageCount"=>$pageCount,
	"data"=>$data
];
echo json_encode($output);
