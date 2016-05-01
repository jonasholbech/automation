<?php
//the path is the url to call, the rest is parameters/arguments

$url=$_GET['path'];
$args = array();
foreach($_GET as $k=>$v){
    if($v!=$url){
        $args[]=$k."=".$v;
    }
}
$url.="?".implode('&', $args);
//echo $url;
$stuff = file_get_contents($url);
echo $stuff;