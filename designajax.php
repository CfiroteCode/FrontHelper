<?php

require 'init.php';
require LIB_PATH . DS .'user.php';

hasSession();

$errors=[];
$save = $_POST['save'] ?? null;


if(isset($_POST)){
saveData($db, $save);
}