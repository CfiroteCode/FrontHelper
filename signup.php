<?php

require 'init.php';

require LIB_PATH . DS . 'user.php';
require LIB_PATH . DS . 'validator.php';

$errors=[];
$username = $_POST['username'] ?? null;
$password = $_POST['password'] ?? null;
$verifpass = $_POST['repeatpass'] ?? null;
$email = $_POST['email'] ?? null;

if($_SERVER['REQUEST_METHOD']=== 'POST'){
    if (!validUsername($username,3,12)){
        $errors[] = 'Identifiant Incorrect';
    }
}

// Validation du formulaire.
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!validUsername($username, 3, 12)) {
        $errors[] = 'Identifiant incorrect';
    }
    if (!validEmail($email, 10, 20)) {
        $errors[] = 'Email incorrect';
    }
    if (!validPassword($password, $verifpass, 2, 10)) {
        $errors[] =  'Mot de passe invalid ou ne correpond pas';
    }
    if (empty($errors)) {

        //nettoyage des données.
        $username = strip_tags($username);
        $email = strip_tags($email);
        $password = strip_tags($password);

        if (signup($db, $username, $password, $email) === 1) {
            //echo $db->lastInsertId();

            $user = authenticate($db, $username, $password);
            if ($user) {
                $_SESSION['user'] = $user;
                header('Location: index.php');
            }
        }
    }
}


include THEME_PATH . DS . 'signup.phtml';