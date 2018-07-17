<?php

require 'init.php';
require LIB_PATH . DS . 'user.php';

$errors=[];
$username = $_POST['username'] ?? null;
$password = $_POST['password'] ?? null;

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $user = authenticate($db, $username,$password);
    if($user) {
        $_SESSION['user'] = $user;
        header('Location: design.php');
    }else{
        $errors[] = 'Identifiant ou mot de passe invalide';
    }
}

include THEME_PATH . DS . 'login.phtml';