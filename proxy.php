<?php
header('Access-Control-Allow-Origin:*');  
header('Access-Control-Allow-Methods:GET');
$w=$_GET['w'];
$w=str_replace(" ","%20",$w);
$url="http://c.y.qq.com/soso/fcgi-bin/music_search_new_platform?searchid=53806572956004615&t=1&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=1&w=" . "" . $w;
$res = file_get_contents($url);
echo $res;	
?>