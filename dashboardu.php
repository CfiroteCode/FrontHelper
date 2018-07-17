<?php

require 'init.php';
require LIB_PATH . DS .'user.php';

hasSession();

$datas = getSave($db);

include THEME_PATH . DS . 'dashboarduser.phtml';

echo'<script>';
echo'var datas = [];';
foreach ($datas as $data){
echo'datas.push(' . $data["data"] . ');';
}
echo 'console.log(Object.values(datas[0][1]));';




echo'</script>';
