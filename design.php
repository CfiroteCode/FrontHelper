<?php

require 'init.php';
require LIB_PATH . DS .'user.php';

hasSession();

$errors=[];
$save = $_POST['save'] ?? null;


include THEME_PATH . DS . 'design.phtml';