<?php

function validUsername($name, $min = 4, $max = 20){

    if (preg_match('/^[a-zA-Z][A-Za-z0-9]{'.$min.','.$max.'}/', $name)){
        return true;
    }
    return false;
}

function validEmail($email, $min=10, $max = 80){
    if(!valideMinMax($email, $min, $max )){
        return false;
    }
    if(strpos($email, '@') === false){
        return false;
    }
    if(strpos($email, '.') === false){
        return false;
    }

    return true;

}

function validPassword($password, $validpassword, $min=4, $max=40){
    if(!valideMinMax($password, $min, $max )){
        return false;
    }

    if ($password !== $validpassword){
        return false;
    }
    return true;

}

function valideMinMax($test, $min, $max){
    $len = strlen($test);
    $retour = $len >= $min && $len <= $max;
    return $retour;
}