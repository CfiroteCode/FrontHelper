<?php

/**
 *
 */
function authenticate(PDO $pdo, $username, $password){
    //je check si l'user existe dans la bd
    //je verif le mdp avec php
    //si ok on retourne à la ligne correspondante sinon return false
    $sql = 'SELECT * FROM user WHERE username=?';
    $stmt = $pdo->prepare($sql);

    if ($stmt->execute(array($username))) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            unset($user['password']);
            return $user;
        }
    }

    return false;
}

function searchuser(PDO $pdo, $username){
    $sql = 'SELECT * FROM user WHERE username=?';
    $stmt = $pdo->prepare($sql);

    if ($stmt->execute(array($username))) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($user){
            return true;
        }
        return false;
    }

    return false;

}

function signup(PDO $pdo, $username, $passeword, $email){
    $sql = 'INSERT INTO `user` VALUES (
        NULL,
        ?,
        ?,
        ?,
        0,
        1,
        0
    )';
    $stmt = $pdo->prepare($sql);

    if ($ok = $stmt->execute(array($username, $email, password_hash($passeword, PASSWORD_BCRYPT)))){
return $stmt->rowCount();
    }
    return 0;
}

function isUserExists(PDO $pdo, $username) {
    $stmt = $pdo->prepare('SELECT username FROM user WHERE username=?');
    if ($stmt->execute(array($username))) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($user !== false) {
            return true;
        }
    }
    return false;
}

function hasSession(){
    if(!isset($_SESSION['user'])){
        header('Location:login.php');
        exit;
    }
}

function saveData(PDO $pdo, $save){
    $sql = 'INSERT INTO `save` VALUES (
        NULL,
        `titre`,
        ?,
        ?
    )';
    $stmt = $pdo->prepare($sql);

    if ($ok = $stmt->execute(array($save, $_SESSION['user'] ["user_id"]))){
return $stmt->rowCount();
    }
    return 0;
}

function getSave(PDO $pdo){
    $sql='SELECT * FROM `save` WHERE user_id = ?';
    $stmt = $pdo->prepare($sql);

    if ($ok = $stmt->execute(array($_SESSION['user'] ["user_id"]))){
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    return false;
}